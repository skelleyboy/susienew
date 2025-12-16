import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import { getImage } from "@/lib/images";
import { Camera, Globe, Users, TrendingUp } from "lucide-react";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline="Maximize Value"
        subhead="Strategic marketing campaigns designed to showcase your property's unique story."
        image={getImage("service-selling")}
        primaryCta="Get a Valuation"
        primaryCtaLink="/home-value"
        secondaryCta="Contact Us"
        secondaryCtaLink="/contact"
      />
      
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">The Strategy</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-primary">Marketing Mastery</h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
              Selling a luxury property requires more than just a listing. It demands a comprehensive marketing strategy that creates desire and commands premium value.
            </p>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              We leverage cutting-edge technology, professional production, and our extensive global network to ensure your property is seen by the right qualified buyers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-muted/30 p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Camera className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">Visual Storytelling</h3>
              <p className="text-sm text-muted-foreground">Cinematic video tours and editorial photography.</p>
            </div>
            <div className="bg-muted/30 p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Globe className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">Global Reach</h3>
              <p className="text-sm text-muted-foreground">Syndication to premier international real estate portals.</p>
            </div>
            <div className="bg-muted/30 p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">Network Access</h3>
              <p className="text-sm text-muted-foreground">Direct outreach to top agents and potential buyers.</p>
            </div>
            <div className="bg-muted/30 p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-xl mb-2">Data Driven</h3>
              <p className="text-sm text-muted-foreground">Pricing strategies backed by deep market analytics.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="muted" className="text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl mb-6">Ready to Sell?</h2>
          <p className="text-muted-foreground text-lg font-light mb-12">
            The first step is understanding the true value of your property in today's market.
          </p>
          <div className="bg-white p-10 shadow-xl max-w-xl mx-auto text-left">
            <LeadForm 
              title="Request a Consultation" 
              subtitle="Let's discuss your goals and how we can achieve them."
              ctaText="Submit Request"
            />
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
