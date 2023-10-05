import InformationConsole from './InformationConsole';
import Mapbox from './Mapbox';

export default function Home() {
  return (
    <main className='relative min-h-screen text-gray-300'>
      <Mapbox />
      <InformationConsole />
    </main>
  );
}
