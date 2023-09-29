import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { GET } from "../../../../../../src/app/v1/weather/min-temp/route";
import { createMocks } from "node-mocks-http";

describe("/v1/weather/min-temp", () => {
  test("returns monthly minimum temperature", async () => {
    const { req, res }: { req: NextRequest; res: NextResponse } = createMocks({
      method: "GET",
      query: { lat: "-1", lng: "-1", "year-month": "1998-08" },
    });

    const api_response = await GET(req);

    expect(api_response.status).toBe(200);
    expect(await api_response.json()).toEqual({
      "min-temp": "22.7",
    });
  });
});
