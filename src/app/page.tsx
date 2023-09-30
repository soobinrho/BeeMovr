import Mapbox from './Mapbox';
import InformationConsole from './InformationConsole';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Mapbox />
      <InformationConsole />
    </main>
  );
}
