'use client';

import React from 'react';
import { MapProvider } from 'react-map-gl';

import InformationConsole from './components/information-console';
import Mapbox from './components/mapbox';

export default function Home() {
  return (
    <main className='relative min-h-screen overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <MapProvider>
        <Mapbox />
        <InformationConsole />
      </MapProvider>
    </main>
  );
}
