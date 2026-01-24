'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Calendar, Heart, Share2, MapPin, Music, MessageCircle, Play, Check, FileText, Wallet, Users, Clock } from 'lucide-react'

export default function PhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const screens = [
    { icon: <Calendar size={24} />, label: 'Davetiye', delay: 0.2 },
    { icon: <MessageCircle size={24} />, label: 'RSVP', delay: 0.4 },
    { icon: <MapPin size={24} />, label: 'Harita', delay: 0.6 },
    { icon: <Music size={24} />, label: 'Müzik', delay: 0.8 },
    { icon: <Heart size={24} />, label: 'Favori', delay: 1.0 },
    { icon: <Share2 size={24} />, label: 'Paylaş', delay: 1.2 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const toggleVideo = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div id="features" className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative bg-background"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* iPhone Frame */}
            <div className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[600px] bg-[#7B1113] rounded-[2.5rem] sm:rounded-[3rem] shadow-xl ring-1 ring-[#7B1113]/50 p-2 sm:p-3">
              {/* Inner Black Bezel */}
              <div className="relative w-full h-full bg-black rounded-[2rem] sm:rounded-[2.5rem] p-1">
                {/* Screen */}
                <div className="relative w-full h-full bg-black rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 sm:h-7 bg-black rounded-b-xl sm:rounded-b-2xl z-30" />
                  
                  {/* Video Content */}
                  <div className="relative w-full h-full">
                  <video
                    autoPlay={isPlaying}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop"
                  >
                    <source src="/mockup-video.mov" type="video/mp4" />
                    Tarayıcınız video etiketini desteklemiyor.
                  </video>

                  {/* Play/Pause Overlay */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={toggleVideo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all z-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isPlaying ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/90 p-4 rounded-full"
                    >
                      <Play size={32} className="text-[#7B1113]" fill="currentColor" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>

              {/* Side Buttons */}
              <div className="absolute top-20 sm:top-24 -left-[5px] sm:-left-[6px] w-[5px] sm:w-[6px] h-8 sm:h-10 bg-[#7B1113] rounded-l-md" />
              <div className="absolute top-32 sm:top-40 -left-[5px] sm:-left-[6px] w-[5px] sm:w-[6px] h-12 sm:h-16 bg-[#7B1113] rounded-l-md" />
              <div className="absolute top-32 sm:top-40 -right-[5px] sm:-right-[6px] w-[5px] sm:w-[6px] h-16 sm:h-24 bg-[#7B1113] rounded-r-md" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-6xl mx-auto px-4"
          >
            <h4 className="text-xl sm:text-2xl md:text-3xl text-burgundy mb-3 tracking-tight font-bold" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
              Profesyonel Davetiye Deneyimi
            </h4>
            <p className="text-sm sm:text-base text-burgundy/80 leading-relaxed mb-6">
              Modern, şık ve etkileyici bir dijital davetiye deneyimi. Akıcı animasyonlar,
              sorunsuz RSVP ve tüm cihazlarda mükemmel görüntü.
            </p>

            <div className="text-left mb-6 sm:mb-8 bg-white/50 p-4 sm:p-6 rounded-xl border border-burgundy/10">
              <h5 className="font-semibold text-burgundy mb-3 sm:mb-4 text-base sm:text-lg">Dijital Düğün Davetiyenize Neler Dahil?</h5>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Kişiselleştirilmiş tasarım & tema",
                  "Onay mesajlı LCV (RSVP)",
                  "Konuk listesi + Excel/CSV'ye aktarma",
                  "Haritalar, program & önemli bilgiler",
                  "Seçtiğiniz 3 dilde kullanım imkanı"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-burgundy">
                    <Check size={14} className="text-burgundy shrink-0 mt-0.5 sm:hidden" />
                    <Check size={18} className="text-burgundy shrink-0 mt-0.5 hidden sm:block" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-10 sm:mt-12 text-center"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-burgundy mb-3 sm:mb-4 tracking-tight font-bold" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                Karşılaştırma
              </h3>
              <p className="text-sm sm:text-base font-bold text-burgundy mb-4 sm:mb-6">
                Kağıt Davetiyeler vs Dijital Davetiyeler
              </p>
              <p className="text-[11px] sm:text-xs text-burgundy/70 mb-6 sm:mb-8 leading-relaxed px-2">
                Kağıt davetiyeler harikadır. Her detayda gelenek, doku ve duygu... eğer bütçeniz izin veriyorsa.
                The Digital Yes, tasarım veya deneyimden ödün vermeden maliyetleri düşürmeyi ve her şeyi basitleştirmeyi tercih edenler için özenle hazırlanmış zarif bir dijital versiyondur.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-[#FAF7F5] p-4 sm:p-6 rounded-2xl border border-burgundy/10 shadow-sm">
                  <div className="text-[#7B1113] font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <FileText size={14} className="text-[#7B1113] sm:hidden" />
                      <FileText size={16} className="text-[#7B1113] hidden sm:block" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base">Kağıt Davetiye</div>
                      <div className="text-[10px] sm:text-xs font-normal text-gray-500">Yaklaşık fiyat 120 misafir</div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">Tasarım</span>
                      <span className="font-semibold text-gray-900">150₺</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">Baskı (130 adet)</span>
                      <span className="font-semibold text-gray-900">260₺</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">Zarflar + mühürleme</span>
                      <span className="font-semibold text-gray-900">104₺</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">Posta gönderimi</span>
                      <span className="font-semibold text-gray-900">120₺</span>
                    </div>
                  </div>

                  <div className="border-t border-burgundy/5 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-semibold text-xs sm:text-sm">Toplam maliyet</span>
                      <span className="text-lg sm:text-xl font-bold text-[#FF4444] line-through decoration-2 decoration-red-200">~634₺</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF7F5] p-4 sm:p-6 rounded-2xl border border-burgundy/20 relative overflow-hidden shadow-md">
                  <div className="text-[#7B1113] font-semibold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Smartphone size={14} className="text-[#7B1113] sm:hidden" />
                      <Smartphone size={16} className="text-[#7B1113] hidden sm:block" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base">Dijital Davetiye</div>
                      <div className="text-[10px] sm:text-xs font-normal text-gray-500">En iyi seçim</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[#7B1113] font-semibold text-xs sm:text-sm">
                        <Wallet size={10} className="sm:hidden" />
                        <Wallet size={14} className="hidden sm:block" />
                        <span>Tasarruf +400₺</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">Baskı veya kargo masrafı yok</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[#7B1113] font-semibold text-xs sm:text-sm">
                        <Users size={10} className="sm:hidden" />
                        <Users size={14} className="hidden sm:block" />
                        <span>Konuk paneli</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">Anlık onay takibi</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[#7B1113] font-semibold text-xs sm:text-sm">
                        <Smartphone size={10} className="sm:hidden" />
                        <Smartphone size={14} className="hidden sm:block" />
                        <span>Her zaman erişilebilir</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">Her konuğun telefonunda</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[#7B1113] font-semibold text-xs sm:text-sm">
                        <Clock size={10} className="sm:hidden" />
                        <Clock size={14} className="hidden sm:block" />
                        <span>Anında teslimat</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">48-72 saatte hazır</p>
                    </div>
                  </div>

                  <div className="border-t border-burgundy/10 pt-3 sm:pt-4">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-600 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Sadece</span>
                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-[#7B1113] leading-none">175₺</div>
                        <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1">Hepsi dahil</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 sm:mt-16 text-center px-2"
            >
              <h3 className="text-2xl sm:text-3xl text-burgundy mb-4 sm:mb-6 tracking-tight font-bold" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                Özel Dijital Özellikler
              </h3>

              <div className="bg-white/60 p-3 sm:p-4 md:p-8 rounded-2xl border border-burgundy/20">
                <div className="overflow-x-auto -mx-2 sm:-mx-4 px-2 sm:px-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-6 text-burgundy font-semibold text-xs sm:text-sm md:text-xl">Özellik</th>
                        <th className="text-center py-2 sm:py-3 px-2 sm:px-6 text-burgundy font-semibold text-xs sm:text-sm md:text-xl">Kağıt</th>
                        <th className="text-center py-2 sm:py-3 px-2 sm:px-6 text-burgundy font-semibold text-xs sm:text-sm md:text-xl">Dijital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'Veri güncellemeleri',
                        'RSVP takibi',
                        'Etkileşimli harita',
                        'Canlı geri sayım',
                        'Fotoğraf galerisi',
                        'Arka plan müziği'
                      ].map((feature, i) => (
                        <tr key={i} className="border-t border-burgundy/10">
                          <td className="text-left py-2 sm:py-4 px-2 sm:px-6 text-burgundy/80 font-medium text-[11px] sm:text-xs md:text-lg">{feature}</td>
                          <td className="text-center py-2 sm:py-4 px-2 sm:px-6">
                            <span className="inline-flex items-center justify-center w-5 h-5 sm:w-12 sm:h-12 rounded-full bg-burgundy/10 text-burgundy/40 font-bold text-[10px] sm:text-2xl">✕</span>
                          </td>
                          <td className="text-center py-2 sm:py-4 px-2 sm:px-6">
                            <div className="w-3 h-3 sm:w-7 sm:h-7 flex items-center justify-center mx-auto">
                              <Check size={12} className="text-burgundy sm:hidden" />
                              <Check size={20} className="text-burgundy hidden sm:block" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-burgundy/70 leading-relaxed">
                Her dijital davetiye kağıt kullanımından kaçınır ve karbon ayak izini azaltır.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
