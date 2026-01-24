'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Download, Heart } from 'lucide-react'
import { CoupleData, getGoogleCalendarUrl, generateIcsContent } from '@/lib/save-the-date'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})

// Floating hearts background component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    opacity: Math.random() * 0.15 + 0.05,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: -50,
          }}
          animate={{
            y: [-50, window.innerHeight + 100],
            rotate: [0, 360],
            x: [0, Math.sin(heart.id) * 50],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            size={heart.size}
            style={{ opacity: heart.opacity }}
            className="text-[#D4AF37]"
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  )
}

const getSessionId = (slug: string) => {
  // Her slug için ayrı session ID - böylece her çiftin davetiyesi bağımsız
  if (typeof window === 'undefined') return ''
  const storageKey = `scratch-session-id-${slug}`
  let sessionId = localStorage.getItem(storageKey)
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem(storageKey, sessionId)
  }
  return sessionId
}

export default function SaveTheDateClient({ couple }: { couple: CoupleData }) {
  const [sessionId] = useState(() => getSessionId(couple.slug))

  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`revealed-${couple.slug}-${sessionId}`) === 'true'
    }
    return false
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)

  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL()
    localStorage.setItem(`scratch-state-${couple.slug}-${sessionId}`, dataUrl)
  }

  const loadCanvasState = () => {
    const savedState = localStorage.getItem(`scratch-state-${couple.slug}-${sessionId}`)
    if (savedState && canvasRef.current) {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = savedState
    }
  }

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
  const drawHeart = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const getCanvasSize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 360) return 240
      if (screenWidth < 480) return 280
      return 320
    }

    const size = getCanvasSize()
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

      // Premium Gold Palette - Rich Vibrant Gold
      const colors = [
        '#FFD700', // Bright Gold
        '#FFC000', // Amber Gold
        '#FDB933', // Rich Gold-Yellow
        '#E6AC00', // Deep Gold
        '#FFA500', // Orange-Gold
        '#C9A227', // Metallic Gold
        '#D4AF37', // Classic Gold
        '#FFE5B4', // Light Champagne Gold
        '#FFF8DC', // Cornsilk
        '#FFFACD', // Lemon Chiffon (Highlight)
        '#FFFFFF', // Pure white sparkle
        '#FFEC8B', // Pale Gold
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
    // First gradient: diagonal shimmer - Rich Gold
    const gradient1 = ctx.createLinearGradient(0, 0, w, h)
    gradient1.addColorStop(0, 'rgba(255, 215, 0, 0.45)')
    gradient1.addColorStop(0.2, 'rgba(255, 193, 7, 0.35)')
    gradient1.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)')
    gradient1.addColorStop(0.6, 'rgba(230, 172, 0, 0.3)')
    gradient1.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)')
    gradient1.addColorStop(1, 'rgba(201, 162, 39, 0.4)')
    ctx.globalAlpha = 1
    ctx.fillStyle = gradient1
    ctx.fill()

    // Second gradient: vertical light reflection - Gold highlight
    const gradient2 = ctx.createLinearGradient(0, 0, 0, h)
    gradient2.addColorStop(0, 'rgba(255, 248, 149, 0.25)')
    gradient2.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)')
    gradient2.addColorStop(0.7, 'rgba(255, 215, 0, 0.05)')
    gradient2.addColorStop(1, 'rgba(184, 134, 11, 0.15)')
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
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    drawHeart(canvas)
    loadCanvasState()

    const handleResize = () => {
      if (canvasRef.current) {
        drawHeart(canvasRef.current)
        loadCanvasState()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    let x, y

    // Handle both Touch and Mouse events safely
    if ('touches' in e && e.touches.length > 0) {
      x = (e.touches[0].clientX - rect.left) * scaleX
      y = (e.touches[0].clientY - rect.top) * scaleY
    } else if ('clientX' in e) {
      x = ((e as React.MouseEvent).clientX - rect.left) * scaleX
      y = ((e as React.MouseEvent).clientY - rect.top) * scaleY
    } else {
      return
    }

    ctx.globalCompositeOperation = 'destination-out'

    // Premium Ragged Brush: Multiple irregular shapes for realistic scratch
    // Scale brush size to match canvas resolution
    const dpr = window.devicePixelRatio || 1
    const brushSize = 28 * dpr
    const innerDensity = 6 // More particles for fuller coverage
    const outerDensity = 4  // Edge particles for ragged look

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
    saveCanvasState()
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

    // Increased Threshold: 70% must be scratched
    if (transparentPixels > (totalPixels / 50) * 0.70) {
      setIsRevealed(true)
      localStorage.setItem(`revealed-${couple.slug}-${sessionId}`, 'true')
      localStorage.removeItem(`scratch-state-${couple.slug}-${sessionId}`)
    }
  }

  return (
    <div className={`min-h-screen bg-[#F5E6E0] flex flex-col items-center justify-center p-4 overflow-hidden ${montserrat.variable} font-serif`}>

      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Warm Romantic Gradient Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 182, 193, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* Burgundy Vignette Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(123, 17, 19, 0.06) 100%)'
        }}
      />

      {/* Sparkle Effects Container - Moved inside card for proper positioning */}

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

        {/* Top: Save the Date - Lora Font */}
        <div className="relative z-10 w-full">
          <h2
            className="text-3xl md:text-4xl text-[#7B1113] font-medium tracking-tight"
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
            }}
          >
            Save the Date
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#7B1113]/60 to-transparent mx-auto mt-3 mb-4" />
        </div>

        {/* Center: Heart & Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">
          {/* Hidden Content (Revealed) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence>
              {isRevealed && (
                <>
                  {/* Confetti hearts on reveal */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={`confetti-${i}`}
                      className="absolute pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                        x: [0, (Math.random() - 0.5) * 300],
                        y: [0, (Math.random() - 0.5) * 300],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 0.5,
                        delay: i * 0.03,
                        ease: 'easeOut',
                      }}
                    >
                      <Heart
                        size={12 + Math.random() * 16}
                        className={Math.random() > 0.5 ? 'text-[#D4AF37]' : 'text-[#FFB6C1]'}
                        fill="currentColor"
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center space-y-1"
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xs font-sans font-medium tracking-[0.2em] text-[#D4AF37]/80 uppercase mb-2"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >♥</motion.span> Düğün Tarihi <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }
                }>♥</motion.span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="text-6xl md:text-7xl text-[#7B1113] font-semibold tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                {new Date(couple.date).toLocaleDateString('tr-TR', { day: 'numeric' })}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-[#7B1113]/80 font-normal"
              >
                {new Date(couple.date).toLocaleDateString('tr-TR', { month: 'long' })}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-base text-[#7B1113]/60 tracking-wide font-light"
              >
                {new Date(couple.date).toLocaleDateString('tr-TR', { year: 'numeric' })}
              </motion.span>
            </motion.div>
          </div>

          {/* Scratch Layer */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 1.2 }}
                className="relative cursor-pointer"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                whileHover={{ scale: 1.03 }}
              >
                <canvas
                  ref={canvasRef}
                  className="touch-none relative z-20 drop-shadow-md rounded-full"
                  style={{ touchAction: 'none' }}
                  onMouseDown={() => setIsScratching(true)}
                  onTouchStart={() => setIsScratching(true)}
                  onMouseUp={handleDragEnd}
                  onTouchEnd={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onMouseMove={(e: any) => isScratching && scratch(e)}
                  onTouchMove={(e: any) => isScratching && scratch(e)}
                />
                {/* Gentle glow around heart */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Elegant hint text - Turkish */}
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-12 left-0 right-0 text-center"
            >
              <motion.p
                className="text-sm font-sans text-[#7B1113]/60 tracking-wide"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >✨</motion.span>
                Altın kalbi kazıyarak sürprizi keşfedin
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                  className="inline-block"
                >✨</motion.span>
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Bottom: Names with Lora Font */}
        <div className="relative z-10 w-full mt-auto pt-6">
          <motion.h1
            className="text-2xl md:text-3xl text-[#7B1113] font-medium tracking-wide leading-relaxed"
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {couple.partner1}{' '}
            <motion.span
              className="text-[#D4AF37] mx-2 inline-block"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              ♥
            </motion.span>{' '}
            {couple.partner2}
          </motion.h1>
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
