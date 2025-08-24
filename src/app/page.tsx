import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { generateMetadata } from '@/components/shared/SEO';

// Dynamic imports for performance optimization
const HeroBanner = dynamic(() => import('@/components/sections/HeroBanner'), {
  loading: () => (
    <div className="h-screen bg-gray-900 animate-pulse flex items-center justify-center">
      <div className="text-white">Đang tải...</div>
    </div>
  ),
});

const FeaturedRecommendations = dynamic(() => import('@/components/sections/FeaturedRecommendations'), {
  loading: () => (
    <div className="py-16 bg-gray-950/50">
      <div className="w-[95%] mx-auto px-4">
        <div className="h-8 bg-gray-800 rounded w-64 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-7 gap-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-gray-800 aspect-[2/3] rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  ),
});

const ChineseMoviesSection = dynamic(() => import('@/components/sections/MovieCategorySection').then(mod => mod.ChineseMoviesSection), { ssr: true });
const KoreanMoviesSection = dynamic(() => import('@/components/sections/MovieCategorySection').then(mod => mod.KoreanMoviesSection), { ssr: true });
const ThaiMoviesSection = dynamic(() => import('@/components/sections/MovieCategorySection').then(mod => mod.ThaiMoviesSection), { ssr: true });
const WesternMoviesSection = dynamic(() => import('@/components/sections/MovieCategorySection').then(mod => mod.WesternMoviesSection), { ssr: true });
const RecommendedForYouSection = dynamic(() => import('@/components/sections/MovieCategorySection').then(mod => mod.RecommendedForYouSection), { ssr: true });
const Top10MoviesSection = dynamic(() => import('@/components/sections/MovieCategorySection').then(mod => mod.Top10MoviesSection), { ssr: true });

// SEO metadata for homepage
export const metadata = generateMetadata({
  title: 'Trang chủ',
  description: 'Xem phim online miễn phí chất lượng HD tại Phim-Moi. Cập nhật liên tục phim mới nhất, phim hay nhất từ Trung Quốc, Hàn Quốc, Thái Lan, Âu Mỹ và Việt Nam.',
  keywords: 'xem phim online, phim mới, phim hay, phim HD, phim miễn phí, phim Trung Quốc, phim Hàn Quốc, phim Thái Lan, phim Âu Mỹ',
  type: 'website',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Banner Section */}
      <Suspense fallback={
        <div className="h-screen bg-gray-900 animate-pulse flex items-center justify-center">
          <div className="text-white">Đang tải banner...</div>
        </div>
      }>
        <HeroBanner />
      </Suspense>

      {/* Featured Recommendations Section */}
      <Suspense fallback={
        <div className="py-16 bg-gray-950/50 animate-pulse">
          <div className="w-[95%]  mx-auto px-4">
            <div className="h-8 bg-gray-800 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-7 gap-6">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="bg-gray-800 aspect-[2/3] rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }>
        <FeaturedRecommendations />
      </Suspense>

      {/* Movie Category Sections */}
      <div className="space-y-0" style={{ backgroundColor: 'var(--background)' }}>
        {/* Chinese Movies */}
        <Suspense fallback={<div className="py-12 bg-gray-900 animate-pulse h-96"></div>}>
          <ChineseMoviesSection />
        </Suspense>

        {/* Korean Movies */}
        <Suspense fallback={<div className="py-12 bg-gray-900 animate-pulse h-96"></div>}>
          <KoreanMoviesSection />
        </Suspense>

        {/* Thai Movies */}
        <Suspense fallback={<div className="py-12 bg-gray-900 animate-pulse h-96"></div>}>
          <ThaiMoviesSection />
        </Suspense>

        {/* Western Movies */}
        <Suspense fallback={<div className="py-12 bg-gray-900 animate-pulse h-96"></div>}>
          <WesternMoviesSection />
        </Suspense>

        {/* Recommended for You */}
        <Suspense fallback={<div className="py-12 bg-gray-950/30 animate-pulse h-96"></div>}>
          <RecommendedForYouSection />
        </Suspense>

        {/* Top 10 Movies */}
        <Suspense fallback={<div className="py-12 bg-gradient-to-r from-red-900/20 to-blue-900/20 animate-pulse h-96"></div>}>
          <Top10MoviesSection />
        </Suspense>
      </div>
    </div>
  );
}
