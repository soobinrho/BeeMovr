'use client';

import { MapProvider } from 'react-map-gl';

import InformationConsole from './information-console';
import Mapbox from './mapbox';
import MapboxControls from './mapbox-controls';

export default function Home() {
  return (
    <main className='relative min-h-screen overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <MapProvider>
        <Mapbox />
        <InformationConsole />
        <MapboxControls />
      </MapProvider>
    </main>
  );
}
