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
import { getImage } from "@/lib/images";

// Import generated hero image
import heroVideo from "@assets/generated_videos/luxury_home_exterior_slow_pan.mp4";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      {/* Hero */}
      <Hero 
        headline="Detroit Luxury Real Estate"
        subhead="Top 5% Agent in Detroit Tri County Area. Your Stress Free Path to Your Dream Home."
        image={getImage("susie-hero")}
        video={heroVideo}
        primaryCta="Start Your Journey"
        secondaryCta="Get Your Valuation"
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
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Zillow & Realtor.com Premier</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Plan / Process Section */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Your Stress Free Path to Success</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We know navigating the market can be overwhelming. We've simplified the journey into three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent font-serif text-2xl font-bold">1</div>
            <h3 className="font-serif text-2xl mb-4">Book a Free Intro</h3>
            <p className="text-muted-foreground leading-relaxed">
              Schedule a 15 minute consultation to discuss your goals. No pressure, just expert advice tailored to your needs.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent font-serif text-2xl font-bold">2</div>
            <h3 className="font-serif text-2xl mb-4">We Build Your Plan</h3>
            <p className="text-muted-foreground leading-relaxed">
              Whether buying or selling, we create a custom strategy to get you the best deal possible with 24/7 support.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent font-serif text-2xl font-bold">3</div>
            <h3 className="font-serif text-2xl mb-4">Celebrate Success</h3>
            <p className="text-muted-foreground leading-relaxed">
              Close with confidence and move into your new chapter. We handle the details so you can enjoy the result.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-widest text-xs font-bold px-8" asChild>
            <Link href="/contact">Book Your Free Consultation</Link>
          </Button>
        </div>
      </Section>

      {/* Buy / Sell Paths */}
      <Section className="bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-500 h-[500px] flex flex-col justify-end">
            <div className="absolute inset-0">
              <img src={getImage("service-buying")} alt="Buying" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="relative z-10 p-8 md:p-12 text-white">
              <Home className="w-10 h-10 text-accent mb-6" />
              <h3 className="font-serif text-3xl mb-4">Find the One That's Not on Zillow</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Most luxury homes never hit the public market. Don't miss out on your dream home because you didn't have access. We open doors to exclusive, off market properties.
              </p>
              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-primary uppercase tracking-widest text-xs font-bold px-8" asChild>
                <Link href="/buy">Access Private Listings</Link>
              </Button>
            </div>
          </div>
          <div className="group relative overflow-hidden bg-primary shadow-sm hover:shadow-md transition-all duration-500 h-[500px] flex flex-col justify-end">
            <div className="absolute inset-0">
              <img src={getImage("service-selling")} alt="Selling" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="relative z-10 p-8 md:p-12 text-white">
              <TrendingUp className="w-10 h-10 text-accent mb-6" />
              <h3 className="font-serif text-3xl mb-4">Sell with Confidence, Not Compromise</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Selling a luxury estate requires more than a sign in the yard. It requires a narrative. We craft a compelling story for your home that attracts qualified buyers.
              </p>
              <Button className="rounded-none bg-accent text-white hover:bg-accent/90 uppercase tracking-widest text-xs font-bold px-8" asChild>
                <Link href="/sell">Create Your Strategy</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Areas */}
      <Section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl mb-4">Your Next Chapter Begins Here</h2>
            <p className="text-muted-foreground max-w-lg">Choose the community that fits the lifestyle you've worked hard to build.</p>
          </div>
          <Button variant="link" className="hidden md:flex text-primary hover:text-accent uppercase tracking-widest text-xs font-bold p-0" asChild>
            <Link href="/communities">Explore All Communities <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.slice(0, 4).map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="link" className="text-primary hover:text-accent uppercase tracking-widest text-xs font-bold p-0" asChild>
            <Link href="/communities">Explore All Communities <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* Featured Listings */}
      <Section background="muted">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Homes That Tell a Story</h2>
          <p className="text-muted-foreground">Discover a curated selection of residences ready for their next legacy.</p>
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
              Stop Guessing. Get the Blueprint.
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              The market is shifting. Don't make a move without the latest intelligence. Download our exclusive guide to understand exactly what's happening in Metro Detroit luxury real estate and avoid costly mistakes.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Award className="text-accent w-5 h-5" />
                <span className="font-medium">Avoid Overpaying in a Hot Market</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="text-accent w-5 h-5" />
                <span className="font-medium">Find Hidden Neighborhood Gems</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="text-accent w-5 h-5" />
                <span className="font-medium">Secure Off Market Opportunities</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white text-foreground p-8 md:p-12 shadow-2xl max-w-md mx-auto w-full">
            <LeadForm 
              title="Get Your Market Guide" 
              subtitle="Where should we send your blueprint?" 
              ctaText="Send Me the Guide"
            />
          </div>
        </div>
      </Section>

      <Footer />
      <MobileCTABar />
    </div>
  );
}
