import Head from 'next/head';
import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'video.movie';
  siteName?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  videoUrl?: string;
  videoDuration?: number;
  videoWidth?: number;
  videoHeight?: number;
}

const defaultSEO = {
  title: 'Phim-Moi - Xem Phim Online Miễn Phí Chất Lượng HD',
  description: 'Xem phim online miễn phí chất lượng HD tại Phim-Moi. Cập nhật liên tục phim mới nhất, phim hay nhất từ Trung Quốc, Hàn Quốc, Thái Lan, Âu Mỹ và Việt Nam.',
  keywords: 'xem phim online, phim mới, phim hay, phim HD, phim miễn phí, phim Trung Quốc, phim Hàn Quốc, phim Thái Lan, phim Âu Mỹ',
  image: '/og-image.jpg',
  url: 'https://phim-moi.com',
  siteName: 'Phim-Moi',
  locale: 'vi_VN',
  type: 'website' as const,
};

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName,
  locale,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  videoUrl,
  videoDuration,
  videoWidth,
  videoHeight,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoImage = image || defaultSEO.image;
  const seoUrl = url || defaultSEO.url;
  const seoKeywords = keywords || defaultSEO.keywords;
  
  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: author ? [{ name: author }] : undefined,
    creator: 'Phim-Moi',
    publisher: 'Phim-Moi',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: siteName || defaultSEO.siteName,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: locale || defaultSEO.locale,
      type: type,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
      tags,
      videos: videoUrl ? [
        {
          url: videoUrl,
          width: videoWidth,
          height: videoHeight,
          type: 'video/mp4',
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@phimmoi',
      site: '@phimmoi',
    },
    alternates: {
      canonical: seoUrl,
    },
    category: 'entertainment',
  };

  return metadata;
}

interface SEOComponentProps extends SEOProps {
  children?: React.ReactNode;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName,
  locale,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  videoUrl,
  videoDuration,
  videoWidth,
  videoHeight,
  children,
}: SEOComponentProps) {
  const seoTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoImage = image || defaultSEO.image;
  const seoUrl = url || defaultSEO.url;
  const seoKeywords = keywords || defaultSEO.keywords;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'video.movie' ? 'Movie' : 'WebSite',
    name: seoTitle,
    description: seoDescription,
    url: seoUrl,
    image: seoImage,
    author: author ? {
      '@type': 'Person',
      name: author,
    } : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    keywords: tags?.join(', ') || seoKeywords,
    ...(type === 'video.movie' && videoUrl ? {
      video: {
        '@type': 'VideoObject',
        contentUrl: videoUrl,
        duration: videoDuration ? `PT${videoDuration}S` : undefined,
        width: videoWidth,
        height: videoHeight,
      },
    } : {}),
  };

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || 'Phim-Moi'} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName || defaultSEO.siteName} />
      <meta property="og:locale" content={locale || defaultSEO.locale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags?.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:creator" content="@phimmoi" />
      <meta name="twitter:site" content="@phimmoi" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Additional meta tags for better performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#000000" />
      
      {children}
    </Head>
  );
}
