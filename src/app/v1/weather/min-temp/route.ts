import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isValidLatLng, fetchOpenMeteo } from "../open-meteo-api";

export async function GET(request: NextRequest) {
  /**
   * Returns the minimum temperature data from Open Meteo.
   *
   * @remarks
   * "Minimum daily air temperature at 2 meters above ground." (Celsius)
   * Source:
   *   https://open-meteo.com/en/docs/historical-weather-api
   */
  const queryParams = request.nextUrl.searchParams;
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  if (!isValidLatLng({ lat: lat, lng: lng })) {
    return NextResponse.json({
      "min-temp":
        "[ERROR] The latitude and longitude values must be a valid number.",
    });
  }

  const api_type = "temperature_2m_min";
  const api_response = await fetchOpenMeteo({
    api_lat: lat,
    api_lng: lng,
    api_type: api_type,
  });

  return NextResponse.json({ "min-temp": api_response });
}

//   api_type_precipitation: "precipitation_sum",
//   api_type_max_temp: "temperature_2m_max",
//   api_type_min_temp: "temperature_2m_min",
