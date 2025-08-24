'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaPlay, FaTicketAlt, FaEye, FaCalendarAlt, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa';

interface Movie {
  id: string;
  title: string;
  movieCode: string;
  viewCount: number;
  releaseYear: number;
  tags: string[];
  description: string;
  posterUrl: string;
  bannerUrl: string;
  trailerUrl: string;
  href: string;
}

interface HeroBannerProps {
  movie?: Movie;
}

const defaultMovie: Movie = {
  id: 'hero-movie-1',
  title: 'Demon Slayer: Kimetsu no Yaiba - The Hinokami Chronicles',
  movieCode: 'ABCD-123',
  viewCount: 1250000,
  releaseYear: 2024,
  tags: ['Hành động', 'Phiêu lưu', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao', 'Thể thao'],
  description: 'Một bộ phim hành động đầy kịch tính với những pha hành động mãn nhãn và cốt truyện hấp dẫn. Theo chân nhân vật chính trong cuộc phiêu lưu đầy thử thách.',
  posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
  bannerUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
  trailerUrl: '/video/banner.mp4',
  href: '/phim/hero-movie-1',
};

// Format view count for display
const formatViewCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export default function HeroBanner({ movie = defaultMovie }: HeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the video rendering logic only runs on the client, fixing hydration errors.
    setIsClient(true);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 w-full h-full">
        {isClient && movie.trailerUrl ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={movie.bannerUrl || '/hero-banner.jpg'}
          >
            <source src={movie.trailerUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={movie.bannerUrl || '/hero-banner.jpg'}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Content and Controls Wrapper */}
      <div className="absolute z-10 bottom-0 left-0 right-0 flex items-end justify-between px-8 py-[100px] md:px-12 md:py-[100px]">
        {/* Left Side: Movie Information */}
        <div className="flex flex-col gap-4 text-white max-w-2xl">
          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {movie.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide">
            {movie.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-gray-300">
            <div className="flex items-center gap-2">
              <FaTicketAlt />
              <span>{movie.movieCode}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye />
              <span>{formatViewCount(movie.viewCount)} Views</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>{movie.releaseYear}</span>
            </div>
          </div>

          {/* Watch Button */}
          <div className="mt-4">
            <Link
              href={movie.href || '#'}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaPlay />
              <span>Xem Ngay</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Mute/Unmute Control */}
        <div className="flex items-center">
          <button
            onClick={toggleMute}
            className="bg-white/20 p-4 rounded-full text-white hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute size={28} /> : <FaVolumeUp size={28} />}
          </button>
        </div>
      </div>
    </section>
  );
}
