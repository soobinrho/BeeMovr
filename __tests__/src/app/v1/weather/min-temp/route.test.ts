import { getWeather } from '../../../../../../src/app/v1/weather/open-meteo-api';

describe('/v1/weather/min-temp', () => {
  test('returns monthly minimum temperature', async () => {
    const api_type = 'temperature_2m_min';

    const lng = '-1';
    const lat = '-1';
    const yearMonth = '1998-08';

    const api_response = await getWeather({
      api_lng: lng,
      api_lat: lat,
      api_yearMonth: yearMonth,
      api_type: api_type,
    });

    expect(api_response).toEqual('22.6');
  });
});
