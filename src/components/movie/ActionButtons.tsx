'use client';

import { useState } from 'react';
import { FaBookmark, FaShareAlt, FaThumbsUp } from 'react-icons/fa';

export default function ActionButtons() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) await navigator.share({ url, title: 'Chia sẻ phim' });
      else await navigator.clipboard.writeText(url);
      // Non-blocking UX; can be replaced with a toast
    } catch {}
  };

  return (
    <div className="flex gap-3">
      <button
        aria-pressed={liked}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded border transition ${liked ? 'bg-red-600 text-white border-red-600' : 'border-white/20 hover:bg-white/10'}`}
        onClick={() => setLiked((v) => !v)}
      >
        <FaThumbsUp /> Thích
      </button>
      <button
        aria-pressed={saved}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded border transition ${saved ? 'bg-blue-600 text-white border-blue-600' : 'border-white/20 hover:bg-white/10'}`}
        onClick={() => setSaved((v) => !v)}
      >
        <FaBookmark /> Lưu
      </button>
      <button
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded border border-white/20 hover:bg-white/10"
        onClick={share}
      >
        <FaShareAlt /> Chia sẻ
      </button>
    </div>
  );
}

