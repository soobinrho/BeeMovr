import { NextRequest, NextResponse } from 'next/server';

import { getLngLatYearMonthFromQuery } from '../../weather/open-meteo-api';
import { calculateHoneyYield } from './calculate-honey-yield';

export async function GET(request: NextRequest) {
  /**
   * Returns the honey yield prediction value.
   *
   * @remarks
   * Uses the precipitation, max temperature, and min temperature data
   * from Open Meteo to calculate the honey yield prediction value
   * based on Hayes Kent Grogan's 2020 paper "The Impact of
   * Precipitation and Temperature on Honey Yield in the United States."
   * Source:
   *   https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf
   */
  const api_type = 'honey-yield';
  const api_response_key = api_type;

  const {
    api_lng: lng,
    api_lat: lat,
    api_yearMonth: yearMonth,
  } = getLngLatYearMonthFromQuery(request);

  const api_response = await calculateHoneyYield({
    api_lng: lng,
    api_lat: lat,
    api_yearMonth: yearMonth,
  });

  // API error response best practices.
  // Source:
  //   https://nextjs.org/docs/app/api-reference/functions/next-response#json
  if (api_response === 'Bad Request Error') {
    return NextResponse.json({ error: 'Bad Request Error' }, { status: 400 });
  } else if (api_response === 'Internal Server Error') {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } else {
    return NextResponse.json({ [api_response_key]: api_response });
  }
}
