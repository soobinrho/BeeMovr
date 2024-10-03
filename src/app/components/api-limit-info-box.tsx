'use client';

import { useState } from 'react';

export default function ApiLimitInfoBox() {
  const [shouldShowApiLimitInfoBox, setShouldShowApiLimitInfoBox] =
    // TODO: Implement API access limit feature to 50,000 loads per month.
    useState(true);
  return (
    <>
      {/* className='pointer-events-none absolute left-[50%] top-[47%] z-10 min-h-[27%] min-w-[65vw] translate-x-[-50%] translate-y-[-50%] select-none items-center' */}
      <div className='absolute left-[50%] top-[50%] z-20 max-h-[50%] w-screen translate-x-[-50%] translate-y-[-50%] flex-col-reverse items-center justify-center overflow-auto bg-white/50'>
        {shouldShowApiLimitInfoBox ? (
          <div className='relative mx-4 my-16 whitespace-break-spaces rounded-md bg-background-console/90 p-4 text-left text-sm text-font-console sm:mx-[25%] sm:px-16 sm:py-12 sm:text-base'>
            <p className='font-black'>2024-09-13</p>
            <p className='font-normal'>
              We've disabled access to our map (powered by Mapbox's free tier
              APIs) until we implement a feature to limit our website to 50,000
              loads per month because otherwise we can accidentally be billed
              $$$$... We will re-enable our map once the rate limit control is
              in place.
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
