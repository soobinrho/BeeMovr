import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isValidLatLng } from "../../weather/open-meteo-api";
import { calculateHoneyYield } from "./calculate-honey-yield";

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  if (!isValidLatLng({ lat: lat, lng: lng })) {
    return NextResponse.json({
      "honey-yield":
        "[ERROR] The latitude and longitude values must be a valid number.",
    });
  }

  const api_response = calculateHoneyYield({
    lat: queryParams.get("lat"),
    lng: queryParams.get("lng"),
  });

  return NextResponse.json({ "honey-yield": api_response });
}
