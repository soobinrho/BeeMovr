'use client';

import * as React from 'react';
import { Ref, RefObject, useCallback, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { MapMouseEvent, useMap } from 'react-map-gl';
import useSWR from 'swr';

import {
  COORDINATE_MAX_DIGITS,
  getLastMonthYearMonthUTC,
} from '../v1/components/open-meteo-api';
import { axiosFetcher } from './axios-swr-wrapper';

export interface IInformationConsoleData {
  api_lng: string;
  api_lat: string;
}

export interface IApi {
  'honey-yield': IHoneyYield;
  precipitation: IPrecipitation;
  'max-temp': IMaxTemp;
  'min-temp': IMinTemp;
}

interface IHoneyYield {
  [key: string]: string;
}

interface IPrecipitation {}

interface IMaxTemp {}

interface IMinTemp {}

export default function InformationConsole({
  api_lng,
  api_lat,
}: IInformationConsoleData) {
  return (
    <div className='absolute bottom-4 z-10 w-screen'>
      <div className='my-12 ml-2 flex flex-col-reverse justify-self-start overflow-x-auto rounded-l-md bg-background-console/50 p-5 text-left font-semibold text-font-console hover:bg-background-console/90 sm:my-5'>
        <FetchInformationConsoleData api_lng={api_lng} api_lat={api_lat} />
      </div>
    </div>
  );
}

export function FetchInformationConsoleData({
  api_lng,
  api_lat,
}: IInformationConsoleData) {
  const { data, error } = useSWR(
    `/v1/prediction/honey-yield?lng=${api_lng}&lat=${api_lat}&year-month=${getLastMonthYearMonthUTC()}`,
    axiosFetcher
  );

  const api_response: IApi = data;

  return (
    <>
      {api_response ? (
        <div>
          {Object.values(
            api_response['honey-yield'][
              Object.keys(api_response['honey-yield'])[0]
            ]
          )}
        </div>
      ) : (
        <div>
          <b>Test value</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
          <b>Test value</b> {process.env.NEXT_PUBLIC_URL} <br />
          <b>Test value</b> {process.env.NODE_ENV}
        </div>
      )}
    </>
  );
}
