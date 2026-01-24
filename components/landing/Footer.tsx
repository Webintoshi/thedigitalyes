import Link from 'next/link'
import { Mail, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-[#EEE5DF] pt-16 sm:pt-24 pb-8 sm:pb-12 border-t border-[#7B1113]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-[#7B1113]">
              {/* Logo Icon (Cupid/Angel style) */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-7 h-7 sm:w-8 sm:h-8"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-xl sm:text-2xl font-serif font-medium tracking-wide">The Digital Yes</span>
            </div>
            <p className="text-[#7B1113]/60 font-light text-sm sm:text-base">Premium Dijital Düğün Davetiyeleri</p>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-[#7B1113]/60 tracking-widest">
            <Link href="#" className="hover:text-[#7B1113] transition-colors uppercase">Instagram</Link>
            <Link href="#" className="hover:text-[#7B1113] transition-colors uppercase">Tiktok</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#7B1113]/10 mb-6 sm:mb-8" />

        {/* Middle Section: Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-16 text-xs sm:text-sm text-[#7B1113]/70 mb-6 sm:mb-8">
          <Link href="#" className="hover:text-[#7B1113] transition-colors">Gizlilik Politikası</Link>
          <Link href="#" className="hover:text-[#7B1113] transition-colors">Çerez Politikası</Link>
          <Link href="#" className="hover:text-[#7B1113] transition-colors">Şartlar ve Koşullar</Link>
          <Link href="#" className="hover:text-[#7B1113] transition-colors">İade Politikası</Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#7B1113]/10 mb-10 sm:mb-16" />

        {/* Contact Section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-10 sm:mb-16">
          <p className="text-[#7B1113]/80 font-light text-sm sm:text-base">Bir sorunuz mu var? Bize yazın</p>
          <a
            href="mailto:info@thedigitalyes.com"
            className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border border-[#7B1113]/20 rounded-xl text-[#7B1113] hover:bg-[#7B1113] hover:text-white transition-all duration-300 group text-xs sm:text-sm"
          >
            <Mail size={14} className="sm:hidden" />
            <Mail size={18} className="hidden sm:block" />
            <span className="font-medium tracking-wide uppercase">info@thedigitalyes.com</span>
          </a>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-[#7B1113]/10 pt-6 sm:pt-8 text-center">
          <p className="text-[#7B1113]/40 text-[10px] sm:text-xs">
            © 2026 The Digital Yes. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
