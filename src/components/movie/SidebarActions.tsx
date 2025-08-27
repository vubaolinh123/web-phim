'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/shared/OptimizedImage';
import type { MovieSummary } from '@/types/movie';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';

export default function SidebarActions({ movies }: { movies: MovieSummary[] }) {
  return (
    <aside className="bg-[var(--card-background)] rounded-lg p-5 space-y-4">
      <h3 className="text-xl font-semibold mb-2">Đề xuất các bộ phim HOT</h3>
      <div className="space-y-4">
        {movies.map((m) => (
          <Link key={m.id} href={`/movie/${m.id}`} className="flex gap-4 group">
            {/* Hybrid approach: keep landscape container, fit portrait posters without distortion */}
            <div className="w-40 sm:w-44 md:w-48 aspect-video rounded-lg overflow-hidden shrink-0 relative bg-black/40">
              <OptimizedImage
                src={m.posterUrl || '/placeholder-movie-poster.jpg'}
                alt={m.title}
                fill
                sizes="(max-width: 640px) 10rem, (max-width: 768px) 11rem, 12rem"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Details */}
            <div className="min-w-0 flex-1">
              {/* Bigger, bolder title */}
              <h4 className="text-lg sm:text-xl font-semibold leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                {m.title}
              </h4>
              {/* Subline with code (if any) */}
              {m.movieCode ? (
                <div className="text-xs sm:text-sm text-gray-400 truncate mt-0.5">[{m.movieCode}]</div>
              ) : null}
              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 mt-2">
                <span className="inline-flex items-center gap-1"><FaCalendarAlt /> 2024</span>
                <span className="inline-flex items-center gap-1"><FaEye /> {(m.viewCount || 0).toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

