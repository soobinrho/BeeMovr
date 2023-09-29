import { NextResponse, NextRequest } from 'next/server';
import { createMocks } from 'node-mocks-http';

import { GET } from '../../../../../../src/app/v1/weather/precipitation/route';

describe('/v1/weather/precipitation', () => {
  test('returns monthly precipitation', async () => {
    const { req, res }: { req: NextRequest; res: NextResponse } = createMocks({
      method: 'GET',
      query: { lat: '-1', lng: '-1', 'year-month': '1998-08' },
    });

    const api_response = await GET(req);

    expect(api_response.status).toBe(200);
    expect(await api_response.json()).toEqual({
      precipitation: '0.2',
    });
  });
});
