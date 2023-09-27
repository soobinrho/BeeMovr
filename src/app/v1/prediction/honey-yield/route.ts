import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getWeather } from "../../weather/open-meteo-api";
import { calculateHoneyYield } from "./calculate-honey-yield";
import {
  isValidLatLng,
  isValidReferenceDate,
} from "../../weather/open-meteo-api";

export async function GET(request: NextRequest) {
  /**
   * Returns the honey yield prediction value.
   *
   * @remarks
   * Uses the precipitation, max temperature, and min temperature data
   * from Open Meteo to calculate the honey yield prediction value
   * based on Hayes Kent Grogan's 2020 paper "The Impact of
   * Precipitation and Temperature on Honey Yield in the United States."
   * Source:
   *   https://etd.auburn.edu/bitstream/handle/10415/7108/Hayes%20Grogan.pdf
   */
  const queryParams = request.nextUrl.searchParams;
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  const referenceDate = queryParams.get("reference-date");
  if (!isValidLatLng({ api_lat: lat, api_lng: lng })) {
    // return "[ERROR] The latitude 'lat' and longitude 'lng' values must be a valid number.";
  }
  if (!isValidReferenceDate(referenceDate)) {
    // return "[ERROR] The reference date 'reference-date' must be in the form of YYYY-MM";
  }

  const api_type_precipitation = "precipitation_sum";
  const returnName_precipitation = "precipitation";
  const api_type_max_temp = "temperature_2m_max";
  const returnName_max_temp = "max-temp";
  const api_type_min_temp = "temperature_2m_max";
  const returnName_min_temp = "max-temp";
  const precipitation = await getWeather(
    request,
    api_type_precipitation,
    returnName_precipitation
  );
  const max_temp = await getWeather(
    request,
    api_type_precipitation,
    returnName_precipitation
  );
  const min_temp = await getWeather(
    request,
    api_type_precipitation,
    returnName_precipitation
  );
}
