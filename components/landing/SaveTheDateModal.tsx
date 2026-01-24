'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Check, ChevronRight, ArrowLeft, CreditCard, Sparkles, Heart, Loader2, CheckCircle } from 'lucide-react'

interface SaveTheDateModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SaveTheDateModal({ isOpen, onClose }: SaveTheDateModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [successData, setSuccessData] = useState<{ slug: string; url: string } | null>(null)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    partner1: '',
    partner2: '',
    date: '',
    time: '18:00',
    venue: '',
    message: '',
    email: '',
    phone: ''
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/save-the-date/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner1: formData.partner1,
          partner2: formData.partner2,
          date: formData.date,
          time: formData.time,
          venue: formData.venue,
          message: formData.message
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Bir hata oluştu')
        return
      }

      setSuccessData({ slug: data.slug, url: data.url })
      setStep(4) // Success step
    } catch (err) {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#FAF7F5] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#FAF7F5]/80 backdrop-blur-md px-6 py-4 border-b border-burgundy/10 flex justify-between items-center">
              <div className="flex items-center gap-2 text-burgundy">
                <Calendar size={20} />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>Hatırlatıcı Ekle</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-burgundy/5 rounded-full text-burgundy/60 hover:text-burgundy transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pt-6 pb-2">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300
                        ${step >= s ? 'bg-[#7B1113] text-white' : 'bg-[#7B1113]/10 text-[#7B1113]/40'}
                      `}
                    >
                      {step > s ? <Check size={14} /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${step > s ? 'bg-[#7B1113]' : 'bg-[#7B1113]/10'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              {/* Step 1: Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-medium text-burgundy">Temel Bilgiler</h4>
                    <p className="text-sm text-burgundy/60">Düğün detaylarınızı girerek başlayın</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-burgundy/80 mb-1">İlk partnerin adı *</label>
                      <input
                        type="text"
                        name="partner1"
                        value={formData.partner1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-burgundy/10 focus:border-burgundy/30 focus:ring-2 focus:ring-burgundy/5 outline-none transition-all text-burgundy placeholder:text-burgundy/30"
                        placeholder="Örn: Ayşe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-burgundy/80 mb-1">İkinci partnerin adı *</label>
                      <input
                        type="text"
                        name="partner2"
                        value={formData.partner2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-burgundy/10 focus:border-burgundy/30 focus:ring-2 focus:ring-burgundy/5 outline-none transition-all text-burgundy placeholder:text-burgundy/30"
                        placeholder="Örn: Ahmet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-burgundy/80 mb-1">Mekan adı</label>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-burgundy/10 focus:border-burgundy/30 focus:ring-2 focus:ring-burgundy/5 outline-none transition-all text-burgundy placeholder:text-burgundy/30"
                        placeholder="Örn: Hilton Hotel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-burgundy/80 mb-1">Düğün tarihi *</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full h-12 px-4 rounded-xl bg-white border border-burgundy/10 focus:border-burgundy/30 focus:ring-2 focus:ring-burgundy/5 outline-none transition-all text-burgundy appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10 relative bg-transparent"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-burgundy/50 z-0">
                          <Calendar size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={!formData.partner1 || !formData.partner2 || !formData.date}
                    className="w-full py-4 bg-[#7B1113] text-white rounded-xl font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                  >
                    Devam Et <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Video Preview */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-medium text-burgundy">Tasarım Önizlemesi</h4>
                    <p className="text-sm text-burgundy/60">Davetiyenizin nasıl görüneceğini izleyin</p>
                  </div>

                  {/* Video Preview */}
                  <div className="relative w-full aspect-[9/16] max-h-[50vh] mx-auto bg-black rounded-xl shadow-lg border border-burgundy/10 overflow-hidden">
                    <video
                      src="/save-the-date-preview.mov"
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="px-6 py-4 border-2 border-[#7B1113] text-[#7B1113] rounded-xl font-medium hover:bg-[#7B1113]/5 transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-1 py-4 bg-[#7B1113] text-white rounded-xl font-medium hover:opacity-90 transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      Devam Et <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact & Payment */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-medium text-burgundy">İletişim Bilgileri</h4>
                    <p className="text-sm text-burgundy/60">Davetiyenizi size ulaştırmamız için bilgilerinizi girin</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-burgundy/80 mb-1">E-posta Adresi *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-burgundy/10 focus:border-burgundy/30 focus:ring-2 focus:ring-burgundy/5 outline-none transition-all text-burgundy placeholder:text-burgundy/30"
                        placeholder="ornek@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-burgundy/80 mb-1">Telefon (İsteğe bağlı)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-burgundy/10 focus:border-burgundy/30 focus:ring-2 focus:ring-burgundy/5 outline-none transition-all text-burgundy placeholder:text-burgundy/30"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="px-6 py-4 border-2 border-[#7B1113] text-[#7B1113] rounded-xl font-medium hover:bg-[#7B1113]/5 transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.email || isLoading}
                      className="flex-1 py-4 bg-[#7B1113] text-white rounded-xl font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Oluşturuluyor...
                        </>
                      ) : (
                        <>
                        <Calendar size={18} />
                        Hatırlatıcı Oluştur
                      </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && successData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-[#7B1113]/10 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-10 h-10 text-[#7B1113]" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-burgundy mb-2">
                      Aşkınızın En Güzel Anı! 💕
                    </h4>
                    <p className="text-burgundy/60">
                      Büyük gününüz için özel hatırlatıcınız hazır. Sevdiklerinizle paylaşın, mutluluğunuzu bir arada yaşatın.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-burgundy/10">
                    <p className="text-xs text-burgundy/50 mb-1">Hatırlatıcı Linkiniz:</p>
                    <p className="font-mono text-sm text-burgundy break-all">
                      {typeof window !== 'undefined' ? window.location.origin : ''}{successData.url}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}${successData.url}`)
                        alert('Link kopyalandı!')
                      }}
                      className="flex-1 py-4 border-2 border-[#7B1113] text-[#7B1113] rounded-xl font-medium hover:bg-[#7B1113]/5 transition-colors"
                    >
                      Linki Kopyala
                    </button>
                    <button
                      onClick={() => {
                        onClose()
                        router.push(successData.url)
                      }}
                      className="flex-1 py-4 bg-[#7B1113] text-white rounded-xl font-medium hover:opacity-90 transition-colors shadow-md"
                    >
                      Hatırlatıcıyı Gör
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}