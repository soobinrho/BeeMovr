// --------------------------------------------------------------------
// Open Meteo API parameters.
// --------------------------------------------------------------------
// The latitude and longitude must be in the WGS84 system.
// Precipitation's unit must be millimeters. Date's unit must be
// the ISO date format, which is yyyy-mm-dd.
// Source:
//   https://open-meteo.com/en/docs/historical-weather-api
export interface params_openMeteo {
  api_lat: string | null;
  api_lng: string | null;
  api_type: string;
}

export interface types_latLng {
  lat: string | null;
  lng: string | null;
}

// --------------------------------------------------------------------
// Open Meteo API response types.
// --------------------------------------------------------------------
export interface types_api_request {
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

export function isValidLatLng(params: types_latLng): boolean {
  if (
    params.lat == null ||
    params.lat === "" ||
    isNaN(Number(params.lat)) ||
    params.lng == null ||
    params.lng === "" ||
    isNaN(Number(params.lng))
  ) {
    return false;
  } else {
    return true;
  }
}

export async function fetchOpenMeteo(params: params_openMeteo) {
  /**
   * Calls the Open Meteo API and returns the json object.
   */
  let start_date = new Date();
  let end_date = new Date();
  start_date.setMonth(start_date.getMonth() - 3);
  end_date.setMonth(end_date.getMonth() - 1);
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
