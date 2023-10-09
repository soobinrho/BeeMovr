// --------------------------------------------------------------------
// Open Meteo API parameters.
// --------------------------------------------------------------------
// The latitude and longitude must be in the WGS84 system.
// Precipitation's unit must be millimeters. Date's unit must be
// the ISO date format, which is yyyy-mm-dd.
// Source:
//   https://open-meteo.com/en/docs/historical-weather-api
export interface IgetWeather {
  api_lng: string;
  api_lat: string;
  api_yearMonth: string;
  api_type: string;
}

export interface IfetchOpenMeteo {
  api_lng: string;
  api_lat: string;
  api_yearMonth: string;
  api_type: string;
}

export interface IstripOpenMeteo {
  longitude: string;
  latitude: string;
  generationtime_ms: string;
  utc_offset_seconds: string;
  timezone: string;
  timezone_abbreviation: string;
  elevation: string;
  daily_units: any;
  daily: any;
}

export interface IparseOpenMeteo {
  stripped_api_response_time: string[];
  stripped_api_response_value: string[];
}

export interface types_latLng {
  api_lng: string;
  api_lat: string;
}

export interface types_latLngYearMonth {
  api_lng: string;
  api_lat: string;
  api_yearMonth: string;
}

// --------------------------------------------------------------------
// Main function.
// --------------------------------------------------------------------
export async function getWeather(params: IgetWeather): Promise<string> {
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

  if (
    !isValidLngLat({ api_lng: params.api_lng, api_lat: params.api_lat }) ||
    !isValidYearMonth(params.api_yearMonth)
  ) {
    return 'Bad Request Error';
  }

  try {
    const api_response = await fetchOpenMeteo({
      api_lng: params.api_lng,
      api_lat: params.api_lat,
      api_yearMonth: params.api_yearMonth,
      api_type: params.api_type,
    });

    const stripped_api_response = stripOpenMeteo(api_response, params.api_type);
    const parsed_api_response = parseOpenMeteo(
      stripped_api_response,
      params.api_type
    );
    return parsed_api_response;
  } catch (err) {
    console.log(err);
    return 'Internal Server Error';
  }
}

// --------------------------------------------------------------------
// Helper functions.
// --------------------------------------------------------------------
export async function fetchOpenMeteo(params: IfetchOpenMeteo) {
  /**
   * A wrapper around Open Meteo API's for historical weather data.
   */

  // Get exactly one month worth of data, since the prediction model
  // requires monthly values.
  const start_date_local = new Date(params.api_yearMonth);
  const start_date = getLocalToUTC(start_date_local);
  const end_date = structuredClone(start_date);
  end_date.setMonth(start_date.getMonth() + 1);
  const api_start_date = start_date.toISOString().split('T')[0];
  const api_end_date = end_date.toISOString().split('T')[0];

  const api_url =
    'https://archive-api.open-meteo.com/v1/archive?' +
    'longitude' +
    '=' +
    params.api_lng +
    '&' +
    'latitude' +
    '=' +
    params.api_lat +
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
    params.api_type +
    '&' +
    'timezone' +
    '=' +
    'GMT';

  const api_response = await fetch(api_url, { cache: 'force-cache' });
  return await api_response.json();
}

export function stripOpenMeteo(
  params: IstripOpenMeteo,
  api_type: string
): IparseOpenMeteo {
  /**
   * Discards unnecessary fields and returns only the relevant fields.
   *
   * @remarks
   * Now, all of these precipitation and max / min temperature values
   * are obtained by calling API's everytime. In the future roadmap,
   * however, we plan to implement PostGIS to store all of these.
   * This way, we can minimize API calls and improve performance.
   */
  // stripped_api_response_time: string[];
  // stripped_api_response_value: string[];
  const stripped_api_response: IparseOpenMeteo = {
    stripped_api_response_time: params.daily.time,
    stripped_api_response_value: params.daily[api_type],
  };
  return stripped_api_response;
}

export function parseOpenMeteo(
  params: IparseOpenMeteo,
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
  // const array_api_response_time = Array.from(
  //   Object.values(IparseOpenMeteo.stripped_api_response_time)
  // );
  const array_api_response_time = params.stripped_api_response_time;
  const array_api_response_value = params.stripped_api_response_value;
  const SIZE = array_api_response_time.length;
  if (api_type === 'precipitation_sum') {
    // For monthly precipitation, find the sum of all daily
    // precipitation values.
    let sum = 0;
    for (let i = 0; i < SIZE; i++) {
      const value = array_api_response_value[i];
      if (isValidNumber(value)) {
        sum += Number(value);
      }
    }
    return sum.toString();
  } else if (api_type === 'temperature_2m_max') {
    // For monthly maximum temperature, find the maximum daily
    // temperature value.
    let max = Number.MIN_VALUE;
    for (let i = 0; i < SIZE; i++) {
      const value = array_api_response_value[i];
      if (isValidNumber(value)) {
        if (max < Number(value)) {
          max = Number(value);
        }
      }
    }
    return max.toString();
  } else {
    // else if (api_type === "temperature_2m_min")
    // For monthly minimum temperature, find the minimum daily
    // temperature value.
    let min = Number.MAX_VALUE;
    for (let i = 0; i < SIZE; i++) {
      const value = array_api_response_value[i];
      if (isValidNumber(value)) {
        if (min > Number(value)) {
          min = Number(value);
        }
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

export function isValidLngLat(params: types_latLng): boolean {
  if (
    params.api_lng === '' ||
    !isValidNumber(params.api_lng) ||
    params.api_lat === '' ||
    !isValidNumber(params.api_lat)
  ) {
    return false;
  }
  // Maximum and minimum possible values of latitude and longitude.
  // Source:
  //   https://docs.mapbox.com/help/glossary/lat-lon
  const numeric_api_lng = Number(params.api_lng);
  const numeric_api_lat = Number(params.api_lat);
  if (Math.abs(numeric_api_lng) <= 180 || Math.abs(numeric_api_lat) <= 90) {
    return true;
  } else {
    return false;
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

  return yearDate_input < yearDate_now;
}

export function isValidNumber(param: string): boolean {
  return !isNaN(Number(param));
}
