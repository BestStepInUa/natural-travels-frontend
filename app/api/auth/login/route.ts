import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { api } from '@/app/api/api'
import { ApiError, createErrorResponce, setAuthCookiesFromHeaders } from '@/app/api/_utils/utils'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { data, status, headers } = await api.post('auth/login', body)

        const cookieStore = await cookies()
        const setCookie = headers['set-cookie']

        if (setAuthCookiesFromHeaders(cookieStore, setCookie)) {
            return NextResponse.json(data, { status })
        }

        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    } catch (error) {
        return createErrorResponce(error as ApiError)
    }
}