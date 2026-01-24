'use client'

import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'

export default function DigitalEnvelope() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full py-16"
    >
      <div className="bg-[#F0EBE6] rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto shadow-sm">
        <div className="relative shrink-0">
          <div className="w-52 h-52 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-white flex items-center justify-center bg-white overflow-hidden">
            <img 
              src="/wax-seal.jpg" 
              alt="Mühürlü Zarf" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#E8DCCF] blur-3xl -z-10 transform scale-125 opacity-60" />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#7B1113]/10 text-[#7B1113] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
            Ücretsiz tasarım dahil
          </div>

          <h3 className="text-4xl sm:text-5xl md:text-[3.5rem] leading-tight text-[#7B1113] tracking-tight font-bold" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
            Mühürlü dijital zarf
          </h3>

          <p className="text-[#7B1113]/80 leading-relaxed max-w-lg text-[15px]">
            Seçtiğiniz renkte ve baş harflerinizden oluşan zarif bir balmumu mühür ile dijital zarfınızı ücretsiz tasarlıyoruz. Davetiyeniz açılırken gerçek bir zarf hissi yaşatın.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-xs font-medium text-[#7B1113] tracking-wide uppercase pt-2">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#7B1113]" />
              <span>Özel renk seçimi</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#7B1113]" />
              <span>Size özel baş harfler</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
