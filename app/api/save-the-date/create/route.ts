import { NextRequest, NextResponse } from 'next/server'
import { createSaveTheDate } from '@/lib/save-the-date'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { partner1, partner2, date, time, venue, message } = body

        // Validation
        if (!partner1 || !partner2 || !date || !time) {
            return NextResponse.json(
                { error: 'Partner isimleri, tarih ve saat zorunludur.' },
                { status: 400 }
            )
        }

        const result = await createSaveTheDate({
            partner1,
            partner2,
            date,
            time,
            venue: venue || '',
            message: message || ''
        })

        if ('error' in result) {
            return NextResponse.json({ error: result.error }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            slug: result.slug,
            url: `/save-the-date/${result.slug}`
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Sunucu hatası oluştu.' },
            { status: 500 }
        )
    }
}
