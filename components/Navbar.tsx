'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${isScrolled
            ? 'bg-[#eee5df]/90 backdrop-blur-md shadow-md h-20 border-burgundy/5'
            : 'bg-[#eee5df] h-24 border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full relative">

            {/* Logo Section */}
            <div
              className="flex items-center cursor-pointer z-20 flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Image
                src="/logo.svg"
                alt="The Digital Yes"
                width={300}
                height={80}
                className={`w-auto transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'}`}
                priority
              />
            </div>

            {/* Desktop Center Menu - Absolute Positioning for perfect centering */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-1 bg-white/40 rounded-full p-1.5 px-2 border border-white/50 shadow-sm backdrop-blur-sm">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="px-5 py-2 rounded-full text-[11px] tracking-[0.1em] font-medium uppercase text-burgundy/80 hover:text-burgundy hover:bg-white transition-all duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Language & Mobile Button */}
            <div className="flex items-center gap-4 z-20">
              {/* Language Switcher */}
              <div className="hidden md:flex items-center bg-white/40 rounded-full p-1 border border-white/50 shadow-sm">
                <button className="px-3 py-1.5 rounded-full text-[10px] font-bold text-burgundy/40 hover:text-burgundy transition-colors">TR</button>
                <div className="w-[1px] h-3 bg-burgundy/10"></div>
                <button className="px-3 py-1.5 rounded-full text-[10px] font-bold text-burgundy">EN</button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-burgundy hover:bg-burgundy/5 rounded-full transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#eee5df] transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '0px', paddingTop: '100px' }}
      >
        <div className="flex flex-col p-6 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-left text-3xl font-serif text-burgundy/80 py-4 px-4 hover:text-burgundy hover:pl-6 transition-all duration-300"
            >
              {item.label}
            </button>
          ))}

          <div className="mt-8 flex gap-4 px-4">
            <button className="text-sm font-bold text-burgundy/40">TR</button>
            <button className="text-sm font-bold text-burgundy">EN</button>
          </div>
        </div>
      </div>
    </>
  )
}
