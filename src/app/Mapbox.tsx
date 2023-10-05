'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import Map, { Marker, Popup, ViewState } from 'react-map-gl';

export default function Mapbox() {
  const [viewport, setViewport] = useState<ViewState>({
    longitude: 0,
    latitude: 0,
    zoom: 1,
    bearing: 0,
    pitch: 0,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
  });

  return (
    <div>
      <div className='absolute z-10 mx-5 my-5'>
        {'TODO: Insert GitHub link here'}
        <br />
        <b>Longitude</b> {viewport.longitude}
        <br />
        <b>Latitude</b> {viewport.latitude}
      </div>
      <Map
        {...viewport}
        style={{ width: '100%', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onMove={(newEvent) => setViewport(newEvent.viewState)}
      ></Map>
    </div>
  );
}
