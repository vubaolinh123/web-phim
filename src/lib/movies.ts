import { Movie, MovieSummary } from '@/types/movie';

/**
 * =================== MOCK DATA (TEMPORARY) ===================
 * https://img.buomtv.live/data-optim/adult-videos/IPX-680/cover/IPX-680.webp
 * https://img.buomtv.live/data-optim/adult-videos/MIDV-169/thumb/MIDV-169.webp
 * ============================================================
 */

// Ảnh poster mẫu hợp lệ theo cấu hình remotePatterns
const POSTER = {
  anime: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
  action: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
  romance: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
  horror: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
  scifi: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg',
};

// Mock database for now. Replace with real API integration later.
const MOCK_MOVIES: Record<string, Movie> = {
  '1': {
    id: '1',
    title: 'Thanh Gươm Diệt Quỷ: Tuyệt Kỹ Hơi Thở',
    description: 'Câu chuyện theo chân Tanjiro và các Trụ Cột trong cuộc chiến chống lại quỷ dữ với những kỹ năng hơi thở đỉnh cao.',
    movieCode: 'TGK-2024',
    year: 2024,
    durationMinutes: 124,
    rating: 8.7,
    genres: ['Hành động', 'Phiêu lưu', 'Giả tưởng'],
    tags: ['Anime', 'Shounen', 'Phiêu lưu', 'Kiếm sĩ', 'Ma quỷ', 'Tình cảm', 'Hài hước', 'Kịch tính', 'Trung cổ', 'Chiến đấu'],
    posterUrl: POSTER.anime,
    bannerUrl: POSTER.anime,
    trailerUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '1080p', type: 'mp4' }],
    cast: [
      { id: 'c1', name: 'Natsuki Hanae', role: 'Tanjiro', totalMovies: 35, avatarUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg' },
      { id: 'c2', name: 'Akari Kito', role: 'Nezuko', totalMovies: 28, avatarUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg' },
      { id: 'c3', name: 'Hanae Ito', role: 'Zenitsu', totalMovies: 22, avatarUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg' },
      { id: 'c4', name: 'Yoshitsugu Matsuoka', role: 'Inosuke', totalMovies: 18, avatarUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/hinh-nen-demon-slayer-10-1.jpg' },
    ],
    director: 'Haruo Sotozaki',
    country: 'Nhật Bản',
    language: 'Tiếng Nhật',
    viewCount: 1234567,
  },
  '2': { id: '2', title: 'Hà Nội Mùa Thu Ấy', description: 'Một chuyện tình lãng mạn giữa lòng Hà Nội cổ kính.', movieCode: 'HN-2019', year: 2019, rating: 7.8, genres: ['Tình cảm'], tags: ['Lãng mạn','Việt Nam'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', type: 'mp4' }], cast: [], viewCount: 654321 },
  '3': { id: '3', title: 'Sài Gòn Trong Cơn Mưa', description: 'Những mảnh ghép cuộc sống nơi Sài Gòn tấp nập.', movieCode: 'SG-2020', year: 2020, rating: 7.2, genres: ['Tâm lý'], tags: ['Đời sống','Tâm lý'], posterUrl: POSTER.action, bannerUrl: POSTER.action, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', type: 'mp4' }], cast: [], viewCount: 402120 },
  '4': { id: '4', title: 'Kẻ Truy Sát Trong Bóng Đêm', description: 'Một sát thủ bí ẩn săn đuổi mục tiêu qua các thành phố.', movieCode: 'KT-2022', year: 2022, rating: 8.1, genres: ['Hành động'], tags: ['Kịch tính','Tội phạm'], posterUrl: POSTER.action, bannerUrl: POSTER.action, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '1080p', type: 'mp4' }], cast: [], viewCount: 987654 },
  '5': { id: '5', title: 'Cánh Cửa Thời Gian', description: 'Một nhà khoa học mở cánh cửa đến tương lai.', movieCode: 'TG-2023', year: 2023, rating: 8.4, genres: ['Khoa học viễn tưởng'], tags: ['Du hành thời gian','Công nghệ'], posterUrl: POSTER.scifi, bannerUrl: POSTER.scifi, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '1080p', type: 'mp4' }], cast: [], viewCount: 758000 },
  '6': { id: '6', title: 'Lời Nguyền Rừng Thiêng', description: 'Một nhóm bạn trẻ lạc vào khu rừng bị nguyền rủa.', movieCode: 'RQ-2018', year: 2018, rating: 6.9, genres: ['Kinh dị'], tags: ['Rùng rợn','Sinh tồn'], posterUrl: POSTER.horror, bannerUrl: POSTER.horror, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 220340 },
  '7': { id: '7', title: 'Bước Chân Tuổi Trẻ', description: 'Hành trình lập nghiệp đầy thử thách của một nhóm bạn.', movieCode: 'TT-2017', year: 2017, rating: 7.0, genres: ['Thanh xuân'], tags: ['Tuổi trẻ','Ước mơ'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 120000 },
  '8': { id: '8', title: 'Bản Hòa Tấu Của Biển', description: 'Âm nhạc và biển cả hòa quyện trong câu chuyện cảm động.', movieCode: 'BH-2021', year: 2021, rating: 7.5, genres: ['Âm nhạc'], tags: ['Gia đình','Cảm động'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', type: 'mp4' }], cast: [], viewCount: 343210 },
  '9': { id: '9', title: 'Phi Vụ Trăm Tỷ', description: 'Một phi vụ táo bạo của băng nhóm tội phạm xuyên quốc gia.', movieCode: 'PV-2016', year: 2016, rating: 7.9, genres: ['Tội phạm'], tags: ['Hành động','Trinh thám'], posterUrl: POSTER.action, bannerUrl: POSTER.action, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', type: 'mp4' }], cast: [], viewCount: 888888 },
  '10': { id: '10', title: 'Hẹn Ước Dưới Sao', description: 'Lời hẹn ước tuổi trẻ dưới bầu trời đầy sao.', movieCode: 'SAO-2015', year: 2015, rating: 7.1, genres: ['Tình cảm'], tags: ['Tuổi học trò','Lãng mạn'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 210450 },
  '11': { id: '11', title: 'Bức Tường Ảo Ảnh', description: 'Một thám tử đuổi theo tội phạm công nghệ cao.', movieCode: 'AA-2021', year: 2021, rating: 8.2, genres: ['Khoa học viễn tưởng','Hành động'], tags: ['Hack','AI','Thám tử'], posterUrl: POSTER.scifi, bannerUrl: POSTER.scifi, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '1080p', type: 'mp4' }], cast: [], viewCount: 560000 },
  '12': { id: '12', title: 'Ký Ức Bóng Đêm', description: 'Ký ức bị chôn vùi dần được hé lộ qua những cơn ác mộng.', movieCode: 'KU-2018', year: 2018, rating: 6.8, genres: ['Kinh dị','Tâm lý'], tags: ['Ác mộng','Bí ẩn'], posterUrl: POSTER.horror, bannerUrl: POSTER.horror, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 190000 },
  '13': { id: '13', title: 'Thiên Hà Xa Xôi', description: 'Cuộc phiêu lưu đến rìa thiên hà của phi hành đoàn trẻ.', movieCode: 'TH-2022', year: 2022, rating: 8.6, genres: ['Khoa học viễn tưởng'], tags: ['Vũ trụ','Du hành','Phiêu lưu'], posterUrl: POSTER.scifi, bannerUrl: POSTER.scifi, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '1080p', type: 'mp4' }], cast: [], viewCount: 930000 },
  '14': { id: '14', title: 'Mật Vụ Bóng Đêm', description: 'Cuộc chiến ngầm giữa các thế lực đối đầu.', movieCode: 'MV-2019', year: 2019, rating: 7.6, genres: ['Hành động','Tội phạm'], tags: ['Điệp viên','Gián điệp'], posterUrl: POSTER.action, bannerUrl: POSTER.action, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', type: 'mp4' }], cast: [], viewCount: 672300 },
  '15': { id: '15', title: 'Khúc Ca Mùa Hạ', description: 'Âm nhạc gắn kết ước mơ tuổi trẻ.', movieCode: 'MH-2014', year: 2014, rating: 6.9, genres: ['Âm nhạc','Thanh xuân'], tags: ['Ban nhạc','Ước mơ'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 112340 },
  '16': { id: '16', title: 'Bí Ẩn Trong Rừng', description: 'Những bí ẩn chưa lời giải trong khu rừng cổ.', movieCode: 'BR-2013', year: 2013, rating: 6.7, genres: ['Kinh dị','Bí ẩn'], tags: ['Sinh tồn','Huyền bí'], posterUrl: POSTER.horror, bannerUrl: POSTER.horror, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 167890 },
  '17': { id: '17', title: 'Vượt Qua Giông Bão', description: 'Hành trình vượt khó vươn tới thành công.', movieCode: 'GB-2020', year: 2020, rating: 7.3, genres: ['Tâm lý','Gia đình'], tags: ['Động lực','Cảm hứng'], posterUrl: POSTER.action, bannerUrl: POSTER.action, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p', type: 'mp4' }], cast: [], viewCount: 245000 },
  '18': { id: '18', title: 'Ánh Sáng Hi Vọng', description: 'Câu chuyện về lòng tốt và sự sẻ chia.', movieCode: 'HV-2012', year: 2012, rating: 7.0, genres: ['Chính kịch'], tags: ['Nhân văn','Cảm động'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 132450 },
  '19': { id: '19', title: 'Đêm Dài Không Ngủ', description: 'Một đêm đầy biến cố làm thay đổi cuộc đời.', movieCode: 'DN-2011', year: 2011, rating: 6.5, genres: ['Tâm lý','Hình sự'], tags: ['Căng thẳng','Đô thị'], posterUrl: POSTER.action, bannerUrl: POSTER.action, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 98000 },
  '20': { id: '20', title: 'Vũ Điệu Của Biển', description: 'Điệu nhảy tự do bên bờ biển mùa hè.', movieCode: 'VD-2010', year: 2010, rating: 6.2, genres: ['Âm nhạc'], tags: ['Nhảy múa','Tự do'], posterUrl: POSTER.romance, bannerUrl: POSTER.romance, sources: [{ url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p', type: 'mp4' }], cast: [], viewCount: 75400 },
};

/**
 * =================== END MOCK DATA ===================
 */

export async function getMovieById(id: string): Promise<Movie | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_MOVIES[id] || null;
}

export async function getSimilarMovies(id: string, limit = 8): Promise<MovieSummary[]> {
  const all = Object.values(MOCK_MOVIES);
  const others = all.filter((m) => m.id !== id);
  return others.slice(0, limit).map((m) => ({
    id: m.id,
    title: m.title,
    movieCode: m.movieCode,
    viewCount: m.viewCount,
    posterUrl: m.posterUrl,
  }));
}

export async function getTopMovies(limit = 10): Promise<MovieSummary[]> {
  const all = Object.values(MOCK_MOVIES).sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  return all.slice(0, limit).map((m) => ({
    id: m.id,
    title: m.title,
    movieCode: m.movieCode,
    viewCount: m.viewCount,
    posterUrl: m.posterUrl,
  }));
}

