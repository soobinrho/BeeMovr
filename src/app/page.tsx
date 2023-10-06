import InformationConsole from './InformationConsole';
import Mapbox from './Mapbox';

export default function Home() {
  return (
    <main className='relative min-h-screen overflow-hidden whitespace-nowrap bg-background-space text-gray-200'>
      <Mapbox />
      <InformationConsole />
    </main>
  );
}
