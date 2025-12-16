import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { ListingCard } from "@/components/ui/ListingCard";
import { AreaCard } from "@/components/ui/AreaCard";
import { TestimonialSection } from "@/components/ui/TestimonialSection";
import { LeadForm } from "@/components/ui/LeadForm";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Award, Home, TrendingUp } from "lucide-react";
import siteData from "@/data/site.json";
import listings from "@/data/listings.json";
import areas from "@/data/areas.json";

// Import generated hero image
import heroImage from "@assets/generated_images/luxury_home_exterior_at_twilight.png";
import heroVideo from "@assets/generated_videos/luxury_home_exterior_slow_pan.mp4";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      {/* Hero */}
      <Hero 
        headline="Curating Metro Detroit's Finest Lifestyles"
        subhead="An exclusive real estate experience for those seeking the exceptional in Downriver & Oakland County."
        image={heroImage}
        video={heroVideo}
      />

      {/* Trust Row */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {siteData.stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="font-serif text-3xl md:text-4xl text-primary">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
            <div className="space-y-2">
              <div className="flex justify-center text-accent">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Uncompromising Quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buy / Sell Paths */}
      <Section className="bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="group relative overflow-hidden bg-white p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-500">
            <Home className="w-10 h-10 text-accent mb-6" />
            <h3 className="font-serif text-3xl mb-4">Acquire</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Secure your legacy. Access off-market masterpieces and receive bespoke guidance to find a residence that reflects your achievements.
            </p>
            <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-widest text-xs font-bold px-8" asChild>
              <Link href="/buy">Begin Your Search</Link>
            </Button>
          </div>
          <div className="group relative overflow-hidden bg-primary text-white p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-500">
            <TrendingUp className="w-10 h-10 text-accent mb-6" />
            <h3 className="font-serif text-3xl mb-4">Representing Your Property</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              Articulating the unique narrative of your home to a global audience of qualified buyers. Precision marketing for maximum value.
            </p>
            <Button className="rounded-none bg-white text-primary hover:bg-white/90 uppercase tracking-widest text-xs font-bold px-8" asChild>
              <Link href="/sell">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Featured Areas */}
      <Section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl mb-4">Curated Communities</h2>
            <p className="text-muted-foreground max-w-lg">Discover the distinctive enclaves that define luxury living in Michigan.</p>
          </div>
          <Button variant="link" className="hidden md:flex text-primary hover:text-accent uppercase tracking-widest text-xs font-bold p-0" asChild>
            <Link href="/communities">View All Areas <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.slice(0, 4).map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="link" className="text-primary hover:text-accent uppercase tracking-widest text-xs font-bold p-0" asChild>
            <Link href="/communities">View All Areas <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* Featured Listings */}
      <Section background="muted">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Portfolio of Distinction</h2>
          <p className="text-muted-foreground">A collection of Metro Detroit's most remarkable residences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Lead Capture / Guide */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-white">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Private Market Access
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              The finest opportunities are often spoken in whispers. Join our private client list for access to off-market inventory and deep market intelligence.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Award className="text-accent w-5 h-5" />
                <span className="font-medium">Market Analysis & Trends</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="text-accent w-5 h-5" />
                <span className="font-medium">Neighborhood Guides</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="text-accent w-5 h-5" />
                <span className="font-medium">Off-Market Opportunities</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white text-foreground p-8 md:p-12 shadow-2xl max-w-md mx-auto w-full">
            <LeadForm 
              title="Request Private Access" 
              subtitle="Begin the conversation." 
              ctaText="Inquire Now"
            />
          </div>
        </div>
      </Section>

      <Footer />
      <MobileCTABar />
    </div>
  );
}
