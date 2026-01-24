'use client'

import SocialProof from './SocialProof'
import LanguageSupport from './LanguageSupport'
import SaveTheDateModal from './SaveTheDateModal'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HeroContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6 sm:space-y-8">
      <SaveTheDateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <motion.div
        className="space-y-4 sm:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-burgundy leading-[1.1] tracking-tight px-2 md:px-0" style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontWeight: 700 }}>
          Aşk Hikayenizi<br className="hidden sm:block" /> Dijitalleştirin
        </h1>
        <h2 className="text-base sm:text-lg text-burgundy/90 leading-relaxed font-light max-w-2xl">
          Hayalinizdeki düğün davetiyesini dakikalar içinde tasarlayın. LCV takibi, müzik ve size özel detaylarla sevdiklerinizi şaşırtın. <span className="font-medium">Üstelik hiçbir gizli ücret veya abonelik yok.</span>
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button className="px-6 py-3 sm:px-8 sm:py-4 bg-[#7b1113] text-white rounded-lg hover:opacity-90 transition-colors font-medium text-center">
          Ücretsiz Başla
        </button>
        <button className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-burgundy text-burgundy rounded-lg hover:bg-burgundy-light transition-colors font-medium text-center">
          Örnekleri İncele
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-burgundy text-burgundy rounded-lg hover:bg-burgundy-light transition-colors font-medium text-center"
        >
          Hatırlatıcı Ekle
        </button>
      </motion.div>

      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 text-burgundy">
          <Check size={20} className="text-burgundy" />
          <span>Ücretsiz deneme</span>
        </div>
        <div className="flex items-center gap-2 text-burgundy">
          <Check size={20} className="text-burgundy" />
          <span>Abonelik yok</span>
        </div>
        <div className="flex items-center gap-2 text-burgundy">
          <Check size={20} className="text-burgundy" />
          <span>Anında kurulum</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <SocialProof />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <LanguageSupport />
      </motion.div>
    </div>
  )
}
