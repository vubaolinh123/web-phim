'use client';

import { SwiperSlide } from 'swiper/react';
import SwiperSlider from '@/components/shared/SwiperSlider';
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

interface MovieCategorySectionProps {
  title: string;
  movies: Movie[];
  seeMoreHref?: string;
  loading?: boolean;
  className?: string;
  maxItems?: number;
}

// Sample movie data generator
const generateSampleMovies = (category: string, count: number = 20): Movie[] => {
  const actors = [
    'Jackie Chan', 'Jet Li', 'Donnie Yen', 'Andy Lau', 'Tony Leung',
    'Song Joong-ki', 'Lee Min-ho', 'Park Seo-joon', 'Hyun Bin', 'Gong Yoo',
    'Mario Maurer', 'Nadech Kugimiya', 'Mark Prin', 'James Jirayu', 'Pope Thanawat',
    'Tom Cruise', 'Leonardo DiCaprio', 'Brad Pitt', 'Will Smith', 'Robert Downey Jr.'
  ];

  const movieTitles = {
    'chinese': [
      'Thiếu Lâm Tự', 'Tân Thần Điêu Đại Hiệp', 'Hoàng Phi Hồng', 'Anh Hùng Xạ Điêu',
      'Thiên Long Bát Bộ', 'Lục Tiểu Phụng', 'Tuyệt Đại Song Kiều', 'Bạch Phát Ma Nữ',
      'Thần Điêu Đại Hiệp', 'Ỷ Thiên Đồ Long Ký', 'Tiếu Ngạo Giang Hồ', 'Thần Cẩu Hiệp Lữ',
      'Tân Bến Thượng Hải', 'Vô Gian Đạo', 'Anh Hùng Bản Sắc', 'Thành Long Đại Ca',
      'Diệp Vấn', 'Tân Cảnh Sát Câu Chuyện', 'Ma Vương', 'Thiết Quyền'
    ],
    'korean': [
      'Hậu Duệ Mặt Trời', 'Goblin', 'Crash Landing On You', 'Itaewon Class',
      'Hotel Del Luna', 'Kingdom', 'Squid Game', 'Sweet Home', 'Vincenzo',
      'Start-Up', 'True Beauty', 'Nevertheless', 'Hometown Cha-Cha-Cha',
      'My Name', 'Hellbound', 'All of Us Are Dead', 'Business Proposal',
      'Twenty Five Twenty One', 'Our Blues', 'Extraordinary Attorney Woo', 'Big Mouth'
    ],
    'thai': [
      'Tình Yêu Không Có Lỗi', 'Chiếc Lá Bay', 'Nàng Fah Gub Chao Phraya',
      'Thần Tượng', 'Trái Tim Sắt Đá', 'Nữ Thần Rắn', 'Công Chúa Cát',
      'Tình Yêu Màu Hồng', 'Đóa Hoa Hồng Gai', 'Nàng Sida', 'Trái Tim Hoang Dã',
      'Nữ Hoàng Băng Giá', 'Tình Yêu Vĩnh Cửu', 'Đêm Trăng Tình Yêu',
      'Nàng Công Chúa Cổ Tích', 'Trái Tim Đại Dương', 'Tình Yêu Bất Diệt',
      'Nữ Thần Mặt Trời', 'Hoàng Tử Ếch', 'Tình Yêu Màu Xanh'
    ],
    'western': [
      'Avengers: Endgame', 'Spider-Man: No Way Home', 'Top Gun: Maverick',
      'Black Panther', 'Doctor Strange', 'Thor: Love and Thunder',
      'Jurassic World', 'Fast & Furious', 'Mission Impossible', 'John Wick',
      'The Batman', 'Wonder Woman', 'Aquaman', 'Shazam', 'Captain Marvel',
      'Guardians of the Galaxy', 'Ant-Man', 'Captain America', 'Iron Man', 'Hulk'
    ]
  };

    const getDeterministicTitle = (index: number) => {
    const categoryKey = category.toLowerCase().includes('trung') ? 'chinese' :
                       category.toLowerCase().includes('hàn') ? 'korean' :
                       category.toLowerCase().includes('thái') ? 'thai' : 'western';
    const titles = movieTitles[categoryKey];
    return titles[index % titles.length]; // Use modulo to cycle through titles
  };

  return Array.from({ length: count }, (_, index) => ({
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
    title: getDeterministicTitle(index),
    actor: actors[index % actors.length], // Use modulo to cycle through actors
    movieCode: `${category.substring(0, 3).toUpperCase()}-${String(index + 1).padStart(3, '0')}`,
    viewCount: (index * 12345 + category.length * 678) % 2000000 + 100000, // Deterministic view count
    posterUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
    href: `/phim/${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
  }));
};

export default function MovieCategorySection({
  title,
  movies,
  seeMoreHref,
  loading = false,
  className = '',
  maxItems,
}: MovieCategorySectionProps) {
  // Use provided movies or generate sample data
  const displayMovies = movies.length > 0 ? movies : generateSampleMovies(title);
  const categoryHref = seeMoreHref || `/the-loai/${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section className={`py-12 ${className}`} style={{ padding: '3rem 0' }}>
      <div className="w-[95%] mx-auto py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <a href={categoryHref} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Xem thêm
          </a>
        </div>
        <SwiperSlider>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <CardVideoItemSkeleton />
                </SwiperSlide>
              ))
            : displayMovies.map((movie, index) => (
                <SwiperSlide key={movie.id}>
                  <CardVideoItem {...movie} priority={index < 5} />
                </SwiperSlide>
              ))}
        </SwiperSlider>
      </div>
    </section>
  );
}

// Pre-configured category components for easy use
export function ChineseMoviesSection({ movies = [], loading = false }: { movies?: Movie[], loading?: boolean }) {
  return (
    <MovieCategorySection
      title="Phim Trung Quốc"
      movies={movies}
      seeMoreHref="/quoc-gia/trung-quoc"
      loading={loading}
    />
  );
}

export function KoreanMoviesSection({ movies = [], loading = false }: { movies?: Movie[], loading?: boolean }) {
  return (
    <MovieCategorySection
      title="Phim Hàn Quốc"
      movies={movies}
      seeMoreHref="/quoc-gia/han-quoc"
      loading={loading}
    />
  );
}

export function ThaiMoviesSection({ movies = [], loading = false }: { movies?: Movie[], loading?: boolean }) {
  return (
    <MovieCategorySection
      title="Phim Thái Lan"
      movies={movies}
      seeMoreHref="/quoc-gia/thai-lan"
      loading={loading}
    />
  );
}

export function WesternMoviesSection({ movies = [], loading = false }: { movies?: Movie[], loading?: boolean }) {
  return (
    <MovieCategorySection
      title="Phim Âu Mỹ"
      movies={movies}
      seeMoreHref="/quoc-gia/au-my"
      loading={loading}
    />
  );
}

export function RecommendedForYouSection({ movies = [], loading = false }: { movies?: Movie[], loading?: boolean }) {
  return (
    <MovieCategorySection
      title="Đề xuất cho bạn"
      movies={movies}
      seeMoreHref="/de-xuat-cho-ban"
      loading={loading}
      className="bg-gray-950/30"
    />
  );
}

export function Top10MoviesSection({ movies = [], loading = false }: { movies?: Movie[], loading?: boolean }) {
  return (
    <MovieCategorySection
      title="Top 10 phim"
      movies={movies}
      seeMoreHref="/top-10"
      loading={loading}
      maxItems={10}
      className="bg-gradient-to-r from-red-900/20 to-blue-900/20"
    />
  );
}
