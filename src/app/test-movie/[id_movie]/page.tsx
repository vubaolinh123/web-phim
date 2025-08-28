"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

// Dynamic test page to mirror crawl-phim/modules/content logic and HLS playback
// Route: /test-movie/[id_movie]

type PageProps = {
  params: {
    id_movie: string;
  };
};

const CONTENT_URL = "https://phimmoichill.ceo/chillsplayer.php";
const HEADERS = {
  FORM_URLENCODED: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

function extractVideoId(html: string): string | null {
  const match = html.match(/iniPlayers\("([a-f0-9]+)"/);
  return match ? match[1] : null;
}

export default function TestMoviePage({ params }: PageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsInstanceRef = useRef<Hls | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState<string>("");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Fetch HTML from the API using the same logic as crawl-phim/modules/content/index.js
  useEffect(() => {
    const controller = new AbortController();

    async function fetchHtml() {
      setLoading(true);
      setError(null);
      try {
        const body = new URLSearchParams({ qcao: String(params?.id_movie) }).toString();
        const res = await fetch(CONTENT_URL, {
          method: "POST",
          headers: HEADERS.FORM_URLENCODED,
          body,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const htmlText = await res.text();
        setHtml(htmlText);
        const videoId = extractVideoId(htmlText);
        if (!videoId) {
          throw new Error("No video ID could be extracted from the response");
        }
        setVideoSrc(`https://dash.motchills.net/raw/${videoId}/index.m3u8`);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchHtml();

    return () => {
      controller.abort();
    };
  }, [params.id_movie]);

  // Initialize HLS playback once we have a videoSrc
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsInstanceRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        const p: Promise<void> | undefined = video.play?.();
        if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
      });
      return () => {
        try {
          hls.destroy();
        } catch {}
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      const onLoadedMetadata = () => {
        const p: Promise<void> | undefined = video.play?.();
        if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
      };
      video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
      return () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }

    alert("Trình duyệt này không hỗ trợ HLS!");
  }, [videoSrc]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        hlsInstanceRef.current?.destroy?.();
      } catch {}
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Test Movie HLS (.m3u8)</h1>

      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: "red" }}>Error loading video: {error}</p>
      )}

      <video id="video" ref={videoRef} controls width={640} height={360} />

    </div>
  );
}

