'use client';

import dynamic from 'next/dynamic';

const ClientMoviePlayer = dynamic(() => import('./MoviePlayer'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full bg-gray-900 animate-pulse" />,
});

export default ClientMoviePlayer;

