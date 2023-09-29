import { NextRequest } from 'next/server';

import { getWeather } from '../open-meteo-api';

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
  const api_response = await getWeather(request, api_type, api_response_key);
  return api_response;
}
