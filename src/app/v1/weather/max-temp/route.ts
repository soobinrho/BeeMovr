import {
  api_response_key_maxTemp,
  api_type_maxTemp,
  getWeather,
} from '@/app/v1/components/open-meteo-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  /**
   * Returns the maximum temperature data from Open Meteo.
   *
   * @remarks
   * Maximum daily air temperature at 2 meters above ground. (Celsius)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   *
   * @example
   * https://BeeMovr.nsustain.com/v1/weather/max-temp?lng=-1&lat=-1&start-year-month=2023-09&end-year-month=2023-09
   */
  const api_type = api_type_maxTemp;
  const api_response_key = api_response_key_maxTemp;

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
