import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { GET } from "../../../../../../src/app/v1/weather/precipitation/route";
import { createMocks } from "node-mocks-http";

describe("/v1/weather/precipitation", () => {
  test("returns precipitation data. Note: this is failing now. Suspected cause: Next.js 13 server components not being compatible with Jest yet?", async () => {
    const { req, res }: { req: NextRequest; res: NextResponse } = createMocks({
      method: "GET",
      query: { lat: "1", lng: "2", "year-month": "2023-08" },
    });

    const api_response = await GET(req);

    expect(api_response.status).toBe(200);
    expect(await api_response.json()).toEqual([{ precipitation: "32.9" }]);
  });
});
