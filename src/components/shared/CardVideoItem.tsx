'use client';

import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import { useState, useEffect } from 'react';

interface CardVideoItemProps {
  id: string;
  title: string;
  actor?: string;
  movieCode: string;
  viewCount: number;
  posterUrl?: string;
  href?: string;
  className?: string;
  priority?: boolean;
  showHoverEffect?: boolean;
}

// Format view count for display
const formatViewCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export default function CardVideoItem({
  id,
  title,
  actor,
  movieCode,
  viewCount,
  posterUrl,
  href,
  className = '',
  priority = false,
  showHoverEffect = true,
}: CardVideoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [formattedViewCount, setFormattedViewCount] = useState(viewCount.toString());

  useEffect(() => {
    setFormattedViewCount(formatViewCount(viewCount));
  }, [viewCount]);
  
  // Default href if not provided
  const movieHref = href || `/movie/${id}`;

  // Default poster URL (placeholder will be handled by OptimizedImage)
  const posterSrc = posterUrl || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg';

  const cardContent = (
    <div
      className={`
        group relative bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 border border-gray-700
        ${showHoverEffect ? 'hover:scale-105 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Image - Base Layer (z-0) */}
        <OptimizedImage
          src={posterSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 20vw, 227px"
          priority={priority}
        />

        {/* Gradient Overlay - Sits on top of the image (z-10) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges & Info - Sits on top of the gradient (z-20) */}
        <div className="absolute top-2 right-2 z-20">
          <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded border border-blue-500/30 backdrop-blur-sm">
            HD
          </span>
        </div>
        <div className="absolute bottom-2 left-2 z-20">
          <span className="bg-gray-700 text-gray-200 text-xs font-semibold px-2 py-1 rounded">
            {movieCode}
          </span>
        </div>
        <div className="absolute bottom-2 right-2 z-20">
          <div className="flex items-center bg-gray-800/80 text-gray-200 text-xs px-2 py-1 rounded backdrop-blur-sm">
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {formattedViewCount}
          </div>
        </div>

        {/* Play Button Overlay - Topmost layer on hover (z-30) */}
        {showHoverEffect && (
          <div className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 bg-black/50 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-blue-600 rounded-full p-3 transform transition-transform duration-300 hover:scale-110 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Movie Information */}
      <div className="p-3 space-y-1.5">
        {/* Movie Title */}
        <h3 className="text-gray-100 font-semibold text-sm line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors duration-300 min-h-[2.5rem]">
          {title}
        </h3>

        {/* Actor Name */}
        {actor && (
          <p className="text-gray-400 text-xs line-clamp-1">
            <span className="text-gray-500">Diễn viên:</span> {actor}
          </p>
        )}

        {/* Additional Info Row */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>2024</span>
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>8.5</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Wrap with Link if href is provided
  if (href !== '#') {
    return (
      <Link 
        href={movieHref}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// Skeleton loader component for loading states
export function CardVideoItemSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden animate-pulse ${className}`}>
      <div className="aspect-[2/3] bg-gray-800" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
        <div className="flex justify-between">
          <div className="h-3 bg-gray-800 rounded w-12" />
          <div className="h-3 bg-gray-800 rounded w-8" />
        </div>
      </div>
    </div>
  );
}
