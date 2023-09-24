import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // const res = await fetch('https://...' {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // const data = await res.json()
    // return NextResponse.json({ data })
    return NextResponse.json({
        'TestName': 'TestValue'
    })
}

// TODO: Use querying to get honey yield prediction values.
// e.g. https://beemovr.com/v1/honey?precipitation=123&max-temp=12&min-temp=0