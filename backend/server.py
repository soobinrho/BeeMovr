import requests
import numbers
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app
# Replace this with your bee value calculation logic
def calculate_bee_value(lat, lng):
    # Open-Meteo API defaults.
    api_url_precipitation = 'https://archive-api.open-meteo.com/v1/archive'

    # TODO: This is temporary hard-coded data generation.
    # Replace this with proper input and calculations.

    # Our model for predicting honey production requires precipitation, max
    # temperature, and min temperature for the past three months.
    # Source:
    #   "The Impact of Precipitation and Temperature on Honey Yield in
    #   the United States." 2020. Auburn University. Hayes Kent Grogan.
    temporary_today = datetime.today()
    temporary_today = temporary_today + relativedelta(months=-1)
    temporary_today_minus_three_months = temporary_today + relativedelta(months=-2)

    # Open-Meteo API parameters.
    # The latitude and longitude must be in the WGS84 system.
    # Precipitation's unit is mm.
    # Date's unit is yyyy-mm-dd.
    # Source:
    #   https://open-meteo.com/en/docs/historical-weather-api 
    api_param_latitude = 'latitude'
    api_value_latitude = str(lat)
    api_param_longitude = 'longitude'
    api_value_longitude = str(lng);
    api_param_start_date = 'start_date'
    api_value_start_date = str(temporary_today_minus_three_months.date())
    api_param_end_date = 'end_date'
    api_value_end_date = str(temporary_today.date())
    api_param_type = 'daily'
    api_value_type_precipitation = 'precipitation_sum'
    api_value_type_temp_max = 'temperature_2m_max'
    api_value_type_temp_min= 'temperature_2m_min'

    # TODO: For prototyping purposes, call API each time. However, for prod,
    # Create a PostGIS database, with the latitude / longitude a the key.
    daily_precipitation = getOpenMeteo(
        api_url_precipitation,
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
        api_value_type_precipitation
    )

    daily_temp_max = getOpenMeteo(
        api_url_precipitation,
        api_param_latitude, api_value_latitude,
        api_param_longitude, api_value_longitude,
        api_param_start_date, api_value_start_date,
        api_param_end_date, api_value_end_date,
        api_param_type, api_value_type_temp_max
    )
    daily_temp_max_dates, daily_temp_max_values = stripOpenMeteo(
        daily_temp_max, api_value_type_temp_max
    )
    monthly_temp_max = parseOpenMeteo(
        daily_temp_max_dates,
        daily_temp_max_values,
        api_value_type_temp_max
    )

    daily_temp_min = getOpenMeteo(
        api_url_precipitation,
        api_param_latitude, api_value_latitude,
        api_param_longitude, api_value_longitude,
        api_param_start_date, api_value_start_date,
        api_param_end_date, api_value_end_date,
        api_param_type, api_value_type_temp_min
    )
    daily_temp_min_dates, daily_temp_min_values = stripOpenMeteo(
        daily_temp_min, api_value_type_temp_min
    )
    monthly_temp_min = parseOpenMeteo(
        daily_temp_min_dates,
        daily_temp_min_values,
        api_value_type_temp_min
    )

    monthly_precipitation_values = list(monthly_precipitation.values())
    monthly_temp_max_values = list(monthly_temp_max.values())
    monthly_temp_min_values = list(monthly_temp_min.values())

    fillOpenMeteoMonthlyEmptyValues(monthly_precipitation_values)
    fillOpenMeteoMonthlyEmptyValues(monthly_temp_max_values)
    fillOpenMeteoMonthlyEmptyValues(monthly_temp_min_values)

    # Honey yield prediction model.
    # Source:
    #   "The Impact of Precipitation and Temperature on Honey Yield in
    #   the United States." 2020. Auburn University. Hayes Kent Grogan.
    honey_production_prediction = (
        (60.596) +
        (0.001 * monthly_precipitation_values[2] * 10) +
        (-0.001 * monthly_precipitation_values[1] * 10) +
        (0.056 * monthly_temp_min_values[2] * 10) +
        (0.027 * monthly_temp_min_values[1] * 10) +
        (-0.027 * monthly_temp_min_values[0] * 10) +
        (-0.034 * monthly_temp_max_values[2] * 10) +
        # (0.012 * monthly_temp_max_values[1] * 10) +
        # (0.032 * monthly_temp_max_values[0] * 10) +
        (0.465 * 0.074 + 2.28 * 0.012 + 9.679 * 0.04)
    )

    return honey_production_prediction

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

@app.route('/getBeeValue', methods=['GET'])
def get_bee_value():
    try:
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))

        bee_value = calculate_bee_value(lat, lng)

        response_data = {'value': bee_value}
        return jsonify(response_data), 200
    except ValueError:
        return jsonify({'error': 'Invalid input'}), 400

def getOpenMeteo (api_url_precipitation: str,
                  api_param_latitude: str, api_value_latitude: str,
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

def parseOpenMeteo (dates: list, values: list, api_value_type: str) -> dict:
    """Calculate monthly values from daily values."""
    if len(dates)==0:
        raise ValueError('[ERROR] OpenMeteo list length 0.')

    elif api_value_type==api_value_type_precipitation:
        # Parse monthly precipitation by summing the values.
        parsed = {}
        for i in range(len(dates)):
            date = datetime.strptime(dates[i], '%Y-%m-%d')
            value = values[i]

            # Consolidate all precipitation daily values into the
            # correct monthly value.
            if isinstance(value, numbers.Number) and value>0:
                date = date.strftime('%Y-%m')
                parsed[date] = parsed.get(date, 0) + value
        return parsed

    elif api_value_type==api_value_type_temp_max:
        # Parse monthly max temperature by finding the local max.
        parsed = {}
        value_previous = values[0]
        month_previous = -1
        for i in range(len(dates)):
            date = datetime.strptime(dates[i], '%Y-%m-%d')
            date = date.strftime('%Y-%m')
            value = values[i]

            # Consolidate all max temp daily values into the
            # correct monthly vales.
            if isinstance(value, numbers.Number) and value>=value_previous:
                parsed[date] = value
                value_previous = value
        return parsed

    elif api_value_type==api_value_type_temp_min:
        # Parse monthly min temperature by finding the local min.
        parsed = {}
        value_previous = values[0]
        month_previous = -1
        for i in range(len(dates)):
            date = datetime.strptime(dates[i], '%Y-%m-%d')
            date = date.strftime('%Y-%m')
            value = values[i]

            # Consolidate all min temp daily values into the
            # correct monthly vales.
            if isinstance(value, numbers.Number) and value<=value_previous:
                parsed[date] = value
                value_previous = value
        return parsed

def fillOpenMeteoMonthlyEmptyValues (monthly_values):
    """If the past three months of data doesn't exist, fill in with average.
    
        It's possible to have the past two or just one months of data.
        In that case, use an average of the existing values.
    """
    if len(monthly_values)==2:
        monthly_values.append(
            monthly_values[0] +
            monthly_values[1] / 2
        )
    elif len(monthly_values)==1:
        monthly_values.append(monthly_values[0])
        monthly_values.append(monthly_values[0])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
