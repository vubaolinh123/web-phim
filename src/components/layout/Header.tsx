'use client';

import Link from 'next/link';
import { useState } from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Mới nhất',
    href: '/moi-nhat',
  },
  {
    label: 'Bảng xếp hạng',
    href: '/bang-xep-hang',
  },
  {
    label: 'List diễn viên',
    href: '/dien-vien',
  },
  {
    label: 'Thể loại',
    dropdown: [
      { label: 'Hành động', href: '/the-loai/hanh-dong' },
      { label: 'Tình cảm', href: '/the-loai/tinh-cam' },
      { label: 'Hài hước', href: '/the-loai/hai-huoc' },
      { label: 'Kinh dị', href: '/the-loai/kinh-di' },
      { label: 'Khoa học viễn tưởng', href: '/the-loai/khoa-hoc-vien-tuong' },
      { label: 'Phiêu lưu', href: '/the-loai/phieu-luu' },
      { label: 'Tâm lý', href: '/the-loai/tam-ly' },
      { label: 'Chiến tranh', href: '/the-loai/chien-tranh' },
    ],
  },
  {
    label: 'Danh sách tag',
    href: '/tags',
  },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header style={{ backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border)' }} className="backdrop-blur-sm sticky top-0 z-50">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div style={{ backgroundColor: 'var(--primary)' }} className="p-2 rounded-lg group-hover:bg-red-700 transition-colors duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span style={{ color: 'var(--foreground)' }} className="text-2xl font-bold group-hover:text-red-400 transition-colors duration-300">
              Phim-Moi
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      style={{ color: 'var(--foreground-secondary)' }}
                      className="hover:text-white transition-colors duration-300 flex items-center space-x-1 py-2"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div style={{ backgroundColor: 'var(--background-tertiary)', borderColor: 'var(--border)' }} className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl border py-2 z-50">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            style={{ color: 'var(--foreground-secondary)' }}
                            className="block px-4 py-2 hover:text-white hover:bg-background-tertiary transition-colors duration-300"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    style={{ color: 'var(--foreground-secondary)' }}
                    className="hover:text-white transition-colors duration-300 py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-4">
            {/* Search Button/Form */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm phim..."
                    style={{ backgroundColor: 'var(--background-tertiary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    className="px-4 py-2 rounded-l-lg border focus:outline-none focus:border-blue-500 w-64"
                    autoFocus
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: 'var(--primary)' }}
                    className="hover:bg-red-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    style={{ color: 'var(--foreground-muted)' }}
                    className="ml-2 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  style={{ color: 'var(--foreground-secondary)' }}
                  className="hover:text-white transition-colors duration-300 p-2"
                  aria-label="Open search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button style={{ color: 'var(--foreground-secondary)' }} className="md:hidden hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
}
