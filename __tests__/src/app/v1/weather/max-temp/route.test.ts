import { getWeather } from '../../../../../../src/app/v1/weather/open-meteo-api';

describe('/v1/weather/max-temp', () => {
  test('returns monthly maximum temperature', async () => {
    const api_type = 'temperature_2m_max';

    const lng = '-1';
    const lat = '-1';
    const yearMonth = '1998-08';

    const api_response = await getWeather({
      api_lng: lng,
      api_lat: lat,
      api_yearMonth: yearMonth,
      api_type: api_type,
    });

    expect(api_response).toEqual('24.2');
  });
});
