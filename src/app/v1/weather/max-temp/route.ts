import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getWeather } from "../open-meteo-api";

export async function GET(request: NextRequest) {
  /**
   * Returns the maximum temperature data from Open Meteo.
   *
   * @remarks
   * Maximum daily air temperature at 2 meters above ground. (Celsius)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const api_type = "temperature_2m_max";
  const api_response_key = "max-temp";
  const parsed_api_response = await getWeather(request, api_type, api_response_key);
  return NextResponse.json(parsed_api_response);
}