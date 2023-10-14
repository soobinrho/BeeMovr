'use client';

import * as React from 'react';
import {
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChangeEvent } from 'react';
import { MapMouseEvent, useMap } from 'react-map-gl';
import useSWRImmutable from 'swr/immutable';

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
import { IMarker } from './mapbox';

interface IInformationConsole {
  api_lng: string;
  api_lat: string;
}

interface IApi {
  [api_response_key_honeyYield]: any;
  [api_response_key_precipitation]: any;
  [api_response_key_maxTemp]: any;
  [api_response_key_minTemp]: any;
}

interface IAllInformationConsoleData {
  [key: number]: IApi;
}

export default function InformationConsoleWatsonx({
  api_lng,
  api_lat,
}: IInformationConsole) {
  return (
    <div className='absolute bottom-4 z-10 w-screen'>
      <div className='mx-2 my-12 flex max-h-[25vh] flex-col-reverse justify-self-start overflow-auto rounded-md bg-background-console/50 p-5 text-left font-normal text-font-console hover:bg-background-console/90 sm:my-5'>
        <InformationConsoleDataWatsonx api_lng={api_lng} api_lat={api_lat} />
      </div>
    </div>
  );
}

export function InformationConsoleDataWatsonx({
  api_lng,
  api_lat,
}: IInformationConsole) {
  const allInformationConsoleData = useMemo(() => {
    if (typeof window !== 'undefined') {
      return [{ ...localStorage }];
    } else {
      return {};
    }
  }, []);

  const AllListedData = useMemo(
    () =>
      Object.keys(allInformationConsoleData).map((dataKey: string) => (
        <li key={dataKey} className='list-none'>
          <b className='pr-2 font-semibold'>{dataKey}: </b>
          Work in progress...
          {/* {JSON.stringify(allInformationConsoleData[0])} */}
          <br />
        </li>
      )),
    [allInformationConsoleData]
  );

  return (
    <>
      {allInformationConsoleData ? (
        AllListedData
      ) : (
        <p>
          <b className='pr-2 font-semibold'>Test Value: </b>
          Work in progress...
        </p>
      )}
      <br />
    </>
  );
}
