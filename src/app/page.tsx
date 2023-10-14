import React from 'react';

import Mapbox from './components/mapbox';

export default function Home() {
  return (
    <main className='relative min-h-screen min-w-full overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <Mapbox />
    </main>
  );
}
