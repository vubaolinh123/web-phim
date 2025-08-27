export interface Source {
  url: string;
  quality: '360p' | '480p' | '720p' | '1080p' | '4k';
  type?: 'mp4' | 'm3u8' | 'dash';
}

export interface CastMember {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  totalMovies?: number;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  movieCode?: string;
  year?: number;
  durationMinutes?: number;
  rating?: number; // 0-10
  genres?: string[];
  tags?: string[];
  posterUrl?: string;
  bannerUrl?: string;
  trailerUrl?: string;
  sources: Source[];
  cast?: CastMember[];
  director?: string;
  country?: string;
  language?: string;
  viewCount?: number;
}

export interface MovieSummary {
  id: string;
  title: string;
  movieCode?: string;
  viewCount?: number;
  posterUrl?: string;
}
