import Mapbox from '@/components/mapbox';
import React from 'react';

export default function Home() {
  return (
    <main className='relative min-h-screen min-w-full overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <Mapbox />
    </main>
  );
}
