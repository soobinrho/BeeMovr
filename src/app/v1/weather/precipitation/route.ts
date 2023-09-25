import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  isValidLatLng,
  fetchOpenMeteo,
  stripOpenMeteo,
  parseOpenMeteo,
} from "../open-meteo-api";

export async function GET(request: NextRequest) {
  /**
   * Returns the precipitation data from Open Meteo.
   *
   * @remarks
   * "Sum of daily precipitation (including rain, showers and snowfall)." (millimeters)
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const queryParams = request.nextUrl.searchParams;
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  if (!isValidLatLng({ lat: lat, lng: lng })) {
    return NextResponse.json({
      precipitation:
        "[ERROR] The latitude and longitude values must be a valid number.",
    });
  }

  const api_type = "precipitation_sum";
  const api_response = await fetchOpenMeteo({
    api_lat: lat,
    api_lng: lng,
    api_type: api_type,
  });

  const stripped_api_response = stripOpenMeteo(api_response, api_type);
  const parsed_api_response = parseOpenMeteo(stripped_api_response, api_type);

  return NextResponse.json(parsed_api_response);
  return NextResponse.json({ "min-temp": api_response });
