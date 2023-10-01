import {
  getWeather,
  types_latLngReferenceDate,
} from '../../weather/open-meteo-api';

export function calculateHoneyYield(): string {
  // precipitation: string,
  // max_temp: string,
  // min_temp: string,
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

  // let start_date =
  //   (params.api_year_month && new Date(params.api_year_month)) ||
  //   new Date();
  // let end_date =
  //   (params.api_year_month && new Date(params.api_year_month)) ||
  //   new Date();
  // start_date.setMonth(start_date.getMonth() - 3);
  // const api_start_date = start_date.toISOString().split("T")[0];
  // const api_end_date = end_date.toISOString().split("T")[0];

  // Honey yield prediction model.
  // Source:
  //   "The Impact of Precipitation and Temperature on Honey Yield in
  //   the United States." 2020. Auburn University. Hayes Kent Grogan.
  const prediction_honeyYield = (
    (60.596) +
    (0.001 * monthly_precipitation[2] * 10) +
    (-0.001 * monthly_precipitation[1] * 10) +
    (0.056 * monthly_minTemp[2] * 10) +
    (0.027 * monthly_minTemp[1] * 10) +
    (-0.027 * monthly_minTemp[0] * 10) +
    (-0.034 * monthly_maxTemp[2] * 10) +
    (0.012 * monthly_maxTemp[1] * 10) +
    (0.032 * monthly_maxTemp[0] * 10) +
    (0.465 * 0.074 + 2.28 * 0.012 + 9.679 * 0.04)
  );
  
  return prediction_honeyYield;
}

// TODO: Do more domain research on nectar availability:
//   https://scholar.google.com/scholar?hl=en&as_sdt=0%2C8&q=nectar+availability&btnG=&oq=nec
// TODO: Show the confidence level of predictions to always inform.
