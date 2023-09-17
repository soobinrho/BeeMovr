import requests
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

#
# To predict honey production, we need precipitation, minimum temp, and
# maximum temp of the past four months.
#

# Open-Meteo API defaults.
api_url_precipitation = "https://archive-api.open-meteo.com/v1/archive"

# TODO: This is temporary hard-coded data generation.
# Replace this with proper input and calculations.

# Our model for predicting honey production requires precipitation, max
# temperature, and min temperature for the past three months.
# Source:
#   "The Impact of Precipitation and Temperature on Honey Yield in
#   the United States." 2020. Auburn University. Hayes Kent Grogan.
temporary_today = datetime.today()
temporary_today_minus_three_months = temporary_today + relativedelta(months=-3)

print(temporary_today)
print(temporary_today_minus_three_months)

# Open-Meteo API parameters.
# The latitude and longitude must be in the WGS84 system.
# Precipitation's unit is mm.
# Date's unit is yyyy-mm-dd.
# Source:
#   https://open-meteo.com/en/docs/historical-weather-api 
api_param_latitude = "latitude"
api_value_latitude = str(52.52);
api_param_longitude = "longitude"
api_value_longitude = str(13.41);
api_param_start_date = "start_date"
api_value_start_date = str(temporary_today_minus_three_months.date())
api_param_end_date = "end_date"
api_value_end_date = str(temporary_today.date())
api_param_type = "daily"
api_value_type_precipitation = "precipitation_sum"
api_value_type_temp_max = "temperature_2m_max"
api_value_type_temp_min= "temperature_2m_min"

# Honey yield prediction model.
# Source:
#   "The Impact of Precipitation and Temperature on Honey Yield in
#   the United States." 2020. Auburn University. Hayes Kent Grogan.
temp_b_0 = 0
# honey_production_prediction = (
#     temp_b_0 +
#     (0.001 * )
# )

def getOpenMeteo (api_param_latitude: str, api_value_latitude: str,
                  api_param_longitude: str, api_value_longitude: str,
                  api_param_start_date: str, api_value_start_date: str,
                  api_param_end_date: str, api_value_end_date: str,
                  api_param_type: str, api_value_type: str) -> dict:
    """Get Open-Meteo precipitation or max/min temp data.
    
    Data Unit:
        Sum of daily precipitation = millimeters
        Max air temperature at 2 meters above the ground = Celsius
        Min air temperature at 2 meters above the ground.= Celsius
    """
    api_url = (
        api_url_precipitation +
        '?' + api_param_latitude + '=' + api_value_latitude +
        '&' + api_param_longitude + '=' + api_value_longitude +
        '&' + api_param_start_date + '=' + api_value_start_date +
        '&' + api_param_end_date + '=' + api_value_end_date +
        '&' + api_param_type + '=' +  api_value_type
    )
    api_response = requests.get(api_url)
    return api_response.json()

def stripOpenMeteo (api_response: dict, api_value_type: str) -> list:
    """Strip unnecessary data from precipitation or max/min temp data.
    
    Strips unnecessary data and returns two arrays (date and temp) for
    faster iteration.
    """
    return (
        api_response[api_param_type]['time'],
        api_response[api_param_type][api_value_type]
    )

def parseOpenMeteo (dates: list, values: list, api_value_type: str) -> list:
    """Calculate monthly values from daily values."""
    if api_value_type==api_value_type_precipitation:
        # Parse monthly precipitation by summing the values.
            for i in range(len(dates)):
                date = datetime.strptime(dates[i], "%Y-%m-%d")
                print(date.month)
        
    # elif api_value_type==api_value_type_temp_max:
    #     # Parse monthly max temperature by finding the local max.
    # elif api_value_type==api_value_type_temp_min:
    #     # Parse monthly min temperature by finding the local min.


daily_precipitation = getOpenMeteo(
    api_param_latitude, api_value_latitude,
    api_param_longitude, api_value_longitude,
    api_param_start_date, api_value_start_date,
    api_param_end_date, api_value_end_date,
    api_param_type, api_value_type_precipitation
)
daily_precipitation_dates, daily_precipitation_values = stripOpenMeteo(
    daily_precipitation, api_value_type_precipitation
)
monthly_precipitation = parseOpenMeteo(
    daily_precipitation_dates,
    daily_precipitation_values,

)


# TODO: Implement Flask caching to improve performance and minimize API
# calls to Open-Meteo.

# TODO: [Long term] Set up a monthly routine to call these API's to update the database.
# This way, we can minimize API calls.

# TODO: Now, for prototyping purpose, get the factor values (precipitation, man/min temps)
# by calling API's. For production, however, implement PostGIS + Redis + Flask caching.
# Also, only save the average value (for precipitation), max value (for max temp), and min
# value (for min temp) to the database as only monthly values are required.
# That will be something along the line of ...(getOpenMeteo_sum(getOpenMeteo_precipitation))

# TODO: When calculating the sum, max, or min, exclude NaN values.