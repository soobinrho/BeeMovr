'use client';

import {
  MAX_DIGITS_COORDINATES,
  getLastMonthYearMonthUTC,
  getTodayYearMonthUTC,
} from '@/app/api/v1/components/open-meteo-api';
import ApiLimitInfoBox from '@/app/components/api-limit-info-box';
import ConditionalRendering from '@/app/components/conditional-rendering';
import InformationConsole from '@/app/components/information-console';
import MapboxLngLatControl from '@/app/components/mapbox-lng-lat-control';
import Searchbox from '@/app/components/searchbox';
import SocialMedia from '@/app/components/social-media';
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
  ViewStateChangeEvent,
} from 'react-map-gl';
import useSWR from 'swr';

export interface IMarker {
  api_lng: string;
  api_lat: string;
  honeyYield: string;
}

export const ZOOM_LEVEL_TITLE = 2.5;

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
  const isZoomTitleLevel = useMemo(() => {
    return viewport.zoom < ZOOM_LEVEL_TITLE;
  }, [viewport.zoom]);

  // ------------------------------------------------------------------
  // Initialize states for information console data.
  // ------------------------------------------------------------------
  const [clickedLng, setClickedLng] = useState('');
  const [clickedLat, setClickedLat] = useState('');
  const [markerData, setMarkerData] = useState<Array<IMarker>>([]);
  const markers = useMemo(
    () =>
      markerData.map((marker) => (
        <Marker
          key={`${marker.api_lat} ${marker.api_lng}`}
          longitude={Number(marker.api_lng)}
          latitude={Number(marker.api_lat)}
          anchor='bottom'
          style={{
            backgroundImage: 'url(/marker.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            fontWeight: 'bold',
            width: '32px',
            height: '32px',
            textAlign: 'center',
            textOverflow: 'visible',
          }}
        >
          <span className='relative top-3'> </span>
        </Marker>
      )),
    [markerData]
  );

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
  const onIdle_mapMain = useCallback(
    (e: MapEvent) => {
      if (isZoomTitleLevel) {
        if (rotationChartCounter.current >= rotationChart_length) {
          rotationChartCounter.current = 0;
        }
        e.target.easeTo({
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

  const onClick_mapMain = useCallback((e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    const api_lng = lng.toFixed(MAX_DIGITS_COORDINATES);
    const api_lat = lat.toFixed(MAX_DIGITS_COORDINATES);
    setClickedLng(api_lng);
    setClickedLat(api_lat);

    // setMarkerData((markerData) => [
    //   ...markerData,
    //   { api_lng: api_lng, api_lat: api_lat, honeyYield: '-1' },
    // ]);
    setMarkerData((markerData) => [
      { api_lng: api_lng, api_lat: api_lat, honeyYield: '-1' },
    ]);
  }, []);

  return (
    <>
      <MapProvider>
        <MapboxLngLatControl />
        <Searchbox />
        <SocialMedia />
        <ApiLimitInfoBox />
        <ConditionalRendering condition={isZoomTitleLevel}>
          <div
            className='pointer-events-none absolute left-[50%] top-[47%] z-10 min-h-[27%] min-w-[65vw] translate-x-[-50%] translate-y-[-50%] select-none items-center'
            style={{
              backgroundImage: 'url(/logo_outlined.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              opacity: '0.8',
            }}
          ></div>
        </ConditionalRendering>
        <Map
          id={'mapMain'}
          initialViewState={viewport}
          reuseMaps
          doubleClickZoom={false}
          style={{ width: '100%', height: '100vh' }}
          mapStyle={'mapbox://styles/mapbox/satellite-streets-v12'}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          onMove={(e: ViewStateChangeEvent) => setViewport(e.viewState)}
          onIdle={onIdle_mapMain}
          onClick={onClick_mapMain}
        >
          {markers}
        </Map>
        <InformationConsole api_lng={clickedLng} api_lat={clickedLat} />
      </MapProvider>
    </>
  );
}
