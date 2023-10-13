import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useMemo, useRef, useState } from 'react';
import Map, {
  MapEvent,
  MapLayerMouseEvent,
  MapMouseEvent,
  MapProvider,
  Marker,
  NavigationControl,
  Popup,
  ViewState,
} from 'react-map-gl';
import useSWR from 'swr';

import {
  COORDINATE_MAX_DIGITS,
  getLastMonthYearMonthUTC,
  getTodayYearMonthUTC,
} from '../v1/components/open-meteo-api';
import { axiosFetch } from './axios-swr-wrapper';
import ConditionalRendering from './conditional-rendering';
import MapboxLngLatControl from './mapbox-lng-lat-control';
import Searchbox from './searchbox';
import SocialMedia from './social-media';

export default function Mapbox() {
  // ------------------------------------------------------------------
  // Initialize Mapbox.
  // ------------------------------------------------------------------
  // react-map-gl's documentation on the type ViewState:
  //   https://visgl.github.io/react-map-gl/docs/api-reference/types#viewstate
  const [viewport, setViewport] = useState<ViewState>({
    longitude: 1,
    latitude: 1,
    zoom: 2,
    bearing: 0,
    pitch: 0,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
  });
  const ZOOM_LEVEL_TITLE = 2.5;
  const isZoomTitleLevel = useMemo(() => {
    return viewport.zoom < ZOOM_LEVEL_TITLE;
  }, [viewport.zoom]);

  // ------------------------------------------------------------------
  // Rotate the globe at startup.
  // ------------------------------------------------------------------
  const rotationChartCounter = useRef(0);
  const rotationChart_lng = useMemo(() => {
    return [-98.5795, -42.6043, 31.1656, 127.7669, 131.42068, 134.9145, -60, 1];
  }, []);
  const rotationChart_lat = useMemo(() => {
    return [
      39.8383, 71.7096, 48.3794, 35.9078, -31.96361, -85.0511, -15.38171, 1,
    ];
  }, []);
  const rotationChart_length = rotationChart_lng.length;

  // ------------------------------------------------------------------
  // Callback definitions.
  // ------------------------------------------------------------------
  const onLoad_mapMain = useCallback(
    (newEvent: MapEvent) => {
      newEvent.target.doubleClickZoom.disable();
      newEvent.target.easeTo({
        center: [
          rotationChart_lng[rotationChartCounter.current],
          rotationChart_lat[rotationChartCounter.current],
        ],
        duration: 15000,
      });
      rotationChartCounter.current += 1;
    },
    [rotationChart_lng, rotationChart_lat, rotationChartCounter]
  );

  const onIdle_mapMain = useCallback(
    (newEvent: MapEvent) => {
      if (isZoomTitleLevel) {
        if (rotationChartCounter.current >= rotationChart_length) {
          rotationChartCounter.current = 0;
        }
        newEvent.target.easeTo({
          center: [
            rotationChart_lng[rotationChartCounter.current],
            rotationChart_lat[rotationChartCounter.current],
          ],
          duration: 20000,
          easing: (n) => n,
        });
        rotationChartCounter.current += 1;
      }
    },
    [
      rotationChart_lng,
      rotationChart_lat,
      rotationChart_length,
      rotationChartCounter,
      isZoomTitleLevel,
    ]
  );

  const onClick_mapMain = useCallback(async (newEvent: MapMouseEvent) => {
    const { lng, lat } = newEvent.lngLat;
    const api_lng = lng.toFixed(COORDINATE_MAX_DIGITS);
    const api_lat = lat.toFixed(COORDINATE_MAX_DIGITS);

    const api_yearMonth = getLastMonthYearMonthUTC();
    const api_response = await axiosFetch(
      `${process.env.NEXT_PUBLIC_URL}/v1/prediction/honey-yield?lng=${api_lng}&lat=${api_lat}&year-month=${api_yearMonth}`
    );

    // useSWR(
    //   `${process.env.NEXT_PUBLIC_URL}/v1/prediction/honey-yield?lng=${api_lng}&lat=${api_lat}&year-month=${api_yearMonth}`,
    //   axiosFetcher
    // );

    console.log(api_response);
  }, []);

  return (
    <>
      <MapboxLngLatControl />
      <Searchbox />
      <SocialMedia />
      <ConditionalRendering condition={isZoomTitleLevel}>
        <div className='absolute left-[50%] top-[36%] z-10 translate-x-[-50%] translate-y-[-36%] items-center drop-shadow-[0_8px_8px_rgba(0,0,0,1)]'>
          <div className='m-0 p-1 text-center text-6xl font-extrabold text-white/80 sm:text-[11rem]'>
            {process.env.NEXT_PUBLIC_TITLE}
          </div>
        </div>
      </ConditionalRendering>
      <Map
        id='mapMain'
        {...viewport}
        reuseMaps
        style={{ width: '100%', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onMove={(newEvent) => setViewport(newEvent.viewState)}
        onLoad={onLoad_mapMain}
        onIdle={onIdle_mapMain}
        onClick={onClick_mapMain}
      />
    </>
  );
}
