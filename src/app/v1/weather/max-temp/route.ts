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