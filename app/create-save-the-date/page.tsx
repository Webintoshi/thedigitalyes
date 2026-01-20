'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, MessageSquare, Heart, Loader2, CheckCircle } from 'lucide-react'

export default function CreateSaveTheDate() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState<{ slug: string; url: string } | null>(null)

    const [formData, setFormData] = useState({
        partner1: '',
        partner2: '',
        date: '',
        time: '18:00',
        venue: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/save-the-date/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Bir hata oluştu')
                return
            }

            setSuccess({ slug: data.slug, url: data.url })
        } catch (err) {
            setError('Bağlantı hatası. Lütfen tekrar deneyin.')
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#EEE5DF] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#7B1113] mb-2">
                        Davetiyeniz Oluşturuldu!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Artık bu linki sevdiklerinizle paylaşabilirsiniz.
                    </p>

                    <div className="bg-[#EEE5DF] rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">Davetiye Linkiniz:</p>
                        <p className="font-mono text-[#7B1113] break-all">
                            {typeof window !== 'undefined' ? window.location.origin : ''}{success.url}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={success.url}
                            className="flex-1 bg-[#7B1113] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#691011] transition-colors"
                        >
                            Davetiyeyi Gör
                        </Link>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}${success.url}`)
                                alert('Link kopyalandı!')
                            }}
                            className="flex-1 border-2 border-[#7B1113] text-[#7B1113] py-3 px-6 rounded-lg font-semibold hover:bg-[#7B1113] hover:text-white transition-colors"
                        >
                            Linki Kopyala
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#EEE5DF]">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-[#7B1113]/10 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-[#7B1113] hover:text-[#691011] transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-[#7B1113]">
                        Tarihi Kaydet Davetiyesi Oluştur
                    </h1>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <Heart className="w-12 h-12 text-[#7B1113] mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-[#7B1113] mb-2">
                            Düğün Bilgilerinizi Girin
                        </h2>
                        <p className="text-gray-600">
                            Bu bilgiler davetiyenizde görünecektir.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Partners */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Partner 1 Adı *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.partner1}
                                    onChange={(e) => setFormData(prev => ({ ...prev, partner1: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7B1113] focus:outline-none transition-colors"
                                    placeholder="Ayşe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Partner 2 Adı *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.partner2}
                                    onChange={(e) => setFormData(prev => ({ ...prev, partner2: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7B1113] focus:outline-none transition-colors"
                                    placeholder="Ahmet"
                                />
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Düğün Tarihi *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7B1113] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Saat *
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7B1113] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Venue */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Mekan
                            </label>
                            <input
                                type="text"
                                value={formData.venue}
                                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7B1113] focus:outline-none transition-colors"
                                placeholder="Çırağan Sarayı, İstanbul"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <MessageSquare className="w-4 h-4 inline mr-1" />
                                Özel Mesaj
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7B1113] focus:outline-none transition-colors resize-none"
                                placeholder="Bu mutlu günümüzde yanımızda olmanızı diliyoruz..."
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#7B1113] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-[#691011] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Oluşturuluyor...
                                </>
                            ) : (
                                <>
                                    <Heart className="w-5 h-5" />
                                    Davetiye Oluştur
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
