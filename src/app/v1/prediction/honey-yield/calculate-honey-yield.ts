import {
  getWeather,
  types_latLngReferenceDate,
} from "../../weather/open-meteo-api";

export function calculateHoneyYield(
    precipitation: string,
    max_temp: string,
    min_temp: string
): string {
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


  return "0";
}
