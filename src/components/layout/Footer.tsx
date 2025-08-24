import Link from 'next/link';

const footerLinks = {
  'Thể loại phim': [
    { label: 'Phim hành động', href: '/the-loai/hanh-dong' },
    { label: 'Phim tình cảm', href: '/the-loai/tinh-cam' },
    { label: 'Phim hài hước', href: '/the-loai/hai-huoc' },
    { label: 'Phim kinh dị', href: '/the-loai/kinh-di' },
    { label: 'Phim khoa học viễn tưởng', href: '/the-loai/khoa-hoc-vien-tuong' },
  ],
  'Quốc gia': [
    { label: 'Phim Trung Quốc', href: '/quoc-gia/trung-quoc' },
    { label: 'Phim Hàn Quốc', href: '/quoc-gia/han-quoc' },
    { label: 'Phim Nhật Bản', href: '/quoc-gia/nhat-ban' },
    { label: 'Phim Thái Lan', href: '/quoc-gia/thai-lan' },
    { label: 'Phim Âu Mỹ', href: '/quoc-gia/au-my' },
  ],
  'Hỗ trợ': [
    { label: 'Liên hệ', href: '/lien-he' },
    { label: 'Báo lỗi', href: '/bao-loi' },
    { label: 'Yêu cầu phim', href: '/yeu-cau-phim' },
    { label: 'Hướng dẫn', href: '/huong-dan' },
    { label: 'FAQ', href: '/faq' },
  ],
  'Chính sách': [
    { label: 'Điều khoản sử dụng', href: '/dieu-khoan' },
    { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
    { label: 'Bản quyền', href: '/ban-quyen' },
    { label: 'DMCA', href: '/dmca' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/phimmoi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/phimmoi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/phimmoi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/phimmoi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--background-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="w-[95%] mx-auto py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div style={{ backgroundColor: 'var(--primary)' }} className="p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span style={{ color: 'var(--foreground)' }} className="text-xl font-bold">Phim-Moi</span>
            </Link>
            <p style={{ color: 'var(--foreground-muted)' }} className="text-sm mb-4">
              Xem phim online miễn phí chất lượng HD. Cập nhật liên tục phim mới nhất từ khắp nơi trên thế giới.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--foreground-muted)' }}
                  className="hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 style={{ color: 'var(--foreground)' }} className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: 'var(--foreground-muted)' }}
                      className="hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div style={{ borderTop: '1px solid var(--border)' }} className="mt-12 pt-8">
          <div className="max-w-md">
            <h3 style={{ color: 'var(--foreground)' }} className="font-semibold mb-2">Đăng ký nhận thông báo</h3>
            <p style={{ color: 'var(--foreground-muted)' }} className="text-sm mb-4">
              Nhận thông báo về phim mới và các ưu đãi đặc biệt
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                style={{ backgroundColor: 'var(--background-tertiary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                className="flex-1 px-4 py-2 rounded-l-lg border focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                style={{ backgroundColor: 'var(--primary)' }}
                className="hover:bg-red-700 text-white px-6 py-2 rounded-r-lg transition-colors duration-300"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{ borderTop: '1px solid var(--border)' }} className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div style={{ color: 'var(--foreground-muted)' }} className="text-sm mb-4 md:mb-0">
            © {currentYear} Phim-Moi. Tất cả quyền được bảo lưu.
          </div>

          <div style={{ color: 'var(--foreground-muted)' }} className="flex items-center space-x-6 text-sm">
            <Link href="/dieu-khoan" className="hover:text-white transition-colors duration-300">
              Điều khoản
            </Link>
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors duration-300">
              Bảo mật
            </Link>
            <Link href="/ban-quyen" className="hover:text-white transition-colors duration-300">
              Bản quyền
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ borderTop: '1px solid var(--border)' }} className="mt-8 pt-6">
          <p style={{ color: 'var(--foreground-subtle)' }} className="text-xs text-center">
            Phim-Moi không lưu trữ bất kỳ tệp video nào trên máy chủ của chúng tôi.
            Tất cả nội dung được cung cấp bởi các bên thứ ba không liên quan.
            Chúng tôi chỉ cung cấp liên kết đến các phương tiện được lưu trữ trên các dịch vụ khác.
          </p>
        </div>
      </div>
    </footer>
  );
}
