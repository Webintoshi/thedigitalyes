'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Download, Heart } from 'lucide-react'
import { CoupleData, getGoogleCalendarUrl, generateIcsContent } from '@/lib/save-the-date'
import { Cormorant_Garamond, Montserrat, Tangerine } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})

const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-tangerine'
})

export default function SaveTheDateClient({ couple }: { couple: CoupleData }) {
  const [isRevealed, setIsRevealed] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)

  const handleDownloadIcs = () => {
    const content = generateIcsContent(couple)
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'save-the-date.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Initialize Canvas and Draw Generated Glitter Heart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // High resolution for sharpness
    const dpr = window.devicePixelRatio || 1
    const size = 320
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    ctx.scale(dpr, dpr)

    const w = size
    const h = size

    // 1. Define Heart Path
    ctx.beginPath()
    ctx.moveTo(w / 2, h / 5)
    ctx.bezierCurveTo(w / 2, h / 10, 0, h / 10, 0, h / 2.5)
    ctx.bezierCurveTo(0, h / 1.5, w / 2, h * 0.9, w / 2, h)
    ctx.bezierCurveTo(w / 2, h * 0.9, w, h / 1.5, w, h / 2.5)
    ctx.bezierCurveTo(w, h / 10, w / 2, h / 10, w / 2, h / 5)
    ctx.closePath()

    // 2. Create Clip for Heart Shape
    ctx.save()
    ctx.clip()

    // 3. Generate Premium Gold Glitter Texture
    // Ultra-dense particles with varied sizes for realistic gold foil
    const particles = 80000
    for (let i = 0; i < particles; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      // Varied particle sizes: mostly tiny with occasional larger sparkles
      const size = Math.random() < 0.95
        ? Math.random() * 1.2 + 0.3  // Tiny particles (95%)
        : Math.random() * 2.5 + 1.5  // Larger sparkles (5%)

      // Premium Gold Palette with more depth
      const colors = [
        '#D4AF37', // Classic Gold
        '#FFD700', // Bright Gold
        '#FFC125', // Golden Yellow
        '#B8860B', // Dark Goldenrod
        '#DAA520', // Goldenrod
        '#F5DEB3', // Wheat (light)
        '#FFFACD', // Lemon Chiffon (Highlight)
        '#FFFFFF', // Pure white sparkle
        '#FFF8DC', // Cornsilk
        '#EEE8AA'  // Pale Goldenrod
      ]
      const color = colors[Math.floor(Math.random() * colors.length)]

      ctx.fillStyle = color
      // Higher opacity for denser coverage
      ctx.globalAlpha = Math.random() * 0.3 + 0.7
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add multiple gradient overlays for realistic metallic sheen
    // First gradient: diagonal shimmer
    const gradient1 = ctx.createLinearGradient(0, 0, w, h)
    gradient1.addColorStop(0, 'rgba(255, 215, 0, 0.35)')
    gradient1.addColorStop(0.25, 'rgba(255, 255, 255, 0.2)')
    gradient1.addColorStop(0.5, 'rgba(218, 165, 32, 0.15)')
    gradient1.addColorStop(0.75, 'rgba(255, 255, 255, 0.25)')
    gradient1.addColorStop(1, 'rgba(184, 134, 11, 0.3)')
    ctx.globalAlpha = 1
    ctx.fillStyle = gradient1
    ctx.fill()

    // Second gradient: vertical light reflection
    const gradient2 = ctx.createLinearGradient(0, 0, 0, h)
    gradient2.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
    gradient2.addColorStop(0.3, 'rgba(255, 255, 255, 0)')
    gradient2.addColorStop(0.7, 'rgba(255, 255, 255, 0)')
    gradient2.addColorStop(1, 'rgba(0, 0, 0, 0.1)')
    ctx.fillStyle = gradient2
    ctx.fill()

    ctx.restore() // Remove clip

    // 4. Add "Embossed" Hint Text
    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowColor = 'rgba(0,0,0,0.2)'
    ctx.shadowBlur = 1
    ctx.shadowOffsetY = 1
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.font = '500 13px "Montserrat", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.letterSpacing = '3px'
    // ctx.fillText('KAZIYIN', w/2, h/2) 
    ctx.restore()

  }, [])

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    // Handle both Touch and Mouse events safely
    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else if ('clientX' in e) {
      x = (e as React.MouseEvent).clientX - rect.left
      y = (e as React.MouseEvent).clientY - rect.top
    } else {
      return
    }

    ctx.globalCompositeOperation = 'destination-out'

    // Premium Ragged Brush: Multiple irregular shapes for realistic scratch
    const brushSize = 42
    const innerDensity = 12 // More particles for fuller coverage
    const outerDensity = 8  // Edge particles for ragged look

    // Core scratching - dense center
    for (let i = 0; i < innerDensity; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * brushSize * 0.35
      const offsetX = Math.cos(angle) * radius
      const offsetY = Math.sin(angle) * radius
      const particleSize = (brushSize * 0.4) + Math.random() * 8

      ctx.beginPath()
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2)
      ctx.fill()
    }

    // Ragged edges - irregular outer particles
    for (let i = 0; i < outerDensity; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = brushSize * 0.5 + Math.random() * brushSize * 0.4
      const offsetX = Math.cos(angle) * radius
      const offsetY = Math.sin(angle) * radius
      // Smaller, varied particles for organic edges
      const particleSize = 3 + Math.random() * 12

      ctx.beginPath()
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2)
      ctx.fill()
    }

    // Extra tiny particles for dust/debris effect
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = brushSize * 0.8 + Math.random() * brushSize * 0.6
      const offsetX = Math.cos(angle) * radius
      const offsetY = Math.sin(angle) * radius

      ctx.beginPath()
      ctx.arc(x + offsetX, y + offsetY, 1 + Math.random() * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Performance: Do NOT check reveal progress here to avoid lag
  }

  const handleDragEnd = () => {
    setIsScratching(false)
    if (!isRevealed) checkRevealProgress()
  }

  const checkRevealProgress = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const imageData = ctx.getImageData(0, 0, w, h)
    const pixels = imageData.data
    let transparentPixels = 0
    const totalPixels = pixels.length / 4

    // Optimization: Check grid
    for (let i = 0; i < totalPixels; i += 50) {
      if (pixels[i * 4 + 3] === 0) transparentPixels++
    }

    // Increased Threshold: 55% must be scratched
    if (transparentPixels > (totalPixels / 50) * 0.55) {
      setIsRevealed(true)
    }
  }

  return (
    <div className={`min-h-screen bg-[#EEE5DF] flex flex-col items-center justify-center p-4 overflow-hidden ${cormorant.variable} ${montserrat.variable} ${tangerine.variable} font-serif`}>

      {/* Burgundy Vignette Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(123, 17, 19, 0.08) 100%)'
        }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[420px] aspect-[4/6] bg-[#FDFBF7] shadow-2xl rounded-sm overflow-hidden flex flex-col items-center py-14 px-8 text-center z-10"
        style={{
          boxShadow: '0 30px 60px -15px rgba(123, 17, 19, 0.12), 0 0 0 1px rgba(123, 17, 19, 0.05), 0 10px 30px -10px rgba(0,0,0,0.1)',
          border: '1px solid rgba(123, 17, 19, 0.08)'
        }}
      >
        {/* Premium Paper Texture */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
            filter: 'contrast(1.1) brightness(0.98)'
          }}
        />

        {/* Top: Save the Date - Tangerine Script Font */}
        <div className="relative z-10 w-full">
          <h2
            className="text-6xl md:text-7xl text-[#7B1113] font-normal"
            style={{
              fontFamily: 'var(--font-tangerine), cursive',
              textShadow: '1px 2px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(123,17,19,0.1)',
            }}
          >
            Save the Date
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#7B1113]/40 to-transparent mx-auto mt-4 mb-2" />
        </div>

        {/* Center: Heart & Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">

          {/* Hidden Content (Revealed) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs font-sans font-semibold tracking-[0.3em] text-[#7B1113]/70 uppercase mb-2">Düğün Tarihi</span>
              <span className="text-5xl md:text-6xl text-[#7B1113] font-semibold tracking-tight">
                {new Date(couple.date).toLocaleDateString('tr-TR', { day: 'numeric' })}
              </span>
              <span className="text-2xl md:text-3xl text-[#5A4A42] italic font-light border-y border-[#7B1113]/15 py-1 px-6 my-1">
                {new Date(couple.date).toLocaleDateString('tr-TR', { month: 'long' })}
              </span>
              <span className="text-xl text-[#7B1113]/60 tracking-widest font-light">
                {new Date(couple.date).toLocaleDateString('tr-TR', { year: 'numeric' })}
              </span>
            </motion.div>
          </div>

          {/* Scratch Layer */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 1.2 }}
                className="relative cursor-pointer"
              >
                <canvas
                  ref={canvasRef}
                  className="touch-none relative z-20 drop-shadow-md"
                  style={{ touchAction: 'none' }}
                  onMouseDown={() => setIsScratching(true)}
                  onTouchStart={() => setIsScratching(true)}
                  onMouseUp={handleDragEnd}
                  onTouchEnd={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onMouseMove={(e: any) => isScratching && scratch(e)}
                  onTouchMove={(e: any) => isScratching && scratch(e)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Elegant hint text - Turkish */}
          {!isRevealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-10 left-0 right-0 text-center text-sm font-sans text-[#7B1113]/50 tracking-wide italic"
            >
              Altın kalbi kazıyarak sürprizi keşfedin
            </motion.p>
          )}
        </div>

        {/* Bottom: Names with Burgundy Theme */}
        <div className="relative z-10 w-full mt-auto pt-8">
          <h1
            className="text-3xl md:text-4xl text-[#7B1113] font-normal tracking-[0.15em] uppercase leading-relaxed"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              textShadow: '1px 1px 0px rgba(255,255,255,0.95), -0.5px -0.5px 0px rgba(123,17,19,0.08)',
            }}
          >
            {couple.partner1} <br />
            <span className="text-2xl text-[#D4AF37]">♥</span>
            <br /> {couple.partner2}
          </h1>
        </div>

      </motion.div>

      {/* Action Buttons - Burgundy Theme */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#7B1113]/10 flex flex-col sm:flex-row gap-3 items-center justify-center z-50"
          >
            <a
              href={getGoogleCalendarUrl(couple)}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-8 py-4 bg-[#7B1113] text-white rounded-sm text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-[#691011] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Calendar size={16} />
              Google Takvim
            </a>
            <button
              onClick={handleDownloadIcs}
              className="group w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#7B1113] text-[#7B1113] rounded-sm text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-[#7B1113] hover:text-white transition-all flex items-center justify-center gap-3"
            >
              <Download size={16} />
              Apple / Outlook
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
