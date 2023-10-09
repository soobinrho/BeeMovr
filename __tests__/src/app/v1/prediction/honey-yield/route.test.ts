import { calculateHoneyYield } from '../../../../../../src/app/v1/prediction/honey-yield/calculate-honey-yield';

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

    expect(api_response).toEqual('77.49192999999998');
  });
});
