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
  api_referenceDate: string | null;
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
  daily_units: DailyUnits;
  daily: any;
}

export async function fetchOpenMeteo(params: types_OpenMeteo) {
  /**
   * Calls the Open Meteo API and returns the json object.
   */
  let start_date =
    (params.api_referenceDate && new Date(params.api_referenceDate)) ||
    new Date();
  let end_date =
    (params.api_referenceDate && new Date(params.api_referenceDate)) ||
    new Date();
  start_date.setMonth(start_date.getMonth() - 3);
  const api_start_date = start_date.toISOString().split("T")[0];
  const api_end_date = end_date.toISOString().split("T")[0];

  const api_url =
    "https://archive-api.open-meteo.com/v1/archive?" +
    "latitude" +
    "=" +
    params.api_lat +
    "&" +
    "longitude" +
    "=" +
    params.api_lng +
    "&" +
    "start_date" +
    "=" +
    api_start_date +
    "&" +
    "end_date" +
    "=" +
    api_end_date +
    "&" +
    "daily" +
    "=" +
    params.api_type;

  const api_response = await fetch(api_url, { cache: "force-cache" });
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
  [stripped_api_response_time, stripped_api_response_value]: Array<Object>,
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
  if (api_type === "precipitation_sum") {
    // For monthly precipitation, find the sum of all daily
    // precipitation values.
    let sum = 0;
    for (let i = 0; i < SIZE; i++) {
      sum += array_api_response_value[i];
    }
    return sum.toString();
  } else if (api_type === "temperature_2m_max") {
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

export function isValidLatLng(params: types_latLng): boolean {
  if (
    params.api_lat == null ||
    params.api_lat === "" ||
    isNaN(Number(params.api_lat)) ||
    params.api_lng == null ||
    params.api_lng === "" ||
    isNaN(Number(params.api_lng))
  ) {
    return false;
  } else {
    return true;
  }
}

export function isValidReferenceDate(referenceDate: string | null): boolean {
  if (referenceDate == null) {
    return false;
  } else {
    return /\d{4}-\d{2}/.test(referenceDate);
  }
}

// --------------------------------------------------------------------
// Open Meteo API response types for max-temp.
// --------------------------------------------------------------------
export interface MaxTemp {
  "max-temp": MaxTempClass;
}

export interface MaxTempClass {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Daily {
  time: string[];
  temperature_2m_max: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
}

// --------------------------------------------------------------------
// Open Meteo API response types for min-temp.
// --------------------------------------------------------------------
export interface MinTemp {
  "min-temp": MinTempClass;
}

export interface MinTempClass {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Daily {
  time: string[];
  temperature_2m_min: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_min: string;
}

// --------------------------------------------------------------------
// Open Meteo API response types for precipitation.
// --------------------------------------------------------------------
export interface Precipitation {
  precipitation: PrecipitationClass;
}

export interface PrecipitationClass {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Daily {
  time: string[];
  precipitation_sum: number[];
}

export interface DailyUnits {
  time: string;
  precipitation_sum: string;
}
