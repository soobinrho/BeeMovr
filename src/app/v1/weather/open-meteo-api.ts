// --------------------------------------------------------------------
// Open Meteo API parameters.
// --------------------------------------------------------------------
// The latitude and longitude must be in the WGS84 system.
// Precipitation's unit must be millimeters. Date's unit must be
// the ISO date format, which is yyyy-mm-dd.
// Source:
//   https://open-meteo.com/en/docs/historical-weather-api
export interface paramsOpenMeteo {
  api_url_base: string;
  api_param_lat: string;
  api_value_lat: string;
  api_param_lng: string;
  api_value_lng: string;
  api_param_start_date: string;
  api_value_start_date: string;
  api_param_end_date: string;
  api_value_end_date: string;
  api_param_type: string;
  api_value_type: string;
}

// --------------------------------------------------------------------
// Open Meteo API response types.
// --------------------------------------------------------------------
export interface Forecast {
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

function fetchOpenMeteo(params: paramsOpenMeteo) {
  /**
   * Calls the Open Meteo API and returns the json object.
   */
  const api_url =
    params.api_url_base +
    "?" +
    params.api_param_lat +
    "=" +
    params.api_value_lat +
    "&" +
    params.api_param_lng +
    "=" +
    params.api_value_lng +
    "&" +
    params.api_param_start_date +
    "=" +
    params.api_value_start_date +
    "&" +
    params.api_param_end_date +
    "=" +
    params.api_value_end_date +
    "&" +
    params.api_param_type +
    "=" +
    params.api_value_type;
  return fetch(api_url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }
  });
}
