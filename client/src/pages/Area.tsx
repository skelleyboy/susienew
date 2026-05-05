import { useParams } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import areas from "@/data/areas.json";
import { Check } from "lucide-react";
import { getImage } from "@/lib/images";
import { useSEO } from "@/hooks/use-seo";

export default function AreaPage() {
  const params = useParams();
  const slug = params.slug;
  const area = areas.find(a => a.slug === slug);

  if (!area) return <div>Area not found</div>;

  useSEO({
    title: `Top Real Estate Agent in ${area.name}, MI | Buy & Sell Homes | Susie Sharak`,
    description: `Looking to sell your house in ${area.name}, Michigan? Discover the lifestyle, real estate, and community. Explore market trends and find your dream home.`,
    canonicalUrl: `https://susiesharak.com/area/${slug}`
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline={`Living in ${area.name}`}
        subhead="Discover the lifestyle, real estate, and community."
        image={getImage(area.image)}
      />
      
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl mb-6">The Essence of {area.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {area.description}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {/* Dummy text for length */}
              Celebrated for its uncompromising quality of life, {area.name} represents the pinnacle of Michigan living. A harmonious blend of heritage and modernity, it attracts those who seek not just a home, but a legacy.
            </p>

            <h3 className="font-serif text-2xl mb-4 mt-12">Selling Your Home in {area.name}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              If you are looking to sell your house in {area.name} Michigan, you need a marketing strategy that highlights the unique value of your property. We leverage targeted digital campaigns, professional staging, and our extensive network to connect your home with qualified buyers.
            </p>

            <h3 className="font-serif text-2xl mb-4 mt-12">Home Buyers in {area.name}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              For home buyers in {area.name}, the market offers a diverse range of properties from historic estates to modern new builds. We provide exclusive access to off-market listings and guide you through every step of the purchasing process.
            </p>

            <h3 className="font-serif text-2xl mb-4 mt-12">Distinguishing Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-muted/50">
                  <Check className="text-accent w-5 h-5" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 p-4 bg-muted/50">
                <Check className="text-accent w-5 h-5" />
                <span className="font-medium">Strong Community</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50">
                <Check className="text-accent w-5 h-5" />
                <span className="font-medium">Excellent Dining</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-primary text-white p-8 mb-8">
                <h3 className="font-serif text-2xl mb-2">Market Intelligence</h3>
                <p className="text-white/60 text-sm mb-6">Real time data for {area.name}</p>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Median Price</p>
                    <p className="font-serif text-2xl">$450,000</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Avg. Days on Market</p>
                    <p className="font-serif text-2xl">12 Days</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Active Listings</p>
                    <p className="font-serif text-2xl">45</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 p-8 shadow-lg">
                <LeadForm 
                  title={`What's My ${area.name} Home Worth?`} 
                  subtitle="Get a professional valuation of your property." 
                  ctaText="Get Home Value"
                  formName={`area-valuation-${area.slug}`}
                />
              </div>
              <div className="bg-white border border-gray-100 p-8 shadow-lg mt-6">
                <LeadForm 
                  title={`Get ${area.name} Listings`} 
                  subtitle="Receive curated opportunities directly to your inbox." 
                  ctaText="View Listings"
                  formName={`area-inquiry-${area.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
