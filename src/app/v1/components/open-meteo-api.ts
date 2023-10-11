// --------------------------------------------------------------------
// Open Meteo API parameters.
// --------------------------------------------------------------------
// The longitude and latitude must be in the WGS84 system.
// Precipitation's unit must be millimeters. Date's unit must be
// the ISO date format, which is yyyy-MM-dd.
// Source:
//   https://open-meteo.com/en/docs/historical-weather-api
export interface IgetWeather {
  api_lng: string;
  api_lat: string;
  api_startYearMonth: string;
  api_endYearMonth: string;
  api_type: string;
}

export interface IfetchOpenMeteo {
  api_lng: string;
  api_lat: string;
  api_startYearMonth: string;
  api_endYearMonth: string;
  api_type: string;
}

export interface IstripOpenMeteo {
  api_response: {
    longitude: string;
    latitude: string;
    generationtime_ms: string;
    utc_offset_seconds: string;
    timezone: string;
    timezone_abbreviation: string;
    elevation: string;
    daily_units: any;
    daily: any;
  };
  api_type: string;
}

export interface ImonthlyGroupOpenMeteo {
  stripped_api_response_time: string[];
  stripped_api_response_value: string[];
}

export interface IparseOpenMeteo {
  monthly_grouped_api_response: {
    [api_response_yearMonth: string]: string[];
  };
  api_type: string;
}

export interface types_latLng {
  api_lng: string;
  api_lat: string;
}

// --------------------------------------------------------------------
// Main function.
// --------------------------------------------------------------------
export async function getWeather(params: IgetWeather) {
  /**
   * Get monthly precipitation, max and min temperature data from Open Meteo API's.
   *
   * @remarks
   * The return values from Open Meteo are daily values, so helper functions are
   * used to calculate their monthly equivalents (sum, max, and min respectively).
   */

  if (
    !isValidLngLat({ api_lng: params.api_lng, api_lat: params.api_lat }) ||
    !isValidYearMonth(params.api_startYearMonth) ||
    !isValidYearMonth(params.api_endYearMonth)
  ) {
    throw new RangeError('Bad Request Error');
  }

  // Javascript Date objects are initialized with local time zone by
  // default. Convert them to UTC for accurate handling of time.
  // Source:
  //   https://stackoverflow.com/a/38050824
  let api_startYearMonth_Date = new Date(
    params.api_startYearMonth + 'T00:00:00Z'
  );
  api_startYearMonth_Date.setUTCDate(1);
  const api_startYearMonth = api_startYearMonth_Date
    .toISOString()
    .split('T')[0];

  // Open Meteo accepts date in the form of yyyy-MM-dd. Currently, the
  // data is in the form of yyyy-MM. So, append -01 (-dd) at the end.
  let api_endYearMonth_Date = new Date(params.api_endYearMonth + 'T00:00:00Z');
  api_endYearMonth_Date.setUTCMonth(api_endYearMonth_Date.getUTCMonth() + 1);
  api_endYearMonth_Date.setUTCDate(api_endYearMonth_Date.getUTCDate() - 1);
  const api_endYearMonth = api_endYearMonth_Date.toISOString().split('T')[0];

  try {
    const api_response = await fetchOpenMeteo({
      api_lng: params.api_lng,
      api_lat: params.api_lat,
      api_startYearMonth: api_startYearMonth,
      api_endYearMonth: api_endYearMonth,
      api_type: params.api_type,
    });

    const { stripped_api_response_time, stripped_api_response_value } =
      stripOpenMeteo({
        api_response: api_response,
        api_type: params.api_type,
      });
    const monthly_grouped_api_response = monthlyGroupOpenMeteo({
      stripped_api_response_time: stripped_api_response_time,
      stripped_api_response_value: stripped_api_response_value,
    });
    const parsed_api_response = parseOpenMeteo({
      monthly_grouped_api_response: monthly_grouped_api_response,
      api_type: params.api_type,
    });
    return parsed_api_response;
  } catch (err) {
    console.error(err);
    throw new Error('Internal Server Error');
  }
}

// --------------------------------------------------------------------
// Helper functions.
// --------------------------------------------------------------------
async function fetchOpenMeteo(params: IfetchOpenMeteo) {
  /**
   * A wrapper around Open Meteo API's for historical weather data.
   */

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
    params.api_startYearMonth +
    '&' +
    'end_date' +
    '=' +
    params.api_endYearMonth +
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

export function stripOpenMeteo(params: IstripOpenMeteo): {
  stripped_api_response_time: string[];
  stripped_api_response_value: string[];
} {
  /**
   * Discards unnecessary fields and returns only the relevant fields.
   *
   * @remarks
   * Now, all of these precipitation and max / min temperature values
   * are obtained by calling API's everytime. In the future roadmap,
   * however, we plan to implement PostGIS to store all of these.
   * This way, we can minimize API calls and improve performance.
   */
  const stripped_api_response = {
    stripped_api_response_time: params.api_response.daily.time,
    stripped_api_response_value: params.api_response.daily[params.api_type],
  };
  return stripped_api_response;
}

function monthlyGroupOpenMeteo(params: ImonthlyGroupOpenMeteo) {
  const stripped_api_response_time = params.stripped_api_response_time;
  const stripped_api_response_value = params.stripped_api_response_value;
  let monthly_grouped_api_response: {
    [api_response_yearMonth: string]: string[];
  } = {};
  for (let i = 0; i < stripped_api_response_time.length; i++) {
    const now_yearMonth = stripped_api_response_time[i].substring(0, 7);
    const now_value = stripped_api_response_value[i];
    if (isValidNumber(now_value)) {
      if (monthly_grouped_api_response[now_yearMonth] === undefined) {
        monthly_grouped_api_response[now_yearMonth] = [now_value];
      } else {
        monthly_grouped_api_response[now_yearMonth].push(now_value);
      }
    }
  }

  // Sometimes, only a few days worth data can be present in a month.
  // This can skew the results, so delete months in which there are
  // less than 28 data points.
  let cleaned_monthly_grouped_api_response: {
    [api_response_yearMonth: string]: string[];
  } = {};
  for (let yearMonth in monthly_grouped_api_response) {
    if (monthly_grouped_api_response[yearMonth].length >= 28) {
      cleaned_monthly_grouped_api_response[yearMonth] = structuredClone(
        monthly_grouped_api_response[yearMonth]
      );
    }
  }
  return cleaned_monthly_grouped_api_response;
}

function parseOpenMeteo(params: IparseOpenMeteo) {
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
  const monthly_grouped_api_response = params.monthly_grouped_api_response;

  let parsed_api_response: {
    [api_response_yearMonth: string]: string;
  } = {};

  for (let yearMonth in monthly_grouped_api_response) {
    const values = monthly_grouped_api_response[yearMonth];
    const values_length = monthly_grouped_api_response[yearMonth].length;
    if (params.api_type === 'precipitation_sum') {
      // For monthly precipitation, find the sum of all daily
      // precipitation values.
      let sum = 0;
      for (let i = 0; i < values_length; i++) {
        const value = values[i];
        if (isValidNumber(value)) {
          sum += Number(value);
        }
      }
      parsed_api_response[yearMonth] = String(sum);
    } else if (params.api_type === 'temperature_2m_max') {
      // For monthly maximum temperature, find the maximum daily
      // temperature value.
      let max = Number.MIN_VALUE;
      for (let i = 0; i < values_length; i++) {
        const value = values[i];
        if (isValidNumber(value)) {
          if (max < Number(value)) {
            max = Number(value);
          }
        }
      }
      parsed_api_response[yearMonth] = String(max);
    } else {
      // else if (api_type === "temperature_2m_min")
      // For monthly minimum temperature, find the minimum daily
      // temperature value.
      let min = Number.MAX_VALUE;
      for (let i = 0; i < values_length; i++) {
        const value = values[i];
        if (isValidNumber(value)) {
          if (min > Number(value)) {
            min = Number(value);
          }
        }
      }
      parsed_api_response[yearMonth] = String(min);
    }
  }
  return parsed_api_response;
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

export function isValidYearMonth(yearMonth: string | null): boolean {
  if (!yearMonth || !/\d{4}-\d{2}/.test(yearMonth)) {
    return false;
  }

  // To calculate monthly precipitation, max and min temperature, we
  // need a full month worth of data, which means the input month
  // shouldn't be the current month, since the month has not come to
  // the end yet. Likewise, it's not a valid month if the date is
  // set in the future.
  const yearMonth_input = getLocalYearMonthToUTCYearMonth(yearMonth);
  const yearMonth_now = getTodayYearMonthUTC();

  return yearMonth_input < yearMonth_now;
}

export function isValidNumber(param: string): boolean {
  return !isNaN(Number(param));
}

export function getLocalYearMonthToUTCYearMonth(
  yearMonth_local: string
): string {
  let date_UTC = new Date(yearMonth_local + 'T00:00:00Z');

  // Javascript Date objects are initialized with local time zone by
  // default. Convert them to UTC for accurate handling of time.
  // Source:
  //   https://stackoverflow.com/a/38050824
  date_UTC.setUTCHours(0, 0, 0, 0);
  date_UTC.setUTCDate(1);

  const yearMonth_UTC = date_UTC.toISOString().split('T')[0];
  return yearMonth_UTC;
}

export function getTodayYearMonthUTC(): string {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(1);

  const yearMonth_UTC = date.toISOString().split('T')[0];
  return yearMonth_UTC;
}
