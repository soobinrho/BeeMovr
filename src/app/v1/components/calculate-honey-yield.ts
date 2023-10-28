import {
  api_response_key_honeyYield,
  api_response_key_maxTemp,
  api_response_key_minTemp,
  api_response_key_precipitation,
  api_type_maxTemp,
  api_type_minTemp,
  api_type_precipitation,
  getLocalYearMonthToUTCYearMonth,
  getWeather,
  isValidLngLat,
  isValidYearMonth,
} from '@/app/v1/components/open-meteo-api';
import axios from 'axios';

export interface IcalculateHoneyYield {
  api_lng: string;
  api_lat: string;
  api_yearMonth: string;
}

export const MAX_DIGITS_HONEY_YIELD = 1;

export async function calculateHoneyYield(params: IcalculateHoneyYield) {
  /**
   * Returns the honey yield prediction value.
   *
   * @remarks
   * Our model for predicting honey production requires precipitation, max
   * temperature, and min temperature for the past three months.
   * Source:
   *   "The Impact of Precipitation and Temperature on Honey Yield in
   *   the United States." 2020. Auburn University. Hayes Kent Grogan.
   */

  if (
    !isValidLngLat({ api_lng: params.api_lng, api_lat: params.api_lat }) ||
    !isValidYearMonth(params.api_yearMonth)
  ) {
    throw new RangeError('Bad Request Error');
  }

  // Our honey yield prediction model requires data from the last three
  // months (precipitation, max and min temperature). The number below
  // is four; it includes the current month.
  const HOW_MANY_MONTHS = 3;
  const api_endYearMonth = getLocalYearMonthToUTCYearMonth(
    params.api_yearMonth
  );
  let api_startDate = new Date(params.api_yearMonth + 'T00:00:00Z');
  api_startDate.setUTCMonth(api_startDate.getUTCMonth() - HOW_MANY_MONTHS);
  api_startDate.setUTCDate(1);
  const api_startYearMonth = api_startDate.toISOString().split('T')[0];

  // ------------------------------------------------------------------
  // Monthly precipitation data of the last three months.
  // ------------------------------------------------------------------
  let api_response_precipitation = await getWeather({
    api_lng: params.api_lng,
    api_lat: params.api_lat,
    api_startYearMonth: api_startYearMonth,
    api_endYearMonth: api_endYearMonth,
    api_type: api_type_precipitation,
  });

  // ------------------------------------------------------------------
  // Monthly maximum temperature data of the last three months.
  // ------------------------------------------------------------------
  let api_response_maxTemp = await getWeather({
    api_lng: params.api_lng,
    api_lat: params.api_lat,
    api_startYearMonth: api_startYearMonth,
    api_endYearMonth: api_endYearMonth,
    api_type: api_type_maxTemp,
  });

  // ------------------------------------------------------------------
  // Monthly minimum temperature data of the last three months.
  // ------------------------------------------------------------------
  let api_response_minTemp = await getWeather({
    api_lng: params.api_lng,
    api_lat: params.api_lat,
    api_startYearMonth: api_startYearMonth,
    api_endYearMonth: api_endYearMonth,
    api_type: api_type_minTemp,
  });

  let keys: string[] = [];
  const keys_length = Object.keys(api_response_precipitation).length;
  for (let i = 0; i < keys_length; i++) {
    const key = Object.keys(api_response_precipitation)[i];
    keys.push(key);
  }

  let prediction_honeyYield = 0;

  // Check if the given coordinate is land or water.
  // Source:
  //   https://isitwater.com/
  if (
    !(await isNotLand({ api_lng: params.api_lng, api_lat: params.api_lat }))
  ) {
    // Honey yield prediction model.
    // Source:
    //   "The Impact of Precipitation and Temperature on Honey Yield in
    //   the United States." 2020. Auburn University. Hayes Kent Grogan.
    prediction_honeyYield = isWithinTemperatureLimit({
      maxTemp: Number(api_response_maxTemp[keys[3]]),
      minTemp: Number(api_response_minTemp[keys[3]]),
    })
      ? 60.596 +
        0.001 * Number(api_response_precipitation[keys[3]]) * 10 +
        -0.001 * Number(api_response_precipitation[keys[2]]) * 10 +
        0.056 * Number(api_response_minTemp[keys[3]]) * 10 +
        0.027 * Number(api_response_minTemp[keys[2]]) * 10 +
        -0.027 * Number(api_response_minTemp[keys[0]]) * 10 +
        -0.034 * Number(api_response_maxTemp[keys[3]]) * 10 +
        0.012 * Number(api_response_maxTemp[keys[2]]) * 10 +
        0.032 * Number(api_response_maxTemp[keys[0]]) * 10 +
        (0.465 * 0.074 + 2.28 * 0.012 + 9.679 * 0.04)
      : 0;
  }

  const returnObject = {
    [api_response_key_honeyYield]: {
      [params.api_yearMonth]: `${prediction_honeyYield.toFixed(
        MAX_DIGITS_HONEY_YIELD
      )}`,
    },
    [api_response_key_precipitation]: api_response_precipitation,
    [api_response_key_maxTemp]: api_response_maxTemp,
    [api_response_key_minTemp]: api_response_minTemp,
  };

  return returnObject;
}

function isWithinTemperatureLimit({
  maxTemp,
  minTemp,
}: {
  maxTemp: Number;
  minTemp: Number;
}) {
  // "The minimum temperature for honeybee flight is 54º F. The
  // optimum temperature for flight activity is 72-77º F, but
  // activity continues up to about 100º F before declining."
  // Source: University of Maine. "Honeybee (Apis mellifera) Flight Activity Index and Mason Bee (Osmia cornuta) Flight Threshold Status"
  //   https://extension.umaine.edu/ipm/background-honeybee-flight-activity-index/#:~:text=Honeybees%20forage%20when%20temperatures%20are,(24.1%20km)%20per%20hour

  // Maximum flight temperature: 100F => 37.78C
  // Minimum flight temperature: 54F => 12.22C
  const MAX_FLIGHT_TEMP: Number = 37.78;
  const MIN_FLIGHT_TEMP: Number = 12.22;
  if (minTemp > MAX_FLIGHT_TEMP || maxTemp < MIN_FLIGHT_TEMP) {
    return false;
  } else {
    return true;
  }
}
async function isNotLand({
  api_lng,
  api_lat,
}: {
  api_lng: string;
  api_lat: string;
}) {
  // If the API credentials are not present as env variables, let the
  // operation bypass this check.
  if (
    !process.env.NEXT_PUBLIC_ISITWATER_API_HOST ||
    !process.env.ISITWATER_API_KEY ||
    process.env.NEXT_PUBLIC_ISITWATER_API_HOST === '' ||
    process.env.ISITWATER_API_KEY === ''
  ) {
    return false;
  }

  const api_request_options = {
    method: 'GET',
    url: process.env.NEXT_PUBLIC_ISITWATER_API_HOST,
    params: {
      longitude: api_lng,
      latitude: api_lat,
    },
    headers: {
      'X-RapidAPI-Key': process.env.ISITWATER_API_KEY,
      'X-RapidAPI-Host': 'isitwater-com.p.rapidapi.com',
    },
  };

  try {
    const api_response = await axios.request(api_request_options);
    if (api_response?.data['water'] === true) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
