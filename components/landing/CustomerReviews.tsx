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
    <div className="w-full py-24 bg-[#FAF7F5]">
      {/* Header */}
      <motion.div 
        className="text-center mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-script font-bold text-[#7B1113]">
          Müşteri Yorumları
        </h2>
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className="fill-[#FFB800] text-[#FFB800]" />
            ))}
            <span className="text-xl font-medium text-[#7B1113] ml-2">4.94 / 5</span>
          </div>
          <p className="text-[#7B1113]/60 text-sm">149 değerlendirmeye göre</p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* Rating Summary Card */}
        <motion.div 
          className="bg-[#F5F0EB] rounded-2xl p-8 border border-[#7B1113]/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="space-y-3 mb-8">
            {ratingDistribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-24">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < row.stars ? 'fill-[#FFB800] text-[#FFB800]' : 'text-[#EAE4DD]'}`} 
                    />
                  ))}
                </div>
                <div className="flex-1 h-3 bg-[#EAE4DD] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#7B1113] rounded-full"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <div className="w-8 text-right text-sm text-[#7B1113]/60 font-medium">
                  {row.count}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-[#7B1113] text-white rounded-lg font-medium tracking-wide hover:bg-[#593E3E] transition-colors uppercase text-sm">
            Yorum Yap
          </button>
        </motion.div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0EB] rounded-2xl p-8 border border-[#7B1113]/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EAE4DD] flex items-center justify-center text-[#7B1113] font-medium text-lg">
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#7B1113]">{review.name}</span>
                      {review.verified && (
                        <div className="flex items-center gap-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full font-medium">
                          <CheckCircle2 size={10} />
                          Doğrulanmış
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#FFB800] text-[#FFB800]" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#7B1113]/40">{review.date}</span>
              </div>

              <h4 className="text-lg font-serif font-medium text-[#7B1113] mb-2">
                {review.title}
              </h4>
              <p className="text-[#7B1113]/70 text-sm leading-relaxed">
                {review.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
