import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { calculateHoneyYield } from "./calculate-honey-yield";

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const honeyYield = calculateHoneyYield(
    queryParams.get("lat"),
    queryParams.get("lng")
  );

  // const res = await fetch('https://...' {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })
  // const data = await res.json()
  // return NextResponse.json({ data })
  return NextResponse.json({ honeyYield: honeyYield });
}

// TODO: Use querying to get honey yield prediction values.
// e.g. https://beemovr.com/v1/honey?precipitation=123&max-temp=12&min-temp=0
