'use client';

import * as React from 'react';
import { Ref, RefObject, useCallback, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { MapMouseEvent, useMap } from 'react-map-gl';
import useSWR from 'swr';

import { isValidLngLat } from '../v1/components/open-meteo-api';
import {
  MAX_DIGITS_COORDINATES,
  api_response_key_honeyYield,
  api_response_key_maxTemp,
  api_response_key_minTemp,
  api_response_key_precipitation,
  getLastMonthYearMonthUTC,
} from '../v1/components/open-meteo-api';
import { axiosFetcher } from './axios-swr-wrapper';

export interface IInformationConsoleData {
  api_lng: string;
  api_lat: string;
}

export interface IApi {
  [api_response_key_honeyYield]: any;
  [api_response_key_precipitation]: any;
  [api_response_key_maxTemp]: any;
  [api_response_key_minTemp]: any;
}

export default function InformationConsole({
  api_lng,
  api_lat,
}: IInformationConsoleData) {
  return (
    <div className='absolute bottom-4 z-10 w-screen'>
      <div className='my-12 ml-2 flex max-h-[25vh] flex-col-reverse justify-self-start overflow-auto rounded-l-md bg-background-console/50 p-5 text-left font-thin text-font-console hover:bg-background-console/90 sm:my-5'>
        <FetchInformationConsoleData api_lng={api_lng} api_lat={api_lat} />
      </div>
    </div>
  );
}

const useInformationConsoleDataFetching = ({
  api_lng,
  api_lat,
}: IInformationConsoleData) => {
  const shouldRender = isValidLngLat({ api_lng: api_lng, api_lat: api_lat });
  const { data, error } = useSWR(
    shouldRender
      ? `/v1/prediction/honey-yield?lng=${api_lng}&lat=${api_lat}&year-month=${getLastMonthYearMonthUTC()}`
      : null,
    axiosFetcher
  );
  return data;
};

export function FetchInformationConsoleData({
  api_lng,
  api_lat,
}: IInformationConsoleData) {
  const api_response: IApi = useInformationConsoleDataFetching({
    api_lng: api_lng,
    api_lat: api_lat,
  });

  let honeyYield: any = '';
  let precipitation_date_key: any = '';
  let precipitation: any = '';
  let maxTemp_date_key: any = '';
  let maxTemp: any = '';
  let minTemp_date_key: any = '';
  let minTemp: any = '';
  if (api_response) {
    honeyYield = Object.values(
      api_response[api_response_key_honeyYield][
        String(Object.keys(api_response[api_response_key_honeyYield]))
      ]
    );

    precipitation_date_key = Object.keys(
      api_response[api_response_key_precipitation]
    )[Object.keys(api_response[api_response_key_precipitation]).length - 1];

    precipitation = Object.values(
      api_response[api_response_key_precipitation][precipitation_date_key]
    );

    maxTemp_date_key = Object.keys(api_response[api_response_key_maxTemp])[
      Object.keys(api_response[api_response_key_maxTemp]).length - 1
    ];

    maxTemp = Object.values(
      api_response[api_response_key_maxTemp][maxTemp_date_key]
    );

    minTemp_date_key = Object.keys(api_response[api_response_key_minTemp])[
      Object.keys(api_response[api_response_key_minTemp]).length - 1
    ];

    minTemp = Object.values(
      api_response[api_response_key_minTemp][minTemp_date_key]
    );
  }

  return (
    <>
      {api_response ? (
        <p>
          <b className='pr-2 font-semibold'>Honey Yield Prediction: </b>
          {honeyYield} pounds per colony <br />
          <b className='pr-2 font-semibold'>Monthly Precipitation: </b>
          {precipitation} mm
          <br />
          <b className='pr-2 font-semibold'>Maximum Temperature: </b>
          {maxTemp}°C
          <br />
          <b className='pr-2 font-semibold'>Minimum Temperature: </b>
          {minTemp}°C
          <br />
        </p>
      ) : (
        <div>
          <b className='font-semibold'>Test value</b>{' '}
          {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
          <b className='font-semibold'>Test value</b>{' '}
          {process.env.NEXT_PUBLIC_URL} <br />
          <b className='font-semibold'>Test value</b> {process.env.NODE_ENV}
        </div>
      )}
    </>
  );
}
