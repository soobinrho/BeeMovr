'use client';

import { MAX_DIGITS_COORDINATES } from '@/app/api/v1/components/open-meteo-api';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useMap } from 'react-map-gl';

export default function MapboxLngLatControl() {
  const { mapMain } = useMap();
  const [inputLng, setInputLng] = useState('');
  const [inputLat, setInputLat] = useState('');

  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (!mapMain) {
      return undefined;
    }

    const onMove = () => {
      const { lng, lat } = mapMain.getCenter();
      setInputLng(`${lng.toFixed(MAX_DIGITS_COORDINATES)}`);
      setInputLat(`${lat.toFixed(MAX_DIGITS_COORDINATES)}`);
      setError(false);
    };
    mapMain.on('move', onMove);
    onMove();

    return () => {
      mapMain.off('move', onMove);
    };
  }, [mapMain]);

  const onLngChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputLng(evt.target.value);
  }, []);

  const onLatChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputLat(evt.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    const lng = Number(inputLng);
    const lat = Number(inputLat);
    if (Math.abs(lng) <= 180 && Math.abs(lat) <= 90) {
      mapMain?.easeTo({
        center: [lng, lat],
        duration: 1000,
      });
    } else {
      setError(true);
    }
  }, [mapMain, inputLng, inputLat]);

  return (
    <div className='absolute left-[50%] z-10 m-2 mt-3 translate-x-[-50%] rounded-3xl bg-background-console/50 pb-3 pl-8 pr-0 pt-3 text-left font-semibold hover:bg-background-console/90 sm:left-0 sm:translate-x-0'>
      <label htmlFor='longitude'>
        <b>Longitude</b>
      </label>
      <input
        id='longitude'
        type='text'
        style={{ color: hasError ? 'red' : '' }}
        className='ml-2 mr-4 w-24 border-none bg-transparent p-0 placeholder-font-console hover:border-none hover:text-white focus:border-none focus:text-white focus:ring-0'
        required
        value={inputLng}
        onChange={onLngChange}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            onSubmit();
          }
        }}
      ></input>
      <br />
      <label htmlFor='latitude'>
        <b>Latitude</b>
      </label>
      <input
        id='latitude'
        type='text'
        style={{ color: hasError ? 'red' : '' }}
        className='ml-2 mr-4 w-24 border-none bg-transparent p-0 placeholder-font-console hover:border-none hover:text-white focus:border-none focus:text-white focus:ring-0'
        required
        value={inputLat}
        onChange={onLatChange}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            onSubmit();
          }
        }}
      ></input>
    </div>
  );
}
