import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { ListingCard } from "@/components/ui/ListingCard";
import { LeadForm } from "@/components/ui/LeadForm";
import { TestimonialSection } from "@/components/ui/TestimonialSection";
import listings from "@/data/listings.json";
import { getImage } from "@/lib/images";
import { Search, Key, Home, Info } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

export default function BuyPage() {
  useSEO({
    title: "Buy a Home in Oakland & Macomb County | Luxury Real Estate & Exclusive Listings",
    description: "Access exclusive off-market properties and premier luxury real estate listings in Royal Oak, Troy, Sterling Heights, Shelby Township, Washington Twp, and across Oakland & Macomb County.",
    canonicalUrl: "https://susiesharak.com/buy"
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I buy a home in Oakland or Macomb County?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Buying a home starts with understanding your lifestyle and goals. We curate a selection of homes, provide priority access to off-market opportunities, and expertly negotiate the acquisition of your dream home."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer access to off-market properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our clients gain priority access to off-market opportunities and coming-soon listings before they reach the broader market."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Navbar />
      <Hero 
        headline="Find Your Sanctuary"
        subhead="Access exclusive off market properties and premier listings in Oakland & Macomb County."
        image={getImage("service-buying")}
        primaryCta="View Listings"
        primaryCtaLink="#listings"
        secondaryCta="Schedule Consultation"
        secondaryCtaLink="/contact"
      />
      
      <Section>
        <div className="text-center mb-10">
          <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">The Journey</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-primary">The Buying Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We transform the complex process of buying a home into a seamless, curated experience tailored to your lifestyle.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-20 bg-muted/30 border border-muted p-6 rounded-lg flex gap-4">
          <Info className="text-primary w-6 h-6 shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-2">TL;DR: Buying with Susie Sharak</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Discovery:</strong> Personalized curation based on your lifestyle and goals.</li>
              <li>• <strong>Exclusive Access:</strong> Get priority viewing of off-market and coming-soon properties.</li>
              <li>• <strong>Acquisition:</strong> Expert negotiation and meticulous transaction management.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-muted/30 p-10 text-center hover:bg-white hover:shadow-xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-white mx-auto mb-8 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl mb-4">Discovery</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              We begin by understanding your lifestyle, preferences, and long term goals to curate a selection of homes that match your vision.
            </p>
          </div>
          <div className="bg-muted/30 p-10 text-center hover:bg-white hover:shadow-xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-white mx-auto mb-8 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl mb-4">Access</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Gain priority access to off market opportunities and coming soon listings before they reach the broader market.
            </p>
          </div>
          <div className="bg-muted/30 p-10 text-center hover:bg-white hover:shadow-xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-white mx-auto mb-8 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl mb-4">Acquisition</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Expert negotiation and meticulous transaction management ensure you secure your dream home on the best possible terms.
            </p>
          </div>
        </div>
      </Section>

      <Section id="listings" background="muted">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Curated Collection</h2>
          <p className="text-muted-foreground">Explore our current portfolio of exceptional properties.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      <TestimonialSection />

      <Section>
        <div className="max-w-xl mx-auto">
          <LeadForm 
            title="Start Your Search" 
            subtitle="Tell us what you're looking for, and we'll curate a list of properties for you."
            ctaText="Find My Home"
            formName="buy-search"
          />
        </div>
      </Section>

      <Footer />
    </div>
  );
}
