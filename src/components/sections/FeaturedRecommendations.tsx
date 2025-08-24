'use client';

import CardVideoItem, { CardVideoItemSkeleton } from '@/components/shared/CardVideoItem';

interface Movie {
  id: string;
  title: string;
  actor?: string;
  movieCode: string;
  viewCount: number;
  posterUrl?: string;
  href?: string;
}

interface FeaturedRecommendationsProps {
  movies?: Movie[];
  loading?: boolean;
  className?: string;
}

// Sample data for featured recommendations
const sampleMovies: Movie[] = [
  {
    id: 'featured-1',
    title: 'Avengers: Endgame',
    actor: 'Robert Downey Jr.',
    movieCode: 'AVG-001',
    viewCount: 2500000,
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: '/phim/avengers-endgame',
  },
  {
    id: 'featured-2',
    title: 'Spider-Man: No Way Home',
    actor: 'Tom Holland',
    movieCode: 'SPM-003',
    viewCount: 1800000,
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: '/phim/spiderman-no-way-home',
  },
  {
    id: 'featured-3',
    title: 'Top Gun: Maverick',
    actor: 'Tom Cruise',
    movieCode: 'TGM-001',
    viewCount: 1200000,
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: '/phim/top-gun-maverick',
  },
  {
    id: 'featured-4',
    title: 'Black Panther: Wakanda Forever',
    actor: 'Angela Bassett',
    movieCode: 'BPW-002',
    viewCount: 950000,
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: '/phim/black-panther-wakanda',
  },
  {
    id: 'featured-5',
    title: 'Doctor Strange 2',
    actor: 'Benedict Cumberbatch',
    movieCode: 'DS2-001',
    viewCount: 1100000,
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: '/phim/doctor-strange-2',
  },
  {
    id: 'featured-6',
    title: 'Thor: Love and Thunder',
    actor: 'Chris Hemsworth',
    movieCode: 'THR-004',
    viewCount: 890000,
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: '/phim/thor-love-thunder',
  },
];

export default function FeaturedRecommendations({
  movies = sampleMovies,
  loading = false,
  className = '',
}: FeaturedRecommendationsProps) {
  return (
    <section style={{ backgroundColor: 'var(--background)' }} className={`py-16 ${className}`}>
      <div className="w-[95%] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 style={{ color: 'var(--foreground)' }} className="text-3xl font-bold mb-2">
              Đề xuất nổi bật
            </h2>
            <p style={{ color: 'var(--foreground-muted)' }}>
              Những bộ phim được đánh giá cao và xem nhiều nhất
            </p>
          </div>

          {/* View All Button */}
          <a
            href="/de-xuat"
            style={{ color: 'var(--secondary)' }}
            className="hidden md:flex items-center space-x-2 hover:text-blue-300 transition-colors duration-300 group"
          >
            <span>Xem tất cả</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 7 }).map((_, index) => (
              <CardVideoItemSkeleton key={index} />
            ))
          ) : (
            // Movie cards
            movies.slice(0, 7).map((movie, index) => (
              <CardVideoItem
                key={movie.id}
                {...movie}
                priority={index < 4} // Prioritize first 4 images for loading
                className="transform hover:scale-105 transition-transform duration-300"
              />
            ))
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="/de-xuat"
            style={{ backgroundColor: 'var(--background-tertiary)', color: 'var(--foreground)' }}
            className="inline-flex items-center space-x-2 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-300"
          >
            <span>Xem tất cả đề xuất</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
