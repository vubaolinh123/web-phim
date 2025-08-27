'use client';

import { useState } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/shared/OptimizedImage';
import type { Movie } from '@/types/movie';
import { FaCalendarAlt, FaEye, FaFilm, FaHashtag } from 'react-icons/fa';

interface MovieInfoProps { movie: Movie }

export default function MovieInfo({ movie }: MovieInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const desc = movie.description || '';
  const short = desc.length > 260 ? desc.slice(0, 260) + '…' : desc;

  return (
    <section className="bg-[var(--card-background)] rounded-lg p-4 sm:p-6 space-y-6">
      {/* 1. Title */}
      <h1 className="text-2xl sm:text-3xl font-bold" itemProp="name">{movie.title}</h1>

      {/* 2. Stats row: views, release, code */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
        <span className="inline-flex items-center gap-2"><FaEye /> {(movie.viewCount || 0).toLocaleString()} lượt xem</span>
        <span className="inline-flex items-center gap-2"><FaCalendarAlt /> {movie.year || '—'}</span>
        <span className="inline-flex items-center gap-2"><FaHashtag /> {movie.movieCode || '—'}</span>
      </div>

      {/* 3. Tags as links */}
      {movie.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {movie.tags.map((t) => (
            <Link
              key={t}
              href="#"
              className="px-3 py-1 rounded-full text-xs border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label={`Xem phim theo tag ${t}`}
            >
              {t}
            </Link>
          ))}
        </div>
      ) : null}

      {/* Description (kept for context) */}
      <p className="text-gray-300" itemProp="description">
        {expanded ? desc : short}
        {desc.length > short.length && (
          <button className="ml-2 text-red-500 hover:text-red-400" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        )}
      </p>

      {/* 4. Main Cast - side-by-side layout */}
      {movie.cast?.length ? (
        <div>
          <h2 className="text-lg font-semibold mb-3">Diễn Viên Chính</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movie.cast.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card-background)]/60 border border-white/10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0">
                  <OptimizedImage src={c.avatarUrl || '/placeholder-movie-poster.jpg'} alt={c.name} width={112} height={112} />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-semibold truncate" title={c.name}>{c.name}</div>
                  <div className="text-sm text-gray-400 truncate">{c.role || ''}</div>
                  <div className="text-sm text-gray-200 mt-2 inline-flex items-center gap-2"><FaFilm /> {c.totalMovies || 0} phim</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

