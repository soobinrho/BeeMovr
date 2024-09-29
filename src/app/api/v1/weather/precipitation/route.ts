import {
  api_response_key_precipitation,
  api_type_precipitation,
  getWeather,
} from '@/app/api/v1/components/open-meteo-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  /**
   * Returns the precipitation data from Open Meteo.
   *
   * @remarks
   * Sum of daily precipitation (including rain, showers and snowfall). (millimeters)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   *
   * @example
   * https://BeeMovr.nsustain.com/api/v1/weather/precipitation?lng=-1&lat=-1&start-year-month=2023-09&end-year-month=2023-09
   */
  const api_type = api_type_precipitation;
  const api_response_key = api_response_key_precipitation;

  const searchQuery = request.nextUrl.searchParams;
  const lng = searchQuery.get('lng') ?? '';
  const lat = searchQuery.get('lat') ?? '';
  const startYearMonth = searchQuery.get('start-year-month') ?? '';
  const endYearMonth = searchQuery.get('end-year-month') ?? '';

  try {
    const api_response = await getWeather({
      api_lng: lng,
      api_lat: lat,
      api_startYearMonth: startYearMonth,
      api_endYearMonth: endYearMonth,
      api_type: api_type,
    });
    return NextResponse.json({ [api_response_key]: api_response });
  } catch (err) {
    if (err instanceof RangeError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Undefined Error' }, { status: 500 });
    }
  }
}
