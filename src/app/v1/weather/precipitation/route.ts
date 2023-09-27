import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  isValidLatLng,
  isValidReferenceDate,
  fetchOpenMeteo,
  stripOpenMeteo,
  parseOpenMeteo,
} from "../open-meteo-api";

export async function GET(request: NextRequest) {
  /**
   * Returns the precipitation data from Open Meteo.
   *
   * @remarks
   * Sum of daily precipitation (including rain, showers and snowfall). (millimeters)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const returnName = "precipitation";
  const queryParams = request.nextUrl.searchParams;
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  const referenceDate = queryParams.get("reference-date");
  if (!isValidLatLng({ api_lat: lat, api_lng: lng })) {
    return NextResponse.json({
      [returnName]:
        "[ERROR] The latitude 'lat' and longitude 'lng' values must be a valid number.",
    });
  }
  if (!isValidReferenceDate(referenceDate)) {
    return NextResponse.json({
      [returnName]:
        "[ERROR] The reference date 'reference-date' must be in the form of YYYY-MM",
    });
  }

  const api_type = "precipitation_sum";
  const api_response = await fetchOpenMeteo({
    api_lat: lat,
    api_lng: lng,
    api_referenceDate: referenceDate,
    api_type: api_type,
  });

  const [stripped_api_response_time, stripped_api_response_value] =
    stripOpenMeteo(api_response, api_type);
  const parsed_api_response = parseOpenMeteo(
    [stripped_api_response_time, stripped_api_response_value],
    api_type
  );

  return NextResponse.json(parsed_api_response);
}
