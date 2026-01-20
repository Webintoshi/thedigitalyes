import Link from 'next/link'
import { Mail, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF7F5] pt-24 pb-12 border-t border-[#7B1113]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#7B1113]">
              {/* Logo Icon (Cupid/Angel style) */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="w-8 h-8"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-2xl font-serif font-medium tracking-wide">The Digital Yes</span>
            </div>
            <p className="text-[#7B1113]/60 font-light">Premium Dijital Düğün Davetiyeleri</p>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-[#7B1113]/60 tracking-widest">
            <Link href="#" className="hover:text-[#7B1113] transition-colors uppercase">Instagram</Link>
            <Link href="#" className="hover:text-[#7B1113] transition-colors uppercase">Tiktok</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#7B1113]/10 mb-8" />

        {/* Middle Section: Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-[#7B1113]/70 mb-8">
          <Link href="#" className="hover:text-[#7B1113] transition-colors">Gizlilik Politikası</Link>
          <Link href="#" className="hover:text-[#7B1113] transition-colors">Çerez Politikası</Link>
          <Link href="#" className="hover:text-[#7B1113] transition-colors">Şartlar ve Koşullar</Link>
          <Link href="#" className="hover:text-[#7B1113] transition-colors">İade Politikası</Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#7B1113]/10 mb-16" />

        {/* Contact Section */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <p className="text-[#7B1113]/80 font-light">Bir sorunuz mu var? Bize yazın</p>
          <a 
            href="mailto:info@thedigitalyes.com" 
            className="flex items-center gap-3 px-8 py-4 border border-[#7B1113]/20 rounded-xl text-[#7B1113] hover:bg-[#7B1113] hover:text-white transition-all duration-300 group"
          >
            <Mail size={18} />
            <span className="font-medium tracking-wide uppercase">info@thedigitalyes.com</span>
          </a>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-[#7B1113]/10 pt-8 text-center">
          <p className="text-[#7B1113]/40 text-xs">
            © 2026 The Digital Yes. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
