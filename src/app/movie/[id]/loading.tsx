export default function LoadingMovie() {
  return (
    <div className="w-[95%] mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="aspect-video w-full bg-gray-900 animate-pulse rounded grid place-items-center">
            <div className="w-10 h-10 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin" />
          </div>
          <div className="h-10 bg-gray-900 animate-pulse rounded" />
          <div className="h-64 bg-gray-900 animate-pulse rounded" />
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div className="h-40 bg-gray-900 animate-pulse rounded" />
          <div className="h-96 bg-gray-900 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

