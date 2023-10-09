import { NextRequest, NextResponse } from 'next/server';

import { getWeather } from '../open-meteo-api';

export async function GET(request: NextRequest) {
  /**
   * Returns the minimum temperature data from Open Meteo.
   *
   * @remarks
   * Minimum daily air temperature at 2 meters above ground. (Celsius)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const api_type = 'temperature_2m_min';
  const api_response_key = 'min-temp';

  const searchQuery = request.nextUrl.searchParams;
  const lng = searchQuery.get('lng') ?? '';
  const lat = searchQuery.get('lat') ?? '';
  const yearMonth = searchQuery.get('year-month') ?? '';

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
