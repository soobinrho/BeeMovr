'use client';

import { isValidLngLat } from '@/app/api/v1/components/open-meteo-api';
import {
  MAX_DIGITS_COORDINATES,
  api_response_key_honeyYield,
  api_response_key_maxTemp,
  api_response_key_minTemp,
  api_response_key_precipitation,
  getLastMonthYearMonthUTC,
} from '@/app/api/v1/components/open-meteo-api';
import { axiosFetcher } from '@/components/axios-swr-wrapper';
import { IMarker } from '@/components/mapbox';
import * as React from 'react';
import {
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChangeEvent } from 'react';
import { MapMouseEvent, useMap } from 'react-map-gl';
import useSWRImmutable from 'swr/immutable';

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

export default function InformationConsole({
  api_lng,
  api_lat,
}: IInformationConsole) {
  return (
    <div className='absolute bottom-4 z-10 w-screen'>
      <div className='mx-2 my-12 flex max-h-[25vh] flex-col-reverse justify-self-start overflow-auto rounded-md bg-background-console/50 p-5 text-left font-normal text-font-console hover:bg-background-console/90 sm:my-5'>
        <InformationConsoleData api_lng={api_lng} api_lat={api_lat} />
      </div>
    </div>
  );
}

export function InformationConsoleData({
  api_lng,
  api_lat,
}: IInformationConsole) {
  const [allInformationConsoleData, setAllInformationConsoleData] = useState<
    Array<IAllInformationConsoleData>
  >([]);
  const shouldRender = isValidLngLat({ api_lng: api_lng, api_lat: api_lat });
  const { data, error, isLoading } = useSWRImmutable(
    shouldRender
      ? `/api/v1/prediction/honey-yield?lng=${api_lng}&lat=${api_lat}&year-month=${getLastMonthYearMonthUTC()}`
      : null,
    axiosFetcher
  );
  if (error) console.log(error);

  const api_response: IApi = data;
  let honeyYield = '';
  let precipitation_date_key = '';
  let precipitation = '';
  let maxTemp_date_key = '';
  let maxTemp = '';
  let minTemp_date_key = '';
  let minTemp = '';
  if (api_response) {
    honeyYield =
      api_response[api_response_key_honeyYield][
        String(Object.keys(api_response[api_response_key_honeyYield]))
      ];

    precipitation_date_key = Object.keys(
      api_response[api_response_key_precipitation]
    )[Object.keys(api_response[api_response_key_precipitation]).length - 1];

    precipitation =
      api_response[api_response_key_precipitation][precipitation_date_key];

    maxTemp_date_key = Object.keys(api_response[api_response_key_maxTemp])[
      Object.keys(api_response[api_response_key_maxTemp]).length - 1
    ];

    maxTemp = api_response[api_response_key_maxTemp][maxTemp_date_key];

    minTemp_date_key = Object.keys(api_response[api_response_key_minTemp])[
      Object.keys(api_response[api_response_key_minTemp]).length - 1
    ];

    minTemp = api_response[api_response_key_minTemp][minTemp_date_key];
  }

  // TODO: DEBUG. Rendering and updates are not synced.
  let lastUpdateKey = useRef('');
  const updateAllInformationConsoleData = useCallback(
    (api_response: IApi) => {
      const updateKey = `${api_lng} ${api_lat}`;
      if (lastUpdateKey.current !== updateKey) {
        // TODO: Store exactly as response data
        setAllInformationConsoleData((allInformationConsoleData) => [
          ...allInformationConsoleData,
          {
            [updateKey]: {
              [api_response_key_honeyYield]: honeyYield,
              [api_response_key_precipitation]: precipitation,
              [api_response_key_maxTemp]: maxTemp,
              [api_response_key_minTemp]: minTemp,
            },
          },
        ]);
        localStorage.setItem(
          updateKey,
          JSON.stringify(JSON.stringify(allInformationConsoleData))
        );
        lastUpdateKey.current = updateKey;
      }
    },
    [
      setAllInformationConsoleData,
      allInformationConsoleData,
      api_lng,
      api_lat,
      honeyYield,
      precipitation,
      maxTemp,
      minTemp,
    ]
  );

  useEffect(() => {
    if (!api_response) {
      return undefined;
    }
    updateAllInformationConsoleData(api_response);
  }, [updateAllInformationConsoleData, api_response]);

  if (isLoading)
    return (
      <>
        <div>
          <b className='pr-2 font-semibold'>Honey Yield Prediction: </b>
          Loading...
          <br />
          <b className='pr-2 font-semibold'>Average Precipitation: </b>
          Loading...
          <br />
          <b className='pr-2 font-semibold'>Maximum Temperature: </b>
          Loading...
          <br />
          <b className='pr-2 font-semibold'>Minimum Temperature: </b>
          Loading...
        </div>
      </>
    );

  return (
    <>
      {api_response ? (
        <p>
          <b className='pr-2 font-semibold'>Honey Yield Prediction: </b>
          {honeyYield} pounds per colony <br />
          <b className='pr-2 font-semibold'>Average Precipitation: </b>
          {precipitation}mm
          <br />
          <b className='pr-2 font-semibold'>Maximum Temperature: </b>
          {maxTemp}°C
          <br />
          <b className='pr-2 font-semibold'>Minimum Temperature: </b>
          {minTemp}°C
        </p>
      ) : (
        <div>
          <b className='pr-2 font-semibold'>Honey Yield Prediction: </b>
          <br />
          <b className='pr-2 font-semibold'>Average Precipitation: </b>
          <br />
          <b className='pr-2 font-semibold'>Maximum Temperature: </b>
          <br />
          <b className='pr-2 font-semibold'>Minimum Temperature: </b>
        </div>
      )}
    </>
  );
}
