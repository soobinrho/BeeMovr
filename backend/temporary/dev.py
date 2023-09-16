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

def getOpenMeteo_precipitation ():
    """Get Open-Meteo precipitation data.
    
    Data Unit:
        Sum of daily precipitation. (millimeters)
    """
    api_url = (
        api_url_precipitation +
        '?' + api_param_latitude + '=' + api_value_latitude +
        '&' + api_param_longitude + '=' + api_value_longitude +
        '&' + api_param_start_date + '=' + api_value_start_date +
        '&' + api_param_end_date + '=' + api_value_end_date +
        '&' + api_param_type + '=' +  api_value_type_precipitation
    )
    api_response = requests.get(api_url)
    return api_response.json()
              
def getOpenMeteo_temp_max ():
    """Get Open-Meteo maximum temperature data.
    
    Data Unit:
        Air temperature at 2 meters above the ground. (millimeters)
    """
    api_url = (
        api_url_precipitation +
        '?' + api_param_latitude + '=' + api_value_latitude +
        '&' + api_param_longitude + '=' + api_value_longitude +
        '&' + api_param_start_date + '=' + api_value_start_date +
        '&' + api_param_end_date + '=' + api_value_end_date +
        '&' + api_param_type + '=' +  api_value_type_temp_max
    )
    api_response = requests.get(api_url)
    return api_response.json()

def getOpenMeteo_temp_min ():
    """Get Open-Meteo minimum temperature data.
    
    Data Unit:
        Air temperature at 2 meters above the ground. (millimeters)
    """
    api_url = (
        api_url_precipitation +
        '?' + api_param_latitude + '=' + api_value_latitude +
        '&' + api_param_longitude + '=' + api_value_longitude +
        '&' + api_param_start_date + '=' + api_value_start_date +
        '&' + api_param_end_date + '=' + api_value_end_date +
        '&' + api_param_type + '=' +  api_value_type_temp_min
    )

    api_response = requests.get(api_url)
    return api_response.json()

def parseOpenMeteo_temp_min (api_response):
    """Strip unnecessary data from Open-Meteo minimum temperature data.
    
    Strips unnecessary data and returns two arrays (date and temp) for
    faster iteration.
    Example:
        parseOpenMeteo_temp_min(getOpenMeteo_temp_min())
    """
    return (
        api_response[api_param_type]['time'],
        api_response[api_param_type][api_value_type_temp_min]
    )

# TODO: Delete this notes
# api_param_type = "daily"
# api_value_type_precipitation = "precipitation_sum"
# api_value_type_temp_max = "temperature_2m_max"
# api_value_type_temp_min= "temperature_2m_min"


def getOpenMeteo_max (api_response):
    """Strip unnecessary data from Open-Meteo maximum temperature data.
    
    Strips unnecessary data and returns two arrays (date and temp) for
    faster iteration.
    Example:
        parseOpenMeteo_temp_max(getOpenMeteo_temp_max()))
    """
    return (
        api_response[api_param_type]['time'],
        api_response[api_param_type][api_value_type_temp_max]
    )

def getOpenMeteo_sum (api_response):
    """Strip unnecessary data from Open-Meteo precipitation data.
    
    Strips unnecessary data and returns two arrays (date and
    precipitation) for faster iteration.
    Example:
        parseOpenMeteo_sum(getOpenMeteo_precipitation())
    """
    return (
        api_response[api_param_type]['time'],
        api_response[api_param_type][api_value_type_precipitation]
    )

# print(type(getOpenMeteo_temp_min()))
print(parseOpenMeteo_temp_min(getOpenMeteo_temp_min()))

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