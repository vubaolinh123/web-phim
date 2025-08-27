'use client';

import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp, FaExpand } from 'react-icons/fa';
import type { Source } from '@/types/movie';

interface MoviePlayerProps {
  title: string;
  poster?: string;
  sources: Source[];
}

export default function MoviePlayer({ title, poster, sources }: MoviePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [qualityIndex, setQualityIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const currentSource = sources[qualityIndex] || sources[0];

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play(); else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const changeVolume = (val: number) => {
    const v = Math.max(0, Math.min(1, val));
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
  };

  const enterFullscreen = () => {
    const el = videoRef.current?.parentElement;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const handleQualityChange = (idx: number) => {
    if (idx === qualityIndex) return;
    setQualityIndex(idx);
    const video = videoRef.current;
    if (!video) return;
    const wasPlaying = !video.paused;
    const currentTime = video.currentTime;
    video.src = sources[idx].url;
    video.currentTime = currentTime;
    if (wasPlaying) video.play();
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    const onLoaded = () => setDuration(v.duration || 0);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onLoaded);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  const seekTo = (t: number) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = Math.max(0, Math.min(duration || v.duration || 0, t));
  };

  const skip = (delta: number) => seekTo(currentTime + delta);

  const formatTime = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor(t % 60);
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
  };

  return (
    <div className="relative group bg-black">
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        poster={poster}
        controls={false}
        preload="metadata"
        playsInline
        src={currentSource.url}
      />

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {/* Seek bar */}
        <div className="flex items-center gap-3 text-white mb-2">
          <span className="text-xs tabular-nums">{formatTime(currentTime)}</span>
          <input
            aria-label="Tua video"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="flex-1 accent-red-600"
          />
          <span className="text-xs tabular-nums">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          <button aria-label={isPlaying ? 'Tạm dừng' : 'Phát'} className="p-2 rounded hover:bg-white/10" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button aria-label="Lùi 10 giây" className="px-2 py-1 rounded hover:bg-white/10 text-sm" onClick={() => skip(-10)}>-10s</button>
          <button aria-label="Tiến 10 giây" className="px-2 py-1 rounded hover:bg-white/10 text-sm" onClick={() => skip(10)}>+10s</button>
          <button aria-label={muted ? 'Bật tiếng' : 'Tắt tiếng'} className="p-2 rounded hover:bg-white/10" onClick={toggleMute}>
            {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            aria-label="Âm lượng"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-24 sm:w-32 accent-red-600"
          />
          <div className="ml-auto flex items-center gap-2">
            <select
              aria-label="Chất lượng"
              className="bg-black/40 text-sm px-2 py-1 rounded border border-white/20"
              value={qualityIndex}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
            >
              {sources.map((s, idx) => (
                <option key={s.quality + idx} value={idx}>
                  {s.quality}
                </option>
              ))}
            </select>
            <button aria-label="Toàn màn hình" className="p-2 rounded hover:bg-white/10" onClick={enterFullscreen}>
              <FaExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

