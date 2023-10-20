'use client';

import { axiosFetcher } from '@/app/components/axios-swr-wrapper';
import { ZOOM_LEVEL_TITLE } from '@/app/components/mapbox';
import {
  MAX_DIGITS_COORDINATES,
  isValidLngLat,
} from '@/app/v1/components/open-meteo-api';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useMap } from 'react-map-gl';
import useSWRImmutable from 'swr/immutable';

export interface IApi {
  test: any;
}

export default function Searchbox() {
  const { mapMain } = useMap();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldOpenSearchBox, setShouldOpenSearchBox] = useState(false);

  const { data, error } = useSWRImmutable(
    shouldFetch
      ? `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?autocomplete=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      : null,
    axiosFetcher
  );
  if (error) console.log(error);

  let searchValue_lng = '';
  let searchValue_lat = '';
  if (data) {
    const MAX_DIGITS_COORDINATES_FOR_COMPARISON = 1;
    searchValue_lng = data['features'][0]['center'][0];
    searchValue_lat = data['features'][0]['center'][1];
    const searchValue_lng_comparison = data['features'][0]['center'][0].toFixed(
      MAX_DIGITS_COORDINATES_FOR_COMPARISON
    );
    const searchValue_lat_comparison = data['features'][0]['center'][1].toFixed(
      MAX_DIGITS_COORDINATES_FOR_COMPARISON
    );

    if (
      shouldFetch &&
      isValidLngLat({ api_lng: searchValue_lng, api_lat: searchValue_lat })
    ) {
      const now_lngLat = mapMain?.getCenter();
      let duration_0 = 0;
      const duration_1 = 2300;
      const duration_2 = 4500;
      let timeout_1 = 0;
      let timeout_2 = duration_1 + 100;

      if (
        !(
          now_lngLat?.lng.toFixed(MAX_DIGITS_COORDINATES_FOR_COMPARISON) ===
            String(searchValue_lng_comparison) &&
          now_lngLat?.lat.toFixed(MAX_DIGITS_COORDINATES_FOR_COMPARISON) ===
            String(searchValue_lat_comparison)
        ) &&
        mapMain?.getZoom() &&
        mapMain?.getZoom() > ZOOM_LEVEL_TITLE + 6
      ) {
        duration_0 = 2300;
        timeout_1 = duration_0 + 100;
        timeout_2 = timeout_1 + duration_1 + 100;
        mapMain?.easeTo({
          duration: duration_0,
          zoom: ZOOM_LEVEL_TITLE + 3,
        });
      }
      setTimeout(() => {
        mapMain?.easeTo({
          center: [Number(searchValue_lng), Number(searchValue_lat)],
          duration: duration_1,
          zoom: ZOOM_LEVEL_TITLE + 3,
        });
      }, timeout_1);
      setTimeout(() => {
        mapMain?.easeTo({
          center: [Number(searchValue_lng), Number(searchValue_lat)],
          duration: duration_2,
          zoom: 19,
        });
      }, timeout_2);
      setShouldFetch(false);
    }
  }

  const onChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      evt.preventDefault();
      setSearchValue(evt.target.value);
    },
    [setSearchValue]
  );

  const onSubmit = useCallback(() => {
    if (searchValue && searchValue?.length > 0) {
      setShouldFetch(true);
    }
  }, [searchValue]);

  return (
    <>
      <div className='invisible absolute start-0 z-10 ml-4 mt-6 flex w-[28%] flex-auto flex-grow translate-x-0 flex-row flex-nowrap items-center gap-0 pl-3 pt-1 sm:visible sm:start-[50%] sm:ml-5 sm:mt-7 sm:translate-x-[-50%] sm:pt-0'>
        <div className='start-0 z-10 translate-x-0 text-white/50 sm:start-[50%] sm:translate-x-[-50%]'>
          <button onClick={onSubmit} className='mt-2'>
            <svg
              className='fill-current text-font-console hover:text-white active:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z' />
            </svg>
          </button>
        </div>

        <label htmlFor='location-search' className='invisible h-0 w-0'>
          {/* Label accessible only for people with visual impairment.*/}
          Search location to navigate.
        </label>
        <input
          id='location-search'
          type='text'
          className='invisible z-10 w-[100%] self-stretch rounded-3xl border-none bg-background-console/50 text-left font-semibold placeholder-font-console/90 hover:border-none hover:bg-background-console/90 hover:text-white hover:placeholder-white focus:border-none focus:text-white focus:ring-0 active:placeholder-gray-300 sm:visible'
          required
          placeholder='Search...'
          value={searchValue ?? ''}
          onChange={onChange}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              onSubmit();
            }
          }}
        ></input>
      </div>

      <div className='visible absolute start-0 z-10 ml-4 mt-6 flex w-[28%] translate-x-0 items-center gap-0 pl-3 pt-1 sm:invisible sm:start-[50%] sm:ml-5 sm:mt-7 sm:translate-x-[-50%] sm:pt-0'>
        <div className='start-0 z-10 translate-x-0 text-white/50 sm:start-[50%] sm:translate-x-[-50%]'>
          <button
            onClick={() => {
              setShouldOpenSearchBox(!shouldOpenSearchBox);
            }}
            className='mt-2'
          >
            <svg
              className='fill-current text-font-console hover:text-white active:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z' />
            </svg>
          </button>
        </div>
      </div>

      {shouldOpenSearchBox ? (
        <input
          id='location-search'
          type='text'
          className='absolute left-[50%] z-20 mt-7 w-[50%] translate-x-[-50%] rounded-3xl border-none bg-background-console/90 text-left font-semibold placeholder-font-console/90 ring-4 ring-cyan-900 hover:bg-background-console hover:text-white hover:placeholder-white focus:border-none focus:text-white focus:ring-4 focus:ring-cyan-800 active:placeholder-gray-300 active:ring-4 active:ring-cyan-800 '
          required
          placeholder='Search...'
          value={searchValue ?? ''}
          onChange={onChange}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              onSubmit();
            }
          }}
        ></input>
      ) : (
        <></>
      )}
    </>
  );
}
