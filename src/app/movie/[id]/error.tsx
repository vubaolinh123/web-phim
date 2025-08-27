'use client';

export default function MovieError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="w-[95%] mx-auto py-24 text-center">
      <h1 className="text-3xl font-bold mb-2">Có lỗi xảy ra</h1>
      <p className="text-gray-400 mb-6">{error.message || 'Vui lòng thử lại sau.'}</p>
      <button onClick={reset} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700">Thử lại</button>
    </div>
  );
}

