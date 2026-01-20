'use client'

import { motion } from 'framer-motion'
import { Wand, MapPin } from 'lucide-react'

const themes = [
  {
    id: 1,
    title: "Mekan Odaklı",
    description: "Düğün mekanınızı size özel bir sanat eserine dönüştürüyoruz (illüstrasyon ve video eklentisi içerir)",
    bg: "bg-neutral-800",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    gif: "", // Buraya GIF url'si gelecek
    hasTag: true,
    tagText: "Mekanınıza özel illüstrasyon"
  },
  {
    id: 2,
    title: "Tatlı Aşk",
    description: "Düğün pastanız aşk hikayenizin başrolünde",
    bg: "bg-neutral-800",
    gif: "", // Buraya GIF url'si gelecek
    hasTag: false,
    icon: "🍰"
  },
  {
    id: 3,
    title: "Maceraperest",
    description: "Aşkı sonsuz bir macera olarak görenler için",
    bg: "bg-neutral-600",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    gif: "", // Buraya GIF url'si gelecek
    hasTag: false
  },
  {
    id: 4,
    title: "Floral",
    description: "Kutlamanız için çiçeklerin zarafeti",
    bg: "bg-neutral-500",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
    gif: "", // Buraya GIF url'si gelecek
    hasTag: false
  },
  {
    id: 5,
    title: "Minimalist",
    description: "Renkleriniz ve yazı tiplerinizle tamamen özelleştirilebilir",
    bg: "bg-gray-300",
    gif: "", // Buraya GIF url'si gelecek
    hasTag: false
  }
]

export default function HeroImage() {
  return (
    <div id="designs" className="w-full py-16">
      <motion.div 
        className="text-center mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 text-sm tracking-widest text-[#7B1113] uppercase font-medium">
          <Wand size={14} />
          <span>Özel Tasarımlar</span>
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-script font-bold text-[#7B1113] leading-tight px-4 md:px-0">
          Tarzınızı Seçin,<br />
          <span className="italic">Benzersiz Kılın</span>
        </h2>
        <p className="text-gray-600">Her tema aşk hikayenizi anlatmak için tasarlandı</p>
      </motion.div>

      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative h-[400px] min-w-[280px] md:min-w-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 snap-center ${theme.bg}`}
          >
            {/* Background Media (GIF or Image) */}
            {theme.gif ? (
              <div className="absolute inset-0">
                <img 
                  src={theme.gif} 
                  alt={theme.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : theme.image ? (
              <div className="absolute inset-0">
                <img 
                  src={theme.image} 
                  alt={theme.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : null}
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col">
              {theme.hasTag && (
                <div className="absolute top-4 left-4 right-4 bg-[#FAF7F5] text-[#7B1113] text-[10px] font-medium py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm">
                  <MapPin size={10} />
                  {theme.tagText}
                </div>
              )}

              <div className="mt-auto text-white">
                <div className="text-xs font-medium opacity-60 mb-2">{theme.id}</div>
                
                {theme.icon && (
                  <div className="mb-4">
                    {/* SVG representation of cake/icon would go here */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12 text-white/90" strokeWidth="1">
                      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                      <path d="M2 21h20" />
                      <path d="M7 8v2" />
                      <path d="M12 8v2" />
                      <path d="M17 8v2" />
                      <path d="M7 4h.01" />
                      <path d="M12 4h.01" />
                      <path d="M17 4h.01" />
                    </svg>
                  </div>
                )}

                <h3 className="text-2xl font-serif mb-2">{theme.title}</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  {theme.description}
                </p>

                <button className="flex items-center gap-2 text-xs font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                  <Wand size={12} />
                  Demoyu İncele
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
