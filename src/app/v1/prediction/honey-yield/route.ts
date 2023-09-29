// import { NextResponse, NextRequest } from "next/server";
import { NextResponse } from 'next/server';

// import { calculateHoneyYield } from "./calculate-honey-yield";
// import {
//   getWeather,
//   isValidLatLng,
//   isValidYearMonth,
// } from "../../weather/open-meteo-api";

// export async function GET(request: NextRequest) {
export async function GET() {
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

  // WIP
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
