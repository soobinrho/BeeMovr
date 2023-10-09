import { calculateHoneyYield } from '../../../../../../src/app/v1/components/calculate-honey-yield';

describe('/v1/prediction/honey-yield', () => {
  test('returns honey yield prediction value', async () => {
    const lng = '-1';
    const lat = '-1';
    const yearMonth = '1998-08';

    const api_response = await calculateHoneyYield({
      api_lng: lng,
      api_lat: lat,
      api_yearMonth: yearMonth,
    });

    const api_response_key_honeyYield = 'honey-yield';
    const api_response_key_precipitation = 'precipitation';
    const api_response_key_maxTemp = 'max-temp';
    const api_response_key_minTemp = 'min-temp';

    expect(api_response).toStrictEqual({
      [api_response_key_honeyYield]: expect.any(Object),
      [api_response_key_precipitation]: expect.any(Object),
      [api_response_key_maxTemp]: expect.any(Object),
      [api_response_key_minTemp]: expect.any(Object),
    });
  });
});
