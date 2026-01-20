'use client'

import { motion } from 'framer-motion'
import { Lock, Check, Clock, X, User, Circle } from 'lucide-react'

export default function DashboardPreview() {
  const guests = [
    { name: "Ayşe Yılmaz", status: "confirmed", diet: "Vejetaryen" },
    { name: "Mehmet Demir", status: "confirmed", diet: null },
    { name: "Zeynep Kaya", status: "pending", diet: "Glutensiz" },
    { name: "Ali Vural", status: "declined", diet: null },
    { name: "Selin Çelik", status: "confirmed", diet: "Laktozsuz" },
  ]

  return (
    <div className="w-full py-16">
      <motion.div 
        className="text-center mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 text-sm tracking-widest text-[#7B1113] uppercase font-medium">
          <Lock size={14} />
          <span>Özel Yönetim Paneli</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-script font-bold text-[#7B1113] leading-tight px-4 md:px-0">
          Her şey kontrol altında,<br />
          <span className="italic">tek bir yerde</span>
        </h2>
        <p className="text-[#7B1113]/70 max-w-2xl mx-auto">
          Her davetiyenin arkasında, tüm süreci sizin için organize eden size özel bir yönetim paneli bulunur.
          LCV yanıtlarını anlık takip edin, özel istekleri yönetin.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-[#F5F0EB] rounded-xl shadow-2xl border border-[#7B1113]/10 overflow-hidden">
          {/* Browser Toolbar */}
          <div className="bg-[#EAE4DD] px-4 py-3 flex items-center gap-4 border-b border-[#7B1113]/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-white/50 rounded-md px-3 py-1 text-xs text-[#7B1113]/50 font-mono text-center">
              panel.thedigitalyes.com
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#EDF9F0] p-6 rounded-xl border border-green-100 text-center">
                <div className="text-3xl font-bold text-green-700 mb-1">42</div>
                <div className="text-sm font-medium text-green-600">Onaylandı</div>
              </div>
              <div className="bg-[#FFFBF0] p-6 rounded-xl border border-yellow-100 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">8</div>
                <div className="text-sm font-medium text-yellow-600">Bekliyor</div>
              </div>
              <div className="bg-[#FEF2F2] p-6 rounded-xl border border-red-100 text-center">
                <div className="text-3xl font-bold text-red-700 mb-1">3</div>
                <div className="text-sm font-medium text-red-600">Katılamıyor</div>
              </div>
            </div>

            {/* Guest List */}
            <div className="bg-white rounded-xl border border-[#7B1113]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#7B1113]/10 flex justify-between items-center bg-[#FAF8F6]">
                <span className="font-semibold text-[#7B1113]">Davetli Listesi</span>
                <span className="text-xs text-[#7B1113]/60">53 toplam</span>
              </div>
              <div className="divide-y divide-[#7B1113]/5">
                {guests.map((guest, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#FAF8F6] transition-colors">
                    <div className="flex items-center gap-3">
                      {guest.status === 'confirmed' && <div className="p-1 rounded-full bg-green-100 text-green-600"><Check size={14} /></div>}
                      {guest.status === 'pending' && <div className="p-1 rounded-full bg-yellow-100 text-yellow-600"><Clock size={14} /></div>}
                      {guest.status === 'declined' && <div className="p-1 rounded-full bg-red-100 text-red-600"><X size={14} /></div>}
                      <span className="text-[#7B1113] font-medium text-sm">{guest.name}</span>
                    </div>
                    {guest.diet && (
                      <span className="px-3 py-1 rounded-full bg-[#7B1113]/5 text-[#7B1113] text-[10px] font-medium border border-[#7B1113]/10">
                        {guest.diet}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
