import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  isValidLatLng,
  isValidReferenceDate,
  fetchOpenMeteo,
  stripOpenMeteo,
  parseOpenMeteo,
} from "../../weather/open-meteo-api";
import { calculateHoneyYield } from "./calculate-honey-yield";

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
  const returnName = "honey-yield";
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

  const api_response = calculateHoneyYield({
    api_lat: lat,
    api_lng: lng,
    api_referenceDate: referenceDate,
  });

  return NextResponse.json({ [returnName]: api_response });
}
