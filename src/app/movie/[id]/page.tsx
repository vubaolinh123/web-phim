import dynamic from 'next/dynamic';
import ClientMoviePlayer from '@/components/movie/ClientMoviePlayer';
import { notFound } from 'next/navigation';
import { getMovieById, getSimilarMovies } from '@/lib/movies';
import { generateMetadata as generateSEO } from '@/components/shared/SEO';
import type { Metadata } from 'next';

// Dynamically import heavy client components
// Client-only wrapper due to ssr: false restriction in server files
const MoviePlayer = ClientMoviePlayer;
const MovieInfo = dynamic(() => import('@/components/movie/MovieInfo'), { loading: () => <div className="h-64 bg-gray-900 animate-pulse rounded-lg" /> });
const SidebarActions = dynamic(() => import('@/components/movie/SidebarActions'), { loading: () => <div className="h-40 bg-gray-900 animate-pulse rounded-lg" /> });
const RecommendedList = dynamic(() => import('@/components/movie/RecommendedList'), { loading: () => <div className="h-96 bg-gray-900 animate-pulse rounded-lg" /> });
const ActionButtons = dynamic(() => import('@/components/movie/ActionButtons'), { loading: () => <div className="h-10 bg-gray-900 animate-pulse rounded" /> });

interface PageProps { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieById(id);
  if (!movie) return generateSEO({ title: 'Phim không tồn tại', description: 'Không tìm thấy phim.' });
  return generateSEO({
    title: movie.title,
    description: movie.description,
    image: movie.bannerUrl || movie.posterUrl,
    type: 'video.movie',
    tags: movie.tags,
    publishedTime: movie.year ? `${movie.year}-01-01` : undefined,
    videoUrl: movie.sources?.[0]?.url,
    videoWidth: 1920,
    videoHeight: 1080,
  });
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieById(id);
  if (!movie) notFound();
  // Sidebar HOT: 10 items; Below MovieInfo Recommended: 18 items
  const hot = await getSimilarMovies(id, 10);
  const similar = await getSimilarMovies(id, 18);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.description,
    datePublished: movie.year ? `${movie.year}-01-01` : undefined,
    image: movie.bannerUrl || movie.posterUrl,
    aggregateRating: typeof movie.rating === 'number' ? {
      '@type': 'AggregateRating',
      ratingValue: movie.rating,
      ratingCount: Math.max(100, Math.round((movie.viewCount || 1000) / 10)),
    } : undefined,
    actor: movie.cast?.map(c => ({ '@type': 'Person', name: c.name }))
  };

  return (
    <main className="w-[95%] mx-auto py-6" itemScope itemType="https://schema.org/Movie">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <meta itemProp="name" content={movie.title} />
      <meta itemProp="datePublished" content={movie.year ? `${movie.year}-01-01` : ''} />
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-lg overflow-hidden bg-black">
            <MoviePlayer sources={movie.sources} poster={movie.bannerUrl || movie.posterUrl} title={movie.title} />
          </div>
          {/* Action buttons below player */}
          <div className="bg-[var(--card-background)] rounded-lg p-3 sm:p-4">
            <ActionButtons />
          </div>
          <MovieInfo movie={movie} />
          {/* Recommended for you below MovieInfo */}
          <RecommendedList movies={similar} title="Đề xuất cho bạn" />
        </div>
        <aside className="lg:col-span-1 space-y-4">
          {/* Sidebar shows HOT recommendations now */}
          <SidebarActions movies={hot} />
        </aside>
      </section>
    </main>
  );
}

