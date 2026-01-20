'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Tasarımı kendi fotoğrafımla özelleştirebilir miyim?",
    answer: "Evet, kesinlikle! Seçtiğiniz pakete göre kendi fotoğraflarınızı yükleyebilir ve tasarımı size özel hale getirebilirsiniz."
  },
  {
    question: "Tüm bilgilere en başta ihtiyacım var mı? Sonradan değişiklik yapabilir miyim?",
    answer: "Hayır, tüm bilgilere hemen ihtiyacınız yok. Davetiyeniz oluşturulduktan sonra da panelinizden dilediğiniz zaman güncellemeler yapabilirsiniz."
  },
  {
    question: "Davetiyemi ne zaman teslim alırım?",
    answer: "Seçtiğiniz pakete bağlı olarak, genellikle 48-72 saat içinde davetiyeniz hazırlanıp size sunulur."
  },
  {
    question: "Geri bildirim için alan var mı?",
    answer: "Evet, tasarım sürecinde size sunulan taslaklar üzerinde geri bildirimde bulunabilir ve revizyon talep edebilirsiniz."
  },
  {
    question: "LCV yanıtları nereye gidiyor?",
    answer: "Tüm LCV yanıtları size özel oluşturulan yönetim panelinde toplanır. Buradan anlık olarak katılım durumunu takip edebilirsiniz."
  },
  {
    question: "Davetiye ne kadar süre yayında kalır?",
    answer: "Davetiyeniz düğün tarihinden sonra belirli bir süre daha (genellikle 3-6 ay) yayında kalmaya devam eder."
  },
  {
    question: "Müziği değiştirebilir miyim?",
    answer: "Evet, davetiyenizde çalacak müziği kütüphanemizden seçebilir veya kendi istediğiniz bir parçayı kullanabilirsiniz."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div id="faq" className="w-full py-24 bg-[#FAF7F5]">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-script font-bold text-[#7B1113]">
          Sıkça Sorulan Sorular
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border border-[#7B1113]/10 rounded-xl overflow-hidden bg-[#F5F0EB]"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <span className="text-[#7B1113] font-medium text-lg pr-8">
                {faq.question}
              </span>
              <ChevronDown 
                className={`text-[#7B1113] transition-transform duration-300 shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-[#7B1113]/70 leading-relaxed border-t border-[#7B1113]/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
