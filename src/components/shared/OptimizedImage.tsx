'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

// Default placeholder SVG for movie posters (2:3 aspect ratio)
const DEFAULT_MOVIE_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(`
<svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="600" fill="#1a1a1a"/>
  <rect x="50" y="50" width="300" height="500" rx="8" fill="#2a2a2a" stroke="#404040" stroke-width="2"/>
  <circle cx="200" cy="200" r="40" fill="#404040"/>
  <path d="M180 180L220 200L180 220V180Z" fill="#666666"/>
  <rect x="80" y="280" width="240" height="20" rx="4" fill="#333333"/>
  <rect x="80" y="320" width="180" height="16" rx="4" fill="#2a2a2a"/>
  <rect x="80" y="350" width="200" height="16" rx="4" fill="#2a2a2a"/>
  <rect x="80" y="420" width="120" height="14" rx="4" fill="#404040"/>
  <rect x="220" y="420" width="100" height="14" rx="4" fill="#404040"/>
  <text x="200" y="500" text-anchor="middle" fill="#666666" font-family="Arial, sans-serif" font-size="14">
    Phim-Moi
  </text>
</svg>
`).toString('base64')}`;

// Landscape placeholder for banners (16:9 aspect ratio)
const DEFAULT_BANNER_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(`
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0a0a0a"/>
  <rect x="100" y="100" width="1720" height="880" rx="12" fill="#1a1a1a" stroke="#333333" stroke-width="3"/>
  <circle cx="960" cy="540" r="80" fill="#333333"/>
  <path d="M920 500L1000 540L920 580V500Z" fill="#666666"/>
  <rect x="200" y="800" width="600" height="40" rx="8" fill="#2a2a2a"/>
  <rect x="200" y="860" width="400" height="30" rx="6" fill="#1a1a1a"/>
  <rect x="200" y="910" width="500" height="30" rx="6" fill="#1a1a1a"/>
  <text x="960" y="1000" text-anchor="middle" fill="#666666" font-family="Arial, sans-serif" font-size="24">
    Phim-Moi Banner
  </text>
</svg>
`).toString('base64')}`;

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine appropriate placeholder based on aspect ratio
  const getDefaultPlaceholder = () => {
    if (blurDataURL) return blurDataURL;
    
    if (width && height) {
      const aspectRatio = width / height;
      // If aspect ratio is close to 16:9 (landscape), use banner placeholder
      if (aspectRatio > 1.5) {
        return DEFAULT_BANNER_PLACEHOLDER;
      }
    }
    
    // Default to movie poster placeholder (2:3 aspect ratio)
    return DEFAULT_MOVIE_PLACEHOLDER;
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // If there's an error loading the image, show placeholder
  if (imageError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      >
        <div className="text-gray-500 text-center p-4">
          <svg 
            className="w-12 h-12 mx-auto mb-2 opacity-50" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-sm">Không thể tải ảnh</p>
        </div>
      </div>
    );
  }

  // Create base image props
  const baseImageProps = {
    src,
    alt,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    quality,
    placeholder: placeholder as any,
    blurDataURL: getDefaultPlaceholder(),
    style: {
      objectFit,
      objectPosition,
    },
    // Use both onLoad and onLoadingComplete to reliably end loading state
    onLoad: handleLoad,
    onLoadingComplete: handleLoad as any,
    onError: handleError,
    sizes: sizes || (fill ? '100vw' : undefined),
  } as const;

  // Workaround for dev caching bug: bypass optimization for pravatar in dev
  let shouldUnoptimize = false;
  if (process.env.NODE_ENV !== 'production') {
    try {
      const url = new URL(src);
      if (url.hostname === 'i.pravatar.cc') shouldUnoptimize = true;
    } catch { /* not an absolute URL */ }
  }

  // Create final props with either priority OR loading, never both
  const imageProps = priority
    ? { ...baseImageProps, priority: true, unoptimized: shouldUnoptimize }
    : { ...baseImageProps, loading, unoptimized: shouldUnoptimize };

  const commonWrapperClass = `${className?.includes('h-') ? '' : 'w-full'}`;

  return (
    <div
      className={`relative ${commonWrapperClass}`}
      style={!fill ? { width, height } : {}}
    >
      <Image
        {...imageProps}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gray-800/60 animate-pulse flex items-center justify-center transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-gray-500">
          <svg
            className="w-8 h-8 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
