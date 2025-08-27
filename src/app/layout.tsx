import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { generateMetadata as generateSEOMetadata } from "@/components/shared/SEO";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const baseMetadata = generateSEOMetadata({
  title: "Trang chủ",
  description: "Xem phim online miễn phí chất lượng HD tại Phim-Moi. Cập nhật liên tục phim mới nhất, phim hay nhất từ Trung Quốc, Hàn Quốc, Thái Lan, Âu Mỹ và Việt Nam.",
  keywords: "xem phim online, phim mới, phim hay, phim HD, phim miễn phí, phim Trung Quốc, phim Hàn Quốc, phim Thái Lan, phim Âu Mỹ",
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
