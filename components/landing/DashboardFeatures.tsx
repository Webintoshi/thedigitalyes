'use client'

import { motion } from 'framer-motion'
import { Users, Utensils, BarChart3, Download, CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: "Katılım Kontrolü",
    description: "Kimin katıldığını net bir şekilde görerek gerçek zamanlı LCV onaylarını takip edin."
  },
  {
    icon: Utensils,
    title: "Beslenme Tercihleri",
    description: "Misafirlerinizin alerji, özel diyet ve yemek tercihlerini kolayca yönetin."
  },
  {
    icon: BarChart3,
    title: "Net İstatistikler",
    description: "Davetli durumunu ve onay sürecini bir bakışta grafiklerle görselleştirin."
  },
  {
    icon: Download,
    title: "Listelerinizi Dışa Aktarın",
    description: "Tüm davetli listesini ve detayları Excel/PDF formatlarında indirin."
  }
]

export default function DashboardFeatures() {
  return (
    <div className="w-full pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#FAF7F5] p-8 rounded-2xl border border-[#7B1113]/5 hover:border-[#7B1113]/20 transition-colors group"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#EAE4DD] flex items-center justify-center shrink-0 group-hover:bg-[#E6DDD5] transition-colors">
                <feature.icon className="text-[#7B1113]" size={24} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-medium text-[#7B1113]">
                  {feature.title}
                </h3>
                <p className="text-[#7B1113]/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-2 bg-[#EAE4DD]/50 px-6 py-3 rounded-full border border-[#7B1113]/10 text-[#7B1113] text-sm font-medium">
          <CheckCircle2 size={16} />
          <span>Düğün planlayıcınızla paylaşımlı erişim</span>
        </div>
      </motion.div>
    </div>
  )
}
