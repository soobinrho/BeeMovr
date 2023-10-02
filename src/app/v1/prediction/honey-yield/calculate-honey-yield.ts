import { NextRequest } from 'next/server';

import {
  getLocalToUTC,
  getWeather,
  isValidLatLng,
  isValidYearMonth,
} from '../../weather/open-meteo-api';

export interface IcalculateHoneyYield {
  api_lat: string;
  api_lng: string;
  api_yearMonth: string;
}

export async function calculateHoneyYield(
  params: IcalculateHoneyYield
): Promise<string> {
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
    !isValidLatLng({ api_lat: params.api_lat, api_lng: params.api_lng }) ||
    !isValidYearMonth(params.api_yearMonth)
  ) {
    return 'Bad Request Error';
  }

  // Our honey yield prediction model requires data from the last three
  // months (precipitation, max and min temperature). The number below
  // is four; it includes the current month.
  const HOW_MANY_MONTHS = 4;
  const date_local = new Date(params.api_yearMonth);
  let date = getLocalToUTC(date_local);
  let api_dates: string[] = [];
  for (let i = 0; i < HOW_MANY_MONTHS; i++) {
    api_dates.push(date.toISOString().split('T')[0]);
    date.setMonth(date.getMonth() - 1);
  }

  // ------------------------------------------------------------------
  // Monthly precipitation data of the last three months.
  // ------------------------------------------------------------------
  const api_type_precipitation = 'precipitation_sum';
  let api_responses_precipitation: number[] = [];
  for (let i = 0; i < HOW_MANY_MONTHS; i++) {
    const api_response = await getWeather({
      api_lat: params.api_lat,
      api_lng: params.api_lng,
      api_yearMonth: api_dates[i],
      api_type: api_type_precipitation,
    });

    // API error response best practices.
    // Source:
    //   https://nextjs.org/docs/app/api-reference/functions/next-response#json
    if (api_response === 'Bad Request Error') {
      return 'Bad Request Error';
    } else if (api_response === 'Internal Server Error') {
      return 'Internal Server Error';
    } else {
      api_responses_precipitation.push(Number(api_response));
    }
  }

  // ------------------------------------------------------------------
  // Monthly maximum temperature data of the last three months.
  // ------------------------------------------------------------------
  const api_type_maxTemp = 'temperature_2m_max';
  let api_responses_maxTemp: number[] = [];
  for (let i = 0; i < HOW_MANY_MONTHS; i++) {
    const api_response = await getWeather({
      api_lat: params.api_lat,
      api_lng: params.api_lng,
      api_yearMonth: api_dates[i],
      api_type: api_type_maxTemp,
    });

    // API error response best practices.
    // Source:
    //   https://nextjs.org/docs/app/api-reference/functions/next-response#json
    if (api_response === 'Bad Request Error') {
      return 'Bad Request Error';
    } else if (api_response === 'Internal Server Error') {
      return 'Internal Server Error';
    } else {
      api_responses_maxTemp.push(Number(api_response));
    }
  }

  // ------------------------------------------------------------------
  // Monthly minimum temperature data of the last three months.
  // ------------------------------------------------------------------
  const api_type_minTemp = 'temperature_2m_min';
  let api_responses_minTemp: number[] = [];
  for (let i = 0; i < HOW_MANY_MONTHS; i++) {
    const api_response = await getWeather({
      api_lat: params.api_lat,
      api_lng: params.api_lng,
      api_yearMonth: api_dates[i],
      api_type: api_type_minTemp,
    });

    // API error response best practices.
    // Source:
    //   https://nextjs.org/docs/app/api-reference/functions/next-response#json
    if (api_response === 'Bad Request Error') {
      return 'Bad Request Error';
    } else if (api_response === 'Internal Server Error') {
      return 'Internal Server Error';
    } else {
      api_responses_minTemp.push(Number(api_response));
    }
  }

  // Honey yield prediction model.
  // Source:
  //   "The Impact of Precipitation and Temperature on Honey Yield in
  //   the United States." 2020. Auburn University. Hayes Kent Grogan.
  const prediction_honeyYield =
    60.596 +
    0.001 * api_responses_precipitation[3] * 10 +
    -0.001 * api_responses_precipitation[2] * 10 +
    0.056 * api_responses_minTemp[3] * 10 +
    0.027 * api_responses_minTemp[2] * 10 +
    -0.027 * api_responses_minTemp[0] * 10 +
    -0.034 * api_responses_maxTemp[3] * 10 +
    0.012 * api_responses_maxTemp[2] * 10 +
    0.032 * api_responses_maxTemp[0] * 10 +
    (0.465 * 0.074 + 2.28 * 0.012 + 9.679 * 0.04);
  return String(prediction_honeyYield);
}

// TODO: Do more domain research on nectar availability:
//   https://scholar.google.com/scholar?hl=en&as_sdt=0%2C8&q=nectar+availability&btnG=&oq=nec
// TODO: Show the confidence level of predictions to always inform.
