import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';
import Map, {
  MapProvider,
  Marker,
  NavigationControl,
  Popup,
  ViewState,
} from 'react-map-gl';

import ConditionalRendering from './conditional-rendering';
import MapboxLngLatControl from './mapbox-controls';
import SocialMedia from './social-media';

export default function Mapbox() {
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

  const [rotationChartCounter, setRotationChartCounter] = useState(0);
  const rotationChart_lng = [
    -98.5795, -42.6043, 31.1656, 127.7669, 131.42068, 134.9145, -60, 1,
  ];
  const rotationChart_lat = [
    39.8383, 71.7096, 48.3794, 35.9078, -31.96361, -85.0511, -15.38171, 1,
  ];
  const rotationChar_length = rotationChart_lng.length;

  return (
    <div>
      <MapboxLngLatControl />
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
        onLoad={(newEvent) => {
          newEvent.target.easeTo({
            center: [
              rotationChart_lng[rotationChartCounter % rotationChar_length],
              rotationChart_lat[rotationChartCounter % rotationChar_length],
            ],
            duration: 15000,
          });
          setRotationChartCounter(rotationChartCounter + 1);
        }}
        onIdle={(newEvent) => {
          if (viewport.zoom < ZOOM_LEVEL_TITLE) {
            newEvent.target.easeTo({
              center: [
                rotationChart_lng[rotationChartCounter % rotationChar_length],
                rotationChart_lat[rotationChartCounter % rotationChar_length],
              ],
              duration: 20000,
              easing: (n) => n,
            });
            setRotationChartCounter(rotationChartCounter + 1);
          }
        }}
        onMove={(newEvent) => setViewport(newEvent.viewState)}
      />
    </div>
  );
}
