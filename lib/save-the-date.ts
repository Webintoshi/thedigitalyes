import { supabase, SaveTheDate } from './supabase'

export interface CoupleData {
  slug: string
  partner1: string
  partner2: string
  date: string // ISO format YYYY-MM-DD
  time: string // HH:mm
  venue: string
  message: string
}

// Demo data for development (used when Supabase is not configured)
const demoData: CoupleData[] = [
  {
    slug: 'ayse-ahmet-2025',
    partner1: 'Ayşe',
    partner2: 'Ahmet',
    date: '2025-05-20',
    time: '19:00',
    venue: 'Çırağan Sarayı, İstanbul',
    message: 'Bu mutlu günümüzde yanımızda olmanız dileğiyle...'
  },
  {
    slug: 'zeynep-can-2024',
    partner1: 'Zeynep',
    partner2: 'Can',
    date: '2024-09-15',
    time: '18:30',
    venue: 'Swissotel The Bosphorus',
    message: 'Aşkımızı kutlarken sizleri de aramızda görmek istiyoruz.'
  }
]

// Check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your_supabase'))
}

// Get couple by slug - tries Supabase first, falls back to demo data
export async function getCoupleBySlug(slug: string): Promise<CoupleData | undefined> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('save_the_dates')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return undefined
      }

      if (data) {
        return {
          slug: data.slug,
          partner1: data.partner1,
          partner2: data.partner2,
          date: data.date,
          time: data.time,
          venue: data.venue || '',
          message: data.message || ''
        }
      }
    } catch (err) {
      console.error('Error fetching from Supabase:', err)
    }
  }

  // Fallback to demo data
  return demoData.find(c => c.slug === slug)
}

// Create new save-the-date entry
export async function createSaveTheDate(data: Omit<CoupleData, 'slug'>): Promise<{ slug: string } | { error: string }> {
  // Generate unique slug with timestamp
  const slug = `${data.partner1.toLowerCase()}-${data.partner2.toLowerCase()}-${new Date(data.date).getFullYear()}-${Date.now()}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')

  if (!isSupabaseConfigured()) {
    return { error: 'Supabase yapılandırılmamış. Lütfen .env.local dosyasını kontrol edin.' }
  }

  try {
    const { error } = await supabase
      .from('save_the_dates')
      .insert([{ ...data, slug }])

    if (error) {
      return { error: error.message }
    }

    return { slug }
  } catch (err) {
    return { error: 'Beklenmeyen bir hata oluştu.' }
  }
}

// Calendar URL generators
export function getGoogleCalendarUrl(couple: CoupleData): string {
  const startDate = new Date(`${couple.date}T${couple.time}`).toISOString().replace(/-|:|\.\d\d\d/g, '')
  const endDate = new Date(new Date(`${couple.date}T${couple.time}`).getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '')

  const title = encodeURIComponent(`${couple.partner1} & ${couple.partner2} Düğünü`)
  const details = encodeURIComponent(couple.message)
  const location = encodeURIComponent(couple.venue)

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`
}

export function generateIcsContent(couple: CoupleData): string {
  const startDate = new Date(`${couple.date}T${couple.time}`).toISOString().replace(/-|:|\.\d\d\d/g, '')
  const endDate = new Date(new Date(`${couple.date}T${couple.time}`).getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Digital Yes//Save The Date//TR
BEGIN:VEVENT
UID:${couple.slug}@thedigitalyes.com
DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, '')}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${couple.partner1} & ${couple.partner2} Düğünü
DESCRIPTION:${couple.message}
LOCATION:${couple.venue}
END:VEVENT
END:VCALENDAR`
}
