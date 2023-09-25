import {
  params_openMeteo,
  types_latLng,
  isValidLatLng,
} from "../../weather/open-meteo-api";

export function calculateHoneyYield(params: types_latLng): string {
  /**
   * Returns the honey yield prediction value.
   *
   * @remarks
   * Our model for predicting honey production requires precipitation, max
   * temperature, and min temperature for the past three months.
   * Source:
   *   "The Impact of Precipitation and Temperature on Honey Yield in
   *   the United States." 2020. Auburn University. Hayes Kent Grogan.
   *
   * @param lat - The latitude value
   * @param lng - The longitude value
   */

  return "0";
}
