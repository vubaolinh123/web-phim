import Link from 'next/link';

export default function MovieNotFound() {
  return (
    <div className="w-[95%] mx-auto py-24 text-center">
      <h1 className="text-3xl font-bold mb-2">Không tìm thấy phim</h1>
      <p className="text-gray-400 mb-6">Có thể phim đã bị xóa hoặc bạn nhập sai đường dẫn.</p>
      <Link href="/" className="px-4 py-2 rounded bg-red-600 hover:bg-red-700">Về trang chủ</Link>
    </div>
  );
}

