import { calculateHoneyYield } from '@/app/api/v1/components/calculate-honey-yield';
import {
  api_response_key_honeyYield,
  api_response_key_maxTemp,
  api_response_key_minTemp,
  api_response_key_precipitation,
} from '@/app/api/v1/components/open-meteo-api';

describe('/api/v1/prediction/honey-yield', () => {
  test('returns honey yield prediction value', async () => {
    const lng = '-1';
    const lat = '-1';
    const yearMonth = '1998-08';

    const api_response = await calculateHoneyYield({
      api_lng: lng,
      api_lat: lat,
      api_yearMonth: yearMonth,
    });

    expect(api_response).toStrictEqual({
      [api_response_key_honeyYield]: expect.any(Object),
      [api_response_key_precipitation]: expect.any(Object),
      [api_response_key_maxTemp]: expect.any(Object),
      [api_response_key_minTemp]: expect.any(Object),
    });
  });
});
