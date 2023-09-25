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
   * Returns the minimum temperature data from Open Meteo.
   *
   * @remarks
   * Minimum daily air temperature at 2 meters above ground. (Celsius)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const returnName = "min-temp";
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

  const api_type = "temperature_2m_min";
  const api_response = await fetchOpenMeteo({
    api_lat: lat,
    api_lng: lng,
    api_referenceDate: referenceDate,
    api_type: api_type,
  });

  return NextResponse.json({ [returnName]: api_response });
}
