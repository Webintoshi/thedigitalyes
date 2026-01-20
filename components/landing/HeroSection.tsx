import HeroContent from './HeroContent'
import HeroImage from './HeroImage'
import PhoneMockup from './PhoneMockup'
import DigitalEnvelope from './DigitalEnvelope'
import DashboardPreview from './DashboardPreview'
import DashboardFeatures from './DashboardFeatures'
import PricingSection from './PricingSection'
import CustomerReviews from './CustomerReviews'
import FAQSection from './FAQSection'
import Footer from './Footer'

export default function HeroSection() {
  return (
    <section className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <HeroContent />
          <PhoneMockup />
          <HeroImage />
          <DigitalEnvelope />
          <DashboardPreview />
          <DashboardFeatures />
          <PricingSection />
          <CustomerReviews />
          <FAQSection />
        </div>
      </div>
      <Footer />
    </section>
  )
}
