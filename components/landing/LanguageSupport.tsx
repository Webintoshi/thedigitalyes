import { Globe } from 'lucide-react'

export default function LanguageSupport() {
  const languages = ['ES', 'EN', 'FR', 'DE', '+15']

  return (
    <div className="pt-6 border-t border-burgundy/10">
      <div className="flex items-center gap-2 text-burgundy">
        <Globe size={20} className="text-burgundy" />
        <span className="text-sm">Davetiyeniz, her dilde</span>
      </div>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        {languages.map((lang, index) => (
          <span key={index} className="text-sm font-medium text-burgundy">
            {lang}
            {index < languages.length - 1 && <span className="text-burgundy/40 mx-1">·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
