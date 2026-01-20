'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Gem, Star, HelpCircle, ArrowRight, Wallet, Users, Clock, Smartphone } from 'lucide-react'

export default function PricingSection() {
  return (
    <div id="pricing" className="w-full py-24 bg-[#FAF7F5]">
      {/* Header */}
      <motion.div
        className="text-center mb-16 space-y-6 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-sm tracking-[0.2em] text-[#7B1113] uppercase font-medium">
          DAVETİYENİZİ ÖZELLEŞTİRİN
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-script font-bold text-[#7B1113]">
          Planınızı seçin
        </h2>
        <p className="text-[#7B1113]/60">
          Hepsi baş harflerinizle özel zarf animasyonu içerir
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-[#7B1113] italic font-medium">
          <span>♡</span>
          <span>Hayalinizdeki davetiyeyi oluşturmaya bir adım uzaktasınız</span>
          <span>♡</span>
        </div>

        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={14} className="fill-[#FFB800] text-[#FFB800]" />
            ))}
            <span className="text-xs text-[#7B1113]/60 ml-2">4.9/5 · 105 değerlendirme</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-[#7B1113]/60 hover:text-[#7B1113] transition-colors">
            <HelpCircle size={12} />
            <span>Sıkça sorulan sorular</span>
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Experience Plan */}
        {/* Digital Invitation Plan (Redesigned) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#FAF7F5] rounded-3xl p-8 border-2 border-[#7B1113] shadow-xl"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-[#7B1113]/10 shadow-sm shrink-0">
              <Smartphone size={28} className="text-[#7B1113]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#7B1113] mb-1">Dijital Davetiye</h3>
              <p className="text-[#7B1113]/60 text-sm font-medium">En iyi seçim</p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 mb-10">
            {/* Feature 1 */}
            <div className="flex flex-col items-start text-left space-y-1">
              <div className="flex items-center gap-3 text-[#7B1113] font-bold">
                <Wallet size={20} className="shrink-0" />
                <span>Tasarruf +400₺</span>
              </div>
              <p className="text-xs text-[#7B1113]/60 pl-8 leading-relaxed">Baskı veya kargo masrafı yok</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start text-left space-y-1">
              <div className="flex items-center gap-3 text-[#7B1113] font-bold">
                <Users size={20} className="shrink-0" />
                <span>Konuk paneli</span>
              </div>
              <p className="text-xs text-[#7B1113]/60 pl-8 leading-relaxed">Anlık onay takibi</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start text-left space-y-1">
              <div className="flex items-center gap-3 text-[#7B1113] font-bold">
                <Smartphone size={20} className="shrink-0" />
                <span>Her zaman erişilebilir</span>
              </div>
              <p className="text-xs text-[#7B1113]/60 pl-8 leading-relaxed">Her konuğun telefonunda</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start text-left space-y-1">
              <div className="flex items-center gap-3 text-[#7B1113] font-bold">
                <Clock size={20} className="shrink-0" />
                <span>Anında teslimat</span>
              </div>
              <p className="text-xs text-[#7B1113]/60 pl-8 leading-relaxed">48-72 saatte hazır</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#7B1113] w-full mb-6"></div>

          {/* Footer Price */}
          <div className="flex justify-between items-end">
            <span className="text-[#7B1113]/80 font-bold text-lg mb-2">Sadece</span>
            <div className="text-right">
              <div className="text-5xl font-bold text-[#7B1113] tracking-tight">175₺</div>
              <div className="text-xs text-[#7B1113]/60 mt-1 font-medium">Hepsi dahil</div>
            </div>
          </div>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/50 rounded-3xl p-8 border border-[#7B1113]/10"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EAE4DD]/50 flex items-center justify-center">
                <Gem size={20} className="text-[#7B1113]" />
              </div>
              <h3 className="text-2xl font-serif text-[#7B1113]">Premium</h3>
            </div>
            <div className="text-3xl font-serif text-[#7B1113]">575₺</div>
          </div>

          <p className="text-[#7B1113]/70 text-sm mb-8 leading-relaxed min-h-[60px]">
            Hiçbir şeyden vazgeçmek istemeyen ve gerçekten benzersiz bir şey arayan çiftler için.
          </p>

          <ul className="space-y-4 mb-8">
            {[
              "Sınırsız blok",
              "%100 özel tasarım",
              "Tüm ekstralar dahil",
              "Sınırsız tasarım düzenlemesi",
              "Hızlı teslimat 48-72s"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#7B1113]/80">
                <Check size={16} className="text-[#7B1113]/40 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button className="w-full py-4 bg-[#EAE4DD] text-[#7B1113] rounded-xl font-medium hover:bg-[#E6DDD5] transition-colors flex items-center justify-center gap-2 group">
            Planı seç
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Demo Preview */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="inline-flex flex-col items-center gap-4 bg-white/50 px-8 py-6 rounded-2xl border border-[#7B1113]/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm text-[#7B1113]/60">
            <span>Önce demoları görmek ister misiniz?</span>
            <div className="w-4 h-4 rounded-full border border-[#7B1113]/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7B1113]/40" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {[
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=100&h=140&fit=crop",
              "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=100&h=140&fit=crop",
              "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=100&h=140&fit=crop",
              "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=100&h=140&fit=crop"
            ].map((img, i) => (
              <div key={i} className="w-12 h-16 rounded-lg overflow-hidden border border-white shadow-sm hover:scale-110 transition-transform cursor-pointer">
                <img src={img} alt="Demo" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
