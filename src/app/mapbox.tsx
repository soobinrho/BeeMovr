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
    longitude: 0,
    latitude: 0,
    zoom: 2,
    bearing: 0,
    pitch: 0,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
  });
  const isZoomTitleLevel = useMemo(() => {
    return viewport.zoom < 2.5;
  }, [viewport.zoom]);

  return (
    <div>
      <div className='absolute z-10 grid w-screen grid-cols-1 justify-between sm:grid-cols-2'>
        <MapboxLngLatControl />
        <SocialMedia />
      </div>
      <ConditionalRendering condition={isZoomTitleLevel}>
        {/* top-[33%]  */}
        <div className='invisible absolute left-[50%] top-[36%] z-10 translate-x-[-50%] translate-y-[-36%] items-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] sm:visible'>
          <div className='m-0 p-1 text-center text-[11rem] font-extrabold text-white'>
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
      />
    </div>
  );
}
