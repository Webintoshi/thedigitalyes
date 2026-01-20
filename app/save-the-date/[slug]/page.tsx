
import { getCoupleBySlug } from '@/lib/save-the-date'
import SaveTheDateClient from './client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const couple = await getCoupleBySlug(slug)

  if (!couple) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F5] text-[#7B1113]">
        <div className="text-center p-8">
          <h1 className="text-6xl font-serif font-bold mb-4 opacity-20">404</h1>
          <h2 className="text-2xl font-bold mb-2">Davetiye Bulunamadı</h2>
          <p className="text-[#7B1113]/60">Aradığınız sayfa mevcut değil veya link hatalı olabilir.</p>
        </div>
      </div>
    )
  }

  return <SaveTheDateClient couple={couple} />
}
