import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getWeather } from "../open-meteo-api";

export async function GET(request: NextRequest) {
  /**
   * Returns the minimum temperature data from Open Meteo.
   *
   * @remarks
   * Minimum daily air temperature at 2 meters above ground. (Celsius)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const api_type = "temperature_2m_min";
  const api_response_key = "min-temp";
  const parsed_api_response = await getWeather(request, api_type, api_response_key);
  return NextResponse.json(parsed_api_response);
}