'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'

export default function CustomerReviews() {
  const ratingDistribution = [
    { stars: 5, count: 140, percentage: 94 },
    { stars: 4, count: 9, percentage: 6 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ]

  const reviews = [
    {
      initials: "MI",
      name: "Merve İ.",
      date: "20/01/2026",
      verified: true,
      title: "En güzel davetiye",
      content: "Davetiyemizden o kadar memnunuz ki, misafirlerimizin görmesi için sabırsızlanıyoruz! İletişim her an harikaydı ve tam istediğimiz gibi hazırlamak çok kolaydı, çok teşekkürler!!"
    },
    {
      initials: "AK",
      name: "Ahmet K.",
      date: "18/01/2026",
      verified: true,
      title: "Harika bir deneyim",
      content: "Dijital davetiye fikrine başta mesafeliydik ama sonuç beklentimizin çok ötesinde. Tasarım kalitesi ve kullanım kolaylığı mükemmel."
    }
  ]

  return (
    <div className="w-full py-16 sm:py-24 bg-[#FAF7F5]">
      {/* Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7B1113] tracking-tight font-bold" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
          Müşteri Yorumları
        </h2>

        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className="fill-[#FFB800] text-[#FFB800] sm:hidden" />
            ))}
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className="fill-[#FFB800] text-[#FFB800] hidden sm:block" />
            ))}
            <span className="text-lg sm:text-xl font-medium text-[#7B1113] ml-1.5 sm:ml-2">4.94 / 5</span>
          </div>
          <p className="text-[#7B1113]/60 text-xs sm:text-sm">149 değerlendirmeye göre</p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 space-y-6 sm:space-y-8">
        {/* Rating Summary Card */}
        <motion.div
          className="bg-[#F5F0EB] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#7B1113]/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {ratingDistribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-0.5 sm:gap-1 w-16 sm:w-24 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10} className={`${i < row.stars ? 'fill-[#FFB800] text-[#FFB800]' : 'text-[#EAE4DD]'} sm:hidden`}
                    />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${i < row.stars ? 'fill-[#FFB800] text-[#FFB800]' : 'text-[#EAE4DD]'} hidden sm:block`}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 sm:h-3 bg-[#EAE4DD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7B1113] rounded-full"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <div className="w-6 sm:w-8 text-right text-[10px] sm:text-sm text-[#7B1113]/60 font-medium shrink-0">
                  {row.count}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 sm:py-4 bg-[#7B1113] text-white rounded-lg font-medium tracking-wide hover:bg-[#593E3E] transition-colors uppercase text-xs sm:text-sm">
            Yorum Yap
          </button>
        </motion.div>

        {/* Individual Reviews */}
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0EB] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#7B1113]/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EAE4DD] flex items-center justify-center text-[#7B1113] font-medium text-sm sm:text-lg shrink-0">
                    {review.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-semibold text-[#7B1113] text-sm sm:text-base">{review.name}</span>
                      {review.verified && (
                        <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] bg-[#E8F5E9] text-[#2E7D32] px-1.5 sm:px-2 py-0.5 rounded-full font-medium shrink-0">
                          <CheckCircle2 size={8} className="sm:hidden" />
                          <CheckCircle2 size={10} className="hidden sm:block" />
                          <span className="hidden sm:inline">Doğrulanmış</span>
                          <span className="sm:hidden">Doğrulanmış</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-[#FFB800] text-[#FFB800] sm:hidden" />
                      ))}
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#FFB800] text-[#FFB800] hidden sm:block" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-[#7B1113]/40 shrink-0">{review.date}</span>
              </div>

              <h4 className="text-base sm:text-lg font-serif font-medium text-[#7B1113] mb-1.5 sm:mb-2">
                {review.title}
              </h4>
              <p className="text-[#7B1113]/70 text-xs sm:text-sm leading-relaxed">
                {review.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
