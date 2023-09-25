import {
  params_openMeteo,
  types_latLng,
  isValidLatLng,
  types_latLngReferenceDate,
} from "../../weather/open-meteo-api";

export function calculateHoneyYield(params: types_latLngReferenceDate): string {
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
   * @param api_lat - The latitude value
   * @param api_lng - The longitude value
   * @param api_referenceDate - The reference date
   */

  return "0";
}
