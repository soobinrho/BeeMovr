import { NextRequest, NextResponse } from 'next/server';

// --------------------------------------------------------------------
// Open Meteo API parameters.
// --------------------------------------------------------------------
// The latitude and longitude must be in the WGS84 system.
// Precipitation's unit must be millimeters. Date's unit must be
// the ISO date format, which is yyyy-mm-dd.
// Source:
//   https://open-meteo.com/en/docs/historical-weather-api
export interface types_OpenMeteo {
  api_lat: string | null;
  api_lng: string | null;
  api_year_month: string | null;
  api_type: string;
}

export interface types_latLngReferenceDate {
  api_lat: string | null;
  api_lng: string | null;
  api_referenceDate: string | null;
}

export interface types_latLng {
  api_lat: string | null;
  api_lng: string | null;
}

export interface types_api_response {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: any;
  daily: any;
}

// --------------------------------------------------------------------
// Main function.
// --------------------------------------------------------------------
export async function getWeather(
  request: NextRequest,
  api_type: string,
  api_response_key: string
) {
  /**
   * Get monthly precipitation, max and min temperature data from Open Meteo API's.
   *
   * @remarks
   * The return values from Open Meteo are daily values, so helper functions are
   * used to calculate their monthly equivalents (sum, max, and min respectively).
   *
   * @param request - API GET request object
   * @param api_type - Open Meteo API type listed at https://open-meteo.com/en/docs/historical-weather-api
   * @param api_response_key - The key for the JSON return object
   */
  let lat: string = '-1';
  let lng: string = '-1';
  let yearMonth: string = '1998-08';

  // In Jest unit testing environments, searchParams is strangely not
  // accessible and therefore gives out a fetal error.
  try {
    const queryParams = request.nextUrl.searchParams;
    lat = queryParams.get('lat') || '-1';
    lng = queryParams.get('lng') || '-1';
    yearMonth = queryParams.get('year-month') || '1998-08';
  } catch (err) {
    // The try catch block would not have been needed at all, if not for
    // the "TypeError: Cannot read properties of undefined (reading
    // searchParams')" which strangely occurs only in Jest unit testing.
    // We suspect it's caused by some kind of compatibility issues with
    // Next.js 13 server side components with Jest.
  }

  if (
    !isValidLatLng({ api_lat: lat, api_lng: lng }) ||
    !isValidYearMonth(yearMonth)
  ) {
    // API error response best practices.
    // Source:
    //   https://nextjs.org/docs/app/api-reference/functions/next-response#json
    return NextResponse.json({ error: 'Bad Request Error' }, { status: 400 });
  }

  try {
    const api_response = await fetchOpenMeteo({
      api_lat: lat,
      api_lng: lng,
      api_year_month: yearMonth,
      api_type: api_type,
    });

    const [stripped_api_response_time, stripped_api_response_value] =
      stripOpenMeteo(api_response, api_type);
    const parsed_api_response = parseOpenMeteo(
      [stripped_api_response_time, stripped_api_response_value],
      api_type
    );

    return NextResponse.json({ [api_response_key]: parsed_api_response });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// --------------------------------------------------------------------
// Helper functions.
// --------------------------------------------------------------------
export async function fetchOpenMeteo(params: types_OpenMeteo) {
  /**
   * A wrapper around Open Meteo API's for historical weather data.
   */

  // Get exactly one month worth of data, since the prediction model
  // requires monthly values.
  const start_date_local =
    (params.api_year_month && new Date(params.api_year_month)) || new Date();
  const start_date = getLocalToUTC(start_date_local);
  const end_date = structuredClone(start_date);
  end_date.setMonth(start_date.getMonth() + 1);
  const api_start_date = start_date.toISOString().split('T')[0];
  const api_end_date = end_date.toISOString().split('T')[0];

  const api_url =
    'https://archive-api.open-meteo.com/v1/archive?' +
    'latitude' +
    '=' +
    params.api_lat +
    '&' +
    'longitude' +
    '=' +
    params.api_lng +
    '&' +
    'start_date' +
    '=' +
    api_start_date +
    '&' +
    'end_date' +
    '=' +
    api_end_date +
    '&' +
    'daily' +
    '=' +
    params.api_type;

  const api_response = await fetch(api_url, { cache: 'force-cache' });
  return await api_response.json();
}

export function stripOpenMeteo(
  api_response: types_api_response,
  api_type: string
): Array<object> {
  /**
   * Discards unnecessary fields and returns only the relevant fields.
   *
   * @remarks
   * Now, all of these precipitation and max / min temperature values
   * are obtained by calling API's everytime. In the future roadmap,
   * however, we plan to implement PostGIS to store all of these.
   * This way, we can minimize API calls and improve performance.
   */
  return [api_response.daily.time, api_response.daily[api_type]];
}

export function parseOpenMeteo(
  [stripped_api_response_time, stripped_api_response_value]: Array<object>,
  api_type: string
): string {
  /**
   * Parses and calculates the required values.
   *
   * @remarks
   * Since the data from Open Meteo are daily values, and since the
   * honey yield prediction model requires monthly values, the data
   * have to go through some processing.
   */
  const array_api_response_time = Array.from(
    Object.values(stripped_api_response_time)
  );
  const array_api_response_value = Array.from(
    Object.values(stripped_api_response_value)
  );
  const SIZE = array_api_response_time.length;
  if (api_type === 'precipitation_sum') {
    // For monthly precipitation, find the sum of all daily
    // precipitation values.
    let sum = 0;
    for (let i = 0; i < SIZE; i++) {
      sum += array_api_response_value[i];
    }
    return sum.toString();
  } else if (api_type === 'temperature_2m_max') {
    // For monthly maximum temperature, find the maximum daily
    // temperature value.
    let max = array_api_response_value[0];
    for (let i = 0; i < SIZE; i++) {
      const value = array_api_response_value[i];
      if (max < value) {
        max = value;
      }
    }
    return max.toString();
  } else {
    // else if (api_type === "temperature_2m_min")
    // For monthly minimum temperature, find the minimum daily
    // temperature value.
    let min = array_api_response_value[0];
    for (let i = 0; i < SIZE; i++) {
      const value = array_api_response_value[i];
      if (min > value) {
        min = value;
      }
    }
    return min.toString();
  }
}

export function getLocalToUTC(date_local: Date): Date {
  const date_UTC = new Date(
    Date.UTC(
      date_local.getUTCFullYear(),
      date_local.getUTCMonth(),
      date_local.getUTCDate()
    )
  );
  return date_UTC;
}

export function isValidLatLng(params: types_latLng): boolean {
  if (
    params.api_lat == null ||
    params.api_lat === '' ||
    isNaN(Number(params.api_lat)) ||
    params.api_lng == null ||
    params.api_lng === '' ||
    isNaN(Number(params.api_lng))
  ) {
    return false;
  }
  // Maximum and minimum possible values of latitude and longitude.
  // Source:
  //   https://docs.mapbox.com/help/glossary/lat-lon
  const numeric_api_lat = Number(params.api_lat);
  const numeric_api_lng = Number(params.api_lng);
  if (
    numeric_api_lat < -90 ||
    numeric_api_lat > 90 ||
    numeric_api_lng < -180 ||
    numeric_api_lng > 180
  ) {
    return false;
  } else {
    return true;
  }
}

export function isValidYearMonth(yearDate: string | null): boolean {
  if (!yearDate || !/\d{4}-\d{2}/.test(yearDate)) {
    return false;
  }

  // To calculate monthly precipitation, max and min temperature, we
  // need a full month worth of data, which means the input month
  // shouldn't be the current month, since the month has not come to
  // the end yet. Likewise, it's not a valid month if the date is
  // set in the future.
  const yearDate_input = new Date(yearDate + 'T00:00:00Z');
  const yearDate_now_local = new Date();
  const yearDate_now = getLocalToUTC(yearDate_now_local);

  // Javascript Date objects are initialized with local time zone by
  // default. Convert them to UTC for accurate handling of time.
  // Source:
  //   https://stackoverflow.com/a/38050824
  yearDate_now.setUTCHours(0, 0, 0, 0);
  yearDate_now.setUTCDate(1);

  if (yearDate_input >= yearDate_now) {
    return false;
  }

  return true;
}
