'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Özellikler', href: '#features' },
    { label: 'Tasarımlar', href: '#designs' },
    { label: 'Fiyatlandırma', href: '#pricing' },
    { label: 'SSS', href: '#faq' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#eee5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Image
              src="/logo.svg"
              alt="The Digital Yes"
              width={300}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </div>

          {/* Desktop Menu - Premium Pill Design */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-[#EAE4DD]/50 rounded-full p-1.5 shadow-sm backdrop-blur-sm">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="px-6 py-2.5 rounded-full text-[11px] tracking-[0.15em] font-medium uppercase text-burgundy/70 hover:text-burgundy hover:bg-white/60 transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="ml-6 flex items-center bg-[#EAE4DD]/50 rounded-full p-1 shadow-sm">
              <button className="px-3 py-1.5 rounded-full text-[10px] font-bold text-burgundy/40 hover:text-burgundy transition-colors">TR</button>
              <button className="px-3 py-1.5 rounded-full text-[10px] font-bold text-burgundy bg-white shadow-sm">EN</button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-burgundy hover:bg-burgundy/5 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 z-50 bg-[#eee5df] overflow-y-auto">
            <div className="flex flex-col p-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-2xl font-serif text-burgundy/80 py-4 px-4 hover:text-burgundy hover:bg-white/40 rounded-2xl transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
