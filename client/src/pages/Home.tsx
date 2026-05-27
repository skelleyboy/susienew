import { SEO } from "@/components/SEO";
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
import { useSEO } from "@/hooks/use-seo";

// Lazy load below-the-fold components
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(module => ({ default: module.TestimonialSection })));
const LeadForm = lazy(() => import("@/components/ui/LeadForm").then(module => ({ default: module.LeadForm })));

export default function HomePage() {
  useSEO({
    title: "Susie Sharak | Top Luxury Real Estate Agent in Royal Oak, Troy & Shelby Township",
    description: "Looking for the best luxury Realtor in Royal Oak, Troy, Shelby Township, and Oakland & Macomb County? Susie Sharak is a top 5% real estate agent helping buyers and sellers get exceptional results.",
    canonicalUrl: "https://susiesharak.com"
  });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      {/* Hero - Eager loaded for LCP */}
      <Hero 
        headline="Work with the Best Realtor in Royal Oak, Troy & Shelby Township"
        subhead="Ranked among the top real estate agents in Michigan. Whether you're buying or selling a house in Oakland or Macomb County, Susie Sharak delivers top dollar results."
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

      {/* High Conversion Home Value Hook */}
      <Section background="muted" className="bg-[#f8f5f2]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          <div className="md:w-1/2 text-left">
            <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-4">Sellers</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">Curious what your home is worth?</h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
              Property values in Royal Oak, Troy, and Sterling Heights have skyrocketed. Get a free, professional valuation report delivered to your inbox to see what your home is worth today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.2em] text-xs font-medium px-8 h-14 w-full sm:w-auto shadow-lg" asChild>
                <Link href="/home-value">Get Instant Valuation</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-[0.2em] text-xs font-medium px-8 h-14 w-full sm:w-auto" asChild>
                <a href={`tel:${siteData.phone}`}>Call {siteData.phone}</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="aspect-[4/3] bg-white p-4 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <img 
                 src={getImage("home-modern")} 
                 alt="Luxury Home Valuation" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 shadow-lg max-w-[200px] hidden md:block">
                 <p className="font-serif text-2xl italic">"Sold for 15% over asking"</p>
               </div>
             </div>
          </div>
        </div>
      </Section>

      {/* The Plan / Process Section */}
      <Section>
        <div className="text-center mb-24">
          <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">The Process</span>
          <div className="flex justify-center mb-6">
             <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-primary/10 shadow-lg">
               <img 
                 src={getImage("susie-hero")} 
                 alt="Susie Sharak" 
                 className="w-full h-full object-cover object-top"
               />
             </div>
          </div>
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
          <Link href="/buy" className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center cursor-pointer">
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
              <div className="mt-8 flex items-center justify-center text-white text-sm tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                Find Your Home <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
          <Link href="/sell" className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center cursor-pointer">
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
              <div className="mt-8 flex items-center justify-center text-white text-sm tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                Sell Your Home <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {areas.slice(0, 4).map((area) => (
            <AreaCard key={area.slug} area={area as any} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="link" className="text-primary hover:text-accent uppercase tracking-widest text-xs font-bold p-0" asChild>
            <Link href="/communities">Explore All Communities <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section background="muted">
        <div className="text-center mb-16">
          <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">Recent Record Sale</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">2632 Hawthorne Dr</h2>
          <p className="text-muted-foreground">See how our strategic marketing delivers results.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto items-center">
           <div className="md:w-1/2">
             <div className="aspect-[4/3] bg-white p-4 shadow-xl">
               <img 
                 src={getImage("home-modern")} 
                 alt="2632 Hawthorne Dr Sold Property" 
                 className="w-full h-full object-cover"
               />
             </div>
           </div>
           <div className="md:w-1/2 text-left space-y-6">
              <h3 className="font-serif text-3xl">Sold Over Asking in Days</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                 When the owners of 2632 Hawthorne Dr reached out, they needed a targeted approach. Through our exclusive network and professional staging, we positioned this property perfectly for the local market, resulting in a swift, record-breaking sale.
              </p>
              <ul className="space-y-4 pt-4 border-t border-gray-200">
                <li className="flex items-center gap-3">
                  <span className="font-bold text-primary w-24 uppercase text-xs tracking-wider">Location</span>
                  <span className="text-muted-foreground">Shelby Township, MI</span>
                </li>
                 <li className="flex items-center gap-3">
                  <span className="font-bold text-primary w-24 uppercase text-xs tracking-wider">Result</span>
                  <span className="text-accent font-medium">Multiple Offers, Over Asking</span>
                </li>
              </ul>
              <div className="pt-6">
                <Button size="lg" className="rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.2em] text-xs font-medium px-8" asChild>
                  <Link href="/sell">Sell Your Home With Us</Link>
                </Button>
              </div>
           </div>
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
              The market is shifting. Don't make a move without the latest intelligence. Download our exclusive guide to understand exactly what's happening in Oakland & Macomb County luxury real estate and avoid costly mistakes.
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
                formName="market-guide"
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
