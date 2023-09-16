import requests

#
# To predict honey production, we need precipitation, minimum temp, and
# maximum temp of the past four months.
#

# Open-Meteo API defaults.
api_url_precipitation = "https://archive-api.open-meteo.com/v1/archive"

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
api_value_start_date = "2023-01-01"
api_param_end_date = "end_date"
api_value_end_date = "2023-09-16"
api_param_type = "daily"
api_value_type_precipitation = "precipitation_sum"
api_value_type_temp_max = "temperature_2m_max"      # Air temperature at 2 meters above ground (Celsius)
api_value_type_temp_min= "temperature_2m_min"       # (Celsius)

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
    api_response = requests.get(api_url_precipitation)
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
    api_response = requests.get(api_url_precipitation)
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
    api_response = requests.get(api_url_precipitation)
    return api_response.json()

# TODO: Implement Flask caching to improve performance and minimize API
# calls to Open-Meteo.

# TODO: [Long term] Set up a monthly routine to call these API's to update the database.
# This way, we can minimize API calls.