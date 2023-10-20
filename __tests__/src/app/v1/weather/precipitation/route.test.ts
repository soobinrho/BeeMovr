import { getWeather } from '@/app/v1/components/open-meteo-api';
import { api_type_precipitation } from '@/app/v1/components/open-meteo-api';

describe('/v1/weather/precipitation', () => {
  test('returns monthly precipitation', async () => {
    const api_type = api_type_precipitation;

    const lng = '-1';
    const lat = '-1';
    const startYearMonth = '1998-08';
    const endYearMonth = '1998-09';

    const api_response = await getWeather({
      api_lng: lng,
      api_lat: lat,
      api_startYearMonth: startYearMonth,
      api_endYearMonth: endYearMonth,
      api_type: api_type,
    });

    expect(api_response).toStrictEqual({
      [startYearMonth]: expect.any(String),
      [endYearMonth]: expect.any(String),
    });
  });
});
