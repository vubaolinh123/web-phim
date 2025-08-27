'use client';

import Link from 'next/link';
import CardVideoItem from '@/components/shared/CardVideoItem';
import type { MovieSummary } from '@/types/movie';

interface RecommendedListProps { movies: MovieSummary[]; title?: string }

export default function RecommendedList({ movies, title = 'Phim đề xuất' }: RecommendedListProps) {
  return (
    <section className="bg-[var(--card-background)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href="/" className="text-sm text-red-500 hover:text-red-400">Xem tất cả</Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {movies.map((m) => (
          <CardVideoItem key={m.id} id={m.id} title={m.title} movieCode={m.movieCode || ''} viewCount={m.viewCount || 0} posterUrl={m.posterUrl} href={`/movie/${m.id}`} showHoverEffect={false} />
        ))}
      </div>
    </section>
  );
}

