import { Suspense, lazy } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { ListingCard } from "@/components/ui/ListingCard";
import { AreaCard } from "@/components/ui/AreaCard";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Award } from "lucide-react";
import siteData from "@/data/site.json";
import listings from "@/data/listings.json";
import areas from "@/data/areas.json";
import { getImage, videos } from "@/lib/images";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load below-the-fold components
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(module => ({ default: module.TestimonialSection })));
const LeadForm = lazy(() => import("@/components/ui/LeadForm").then(module => ({ default: module.LeadForm })));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      {/* Hero - Eager loaded for LCP */}
      <Hero 
        headline="Detroit Luxury Real Estate"
        subhead="Top 5% Agent in Detroit Tri County Area. Your Stress Free Path to Your Dream Home."
        image={getImage("hero-luxury-home.jpg")}
        video={videos.hero}
        primaryCta="Start Your Journey"
        secondaryCta="Get Your Valuation"
      />

      {/* Trust Row */}
      <div className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-end">
            {siteData.stats.map((stat, idx) => (
              <div key={idx} className="space-y-4 group">
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light transition-transform duration-700 group-hover:-translate-y-2">{stat.value}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
            <div className="space-y-4 group">
              <div className="flex justify-center text-accent gap-1 transition-transform duration-700 group-hover:-translate-y-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">Zillow Premier Agent</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Plan / Process Section */}
      <Section>
        <div className="text-center mb-24">
          <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">The Process</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 font-light text-primary">Your Stress Free Path</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We know navigating the market can be overwhelming. We've simplified the journey into three refined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 border border-gray-100 rounded-full flex items-center justify-center mb-10 text-primary font-serif text-3xl italic group-hover:bg-primary group-hover:text-white transition-all duration-500">1</div>
            <h3 className="font-serif text-3xl mb-6">Consultation</h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              Schedule a 15 minute consultation to discuss your goals. No pressure, just expert advice tailored to your needs.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 border border-gray-100 rounded-full flex items-center justify-center mb-10 text-primary font-serif text-3xl italic group-hover:bg-primary group-hover:text-white transition-all duration-500">2</div>
            <h3 className="font-serif text-3xl mb-6">Strategy</h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              Whether buying or selling, we create a custom strategy to get you the best deal possible with 24/7 support.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 border border-gray-100 rounded-full flex items-center justify-center mb-10 text-primary font-serif text-3xl italic group-hover:bg-primary group-hover:text-white transition-all duration-500">3</div>
            <h3 className="font-serif text-3xl mb-6">Celebration</h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              Close with confidence and move into your new chapter. We handle the details so you can enjoy the result.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-20">
          <Button size="lg" className="rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.2em] text-xs font-medium px-10 py-6" asChild>
            <Link href="/contact">Book Your Consultation</Link>
          </Button>
        </div>
      </Section>

      {/* Buy / Sell Paths */}
      <Section className="bg-muted/20 px-0 md:px-0 py-0 md:py-0" container={false}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0">
              <img 
                src={getImage("service-buying")} 
                alt="Buying" 
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                loading="lazy"
                width="800"
                height="800"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />
            </div>
            <div className="relative z-10 p-12 text-white max-w-lg mx-auto transform transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
              <span className="text-xs uppercase tracking-[0.3em] mb-6 block opacity-80">Buying</span>
              <h3 className="font-serif text-4xl md:text-5xl mb-8 font-light">Exclusive Access</h3>
              <p className="text-white/90 mb-10 leading-relaxed font-light text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                Access off market properties and hidden gems before they reach the public eye.
              </p>
              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-primary uppercase tracking-[0.2em] text-xs font-medium px-8 py-6" asChild>
                <Link href="/buy">Find Your Home</Link>
              </Button>
            </div>
          </div>
          <div className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0">
              <img 
                src={getImage("service-selling")} 
                alt="Selling" 
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                loading="lazy"
                width="800"
                height="800"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />
            </div>
            <div className="relative z-10 p-12 text-white max-w-lg mx-auto transform transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
              <span className="text-xs uppercase tracking-[0.3em] mb-6 block opacity-80">Selling</span>
              <h3 className="font-serif text-4xl md:text-5xl mb-8 font-light">Strategic Marketing</h3>
              <p className="text-white/90 mb-10 leading-relaxed font-light text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                Showcase your property with a narrative that commands attention and maximizes value.
              </p>
              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-primary uppercase tracking-[0.2em] text-xs font-medium px-8 py-6" asChild>
                <Link href="/sell">Sell Your Home</Link>
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
      <Suspense fallback={<div className="py-20" />}>
        <TestimonialSection />
      </Suspense>

      {/* Lead Capture / Guide */}
      <Section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImage("home-modern")} 
            alt="Luxury Home" 
            className="w-full h-full object-cover"
            loading="lazy"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-white w-full">
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
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <LeadForm 
                title="Get Your Market Guide" 
                subtitle="Where should we send your blueprint?" 
                ctaText="Send Me the Guide"
              />
            </Suspense>
          </div>
        </div>
      </Section>

      <Footer />
      <MobileCTABar />
    </div>
  );
}
