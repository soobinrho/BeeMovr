'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import Map, { Marker, NavigationControl, Popup, ViewState } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';

import ConditionalRendering from './conditional-rendering';

export default function Mapbox() {
  const [viewport, setViewport] = useState<ViewState>({
    longitude: 1,
    latitude: 1,
    zoom: 2,
    bearing: 0,
    pitch: 0,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
  });

  // const mapRef = useRef<MapRef | null>(null);

  // const onMapLoad = useCallback(() => {
  //   mapRef.current.on('move', () => {
  //   });
  // } []);

  return (
    <div>
      <div className='absolute z-10 grid w-screen grid-cols-1 justify-between sm:grid-cols-2'>
        <div className='m-2 justify-self-center rounded-3xl bg-background-console/50 p-3 text-left font-semibold hover:bg-background-space/80 sm:justify-self-start'>
          <b>Longitude</b>&nbsp;&nbsp;&nbsp;{viewport.longitude.toFixed(6)}
          <br />
          <b>Latitude</b>&nbsp;&nbsp;&nbsp;{viewport.latitude.toFixed(6)}
        </div>
        <div className='invisible z-10 m-4 p-3 sm:visible sm:justify-self-end'>
          <a
            target='_blank'
            href={process.env.NEXT_PUBLIC_GITHUB}
            rel='noopener noreferrer'
          >
            <svg
              className='fill-current text-font-console hover:text-gray-400 active:text-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>
        </div>
      </div>

      <ConditionalRendering condition={viewport.zoom < 2.5}>
        {/* <div className='invisible absolute z-10 flex min-h-[43%] min-w-full select-none flex-row items-end justify-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] sm:visible'> */}
        <div className='invisible fixed z-10 m-0 bg-white/40 p-0 drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] sm:visible'>
          <div className='m-5 text-[11rem] font-extrabold text-white'>
            {process.env.NEXT_PUBLIC_TITLE}
          </div>
        </div>
      </ConditionalRendering>

      <Map
        {...viewport}
        reuseMaps
        style={{ width: '100%', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onMove={(newEvent) => setViewport(newEvent.viewState)}
      ></Map>
    </div>
  );
}
