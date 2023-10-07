import { NextRequest, NextResponse } from 'next/server';
import { createMocks } from 'node-mocks-http';

import { GET } from '../../../../../../src/app/v1/prediction/honey-yield/route';

describe('/v1/prediction/honey-yield', () => {
  test('returns honey yield prediction', async () => {
    const { req, res }: { req: NextRequest; res: NextResponse } = createMocks({
      method: 'GET',
      query: { lng: '-1', lat: '-1', 'year-month': '1998-08' },
    });

    const api_response = await GET(req);

    expect(api_response.status).toBe(200);
    expect(await api_response.json()).toEqual({
      'honey-yield': '77.49192999999998',
    });
  });
});
