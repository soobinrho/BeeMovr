export function calculateHoneyYield(
  lat: string | null,
  lng: string | null
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
   *
   * @param lat - The latitude value
   * @param lng - The longitude value
   */
  if (
    lat == null ||
    lat === "" ||
    isNaN(Number(lat)) ||
    lng == null ||
    lng === "" ||
    isNaN(Number(lng))
  ) {
    return "-1";
  }

  // TODO: This is temporary hard-coded data generation.
  // Replace this with proper input and calculations.
  let temporary_today = new Date();
  temporary_today.setMonth(temporary_today.getMonth() - 1);
  let temporary_today_minus_three_months = new Date();
  temporary_today_minus_three_months.setMonth(
    temporary_today_minus_three_months.getMonth() - 3
  );

  const params: paramsOpenMeteo = {
    api_url_base: "https://archive-api.open-meteo.com/v1/archive",
    api_param_lat: "latitude",
    api_value_lat: lat,
    api_param_lng: "longitude",
    api_value_lng: lng,
    api_param_start_date: "start_date",
    api_value_start_date: temporary_today_minus_three_months
      .toISOString()
      .split("T")[0],
    api_param_end_date: "end_date",
    api_value_end_date: temporary_today.toISOString().split("T")[0],
    api_param_type: "daily",
    api_type_precipitation: "precipitation_sum",
    api_type_max_temp: "temperature_2m_max",
    api_type_min_temp: "temperature_2m_min",
  };

  return params.api_value_end_date;
}
