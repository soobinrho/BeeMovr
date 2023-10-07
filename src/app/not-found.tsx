import Link from 'next/link';

import SocialMedia from './social-media';

export default function NotFoundPage() {
  return (
    <div className='relative min-h-screen overflow-hidden whitespace-nowrap bg-background-space text-font-console'>
      <div className='absolute z-10 grid w-screen grid-cols-1 justify-between sm:grid-cols-2'>
        <div className='m-2 justify-self-center p-3 text-left font-semibold hover:text-gray-300 active:text-gray-500 sm:justify-self-start'>
          <b>Longitude</b>&nbsp;&nbsp;&nbsp;404
          <br />
          <b>Latitude</b>&nbsp;&nbsp;&nbsp;404
        </div>
        <SocialMedia />
      </div>
      <div className='flex min-h-screen flex-row flex-nowrap items-center justify-center bg-background-space'>
        <Link href='/'>
          <div className='m-5 font-extrabold text-gray-300 hover:text-xl hover:font-black active:text-gray-500'>
            404
          </div>
        </Link>
        <Link href='/'>
          <div className='text-gray-300 hover:text-lg hover:font-medium active:text-gray-500'>
            Page not found.
          </div>
        </Link>
      </div>
    </div>
  );
}
