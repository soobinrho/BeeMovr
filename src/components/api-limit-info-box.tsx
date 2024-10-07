'use client';

import { getTodayYearMonthUTC } from '@/app/api/v1/components/open-meteo-api';
import React, { useState } from 'react';

export default function ApiLimitInfoBox() {
  return (
    <>
      <div className='absolute left-[50%] top-[47%] z-20 max-h-[50%] w-screen translate-x-[-50%] translate-y-[-50%] flex-col-reverse items-center justify-center overflow-auto'>
        <div className='relative mx-4 my-16 whitespace-break-spaces rounded-md bg-background-console/90 p-4 text-left text-sm text-font-console sm:mx-[25%] sm:px-16 sm:py-20 sm:text-base'>
          <p className='font-black'>{getTodayYearMonthUTC()}</p>
          <p className='font-normal'>
            Our map has been used more than 50,000 times. Please come back next
            month! We built our website using Mapbox&apos;s free tier API, which
            has a limit of 50,000 loads per month. We built our entire web app
            without using any fancy technology that costs a lot of money, so
            that we can keep running this web app for all beekeepers for free.
            The counter will reset on the first day of each month. If you have
            any questions, please feel free to email soobin@nsustain.com
          </p>
        </div>
      </div>
    </>
  );
}
