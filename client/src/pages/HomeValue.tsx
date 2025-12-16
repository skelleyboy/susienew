import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import { getImage } from "@/lib/images";

export default function HomeValuePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline="What is your home worth?"
        subhead="Receive a comprehensive market analysis and personalized valuation."
        image={getImage("home-modern")}
        primaryCta="Get Valuation"
        primaryCtaLink="#valuation-form"
      />
      
      <Section id="valuation-form">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 relative min-h-[400px]">
            <img 
              src={getImage("living-room.jpg")} 
              alt="Luxury Living Room" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white z-10">
              <h3 className="font-serif text-3xl mb-4">Precision Pricing</h3>
              <p className="font-light text-white/90">
                Automated tools can't see your home's unique features. We provide a human-verified valuation based on real-time market data.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 p-12">
            <LeadForm 
              title="Home Valuation" 
              subtitle="Enter your details below for a complimentary analysis."
              ctaText="Get My Estimate"
              className="h-full flex flex-col justify-center"
            />
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
