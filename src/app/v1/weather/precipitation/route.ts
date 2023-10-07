import { NextRequest, NextResponse } from 'next/server';

import { getLngLatYearMonthFromQuery, getWeather } from '../open-meteo-api';

export async function GET(request: NextRequest) {
  /**
   * Returns the precipitation data from Open Meteo.
   *
   * @remarks
   * Sum of daily precipitation (including rain, showers and snowfall). (millimeters)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const api_type = 'precipitation_sum';
  const api_response_key = 'precipitation';

  const {
    api_lng: lng,
    api_lat: lat,
    api_yearMonth: yearMonth,
  } = getLngLatYearMonthFromQuery(request);

  const api_response = await getWeather({
    api_lng: lng,
    api_lat: lat,
    api_yearMonth: yearMonth,
    api_type: api_type,
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
