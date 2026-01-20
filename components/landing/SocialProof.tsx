import { Star } from 'lucide-react'

export default function SocialProof() {
  return (
    <div className="space-y-6">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-burgundy/10 to-transparent" />
      
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={20} className="text-[#FFD700] fill-[#FFD700]" />
          ))}
          <span className="ml-2 text-burgundy font-bold text-lg">4.9</span>
          <span className="text-burgundy/60 text-sm">/ 5</span>
        </div>
        
        <div className="hidden sm:block w-px h-8 bg-burgundy/10" />
        
        <div className="text-sm font-medium text-burgundy/80">
          <span className="font-bold text-burgundy">+100 mutlu çift</span> Yorumları gör →
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-burgundy/10 to-transparent" />
    </div>
  )
}
