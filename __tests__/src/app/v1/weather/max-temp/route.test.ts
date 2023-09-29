import { NextRequest, NextResponse } from 'next/server';
import { createMocks } from 'node-mocks-http';

import { GET } from '../../../../../../src/app/v1/weather/max-temp/route';

describe('/v1/weather/max-temp', () => {
  test('returns monthly maximum temperature', async () => {
    const { req, res }: { req: NextRequest; res: NextResponse } = createMocks({
      method: 'GET',
      query: { lat: '-1', lng: '-1', 'year-month': '1998-08' },
    });

    const api_response = await GET(req);

    expect(api_response.status).toBe(200);
    expect(await api_response.json()).toEqual({
      'max-temp': '24.3',
    });
  });
});
