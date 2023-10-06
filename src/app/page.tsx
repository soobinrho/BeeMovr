import InformationConsole from './information-console';
import Mapbox from './mapbox';

export default function Home() {
  return (
    <main className='relative min-h-screen overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <Mapbox />
      <InformationConsole />
    </main>
  );
}
