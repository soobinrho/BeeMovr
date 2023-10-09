import { NextRequest, NextResponse } from 'next/server';

import { calculateHoneyYield } from '../../components/calculate-honey-yield';

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
   *
   * @example
   * https://beemovr.com/v1/prediction/honey-yield?lng=-1&lat=-1&start-year-month=2023-09&end-year-month=2023-09
   */
  const searchQuery = request.nextUrl.searchParams;
  const lng = searchQuery.get('lng') ?? '';
  const lat = searchQuery.get('lat') ?? '';
  const yearMonth = searchQuery.get('year-month') ?? '';

  try {
    const api_response = await calculateHoneyYield({
      api_lng: lng,
      api_lat: lat,
      api_yearMonth: yearMonth,
    });
    return NextResponse.json(api_response);
  } catch (err) {
    if (err instanceof RangeError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Undefined Error' }, { status: 500 });
    }
  }
}
