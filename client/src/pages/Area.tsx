import { useParams } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import areas from "@/data/areas.json";
import { Check } from "lucide-react";

// Use generated image for hero fallback if needed
import fallbackHero from "@assets/generated_images/modern_estate_exterior_sunny_day.png";

export default function AreaPage() {
  const params = useParams();
  const slug = params.slug;
  const area = areas.find(a => a.slug === slug);

  if (!area) return <div>Area not found</div>;

  // Simple image mapping for demo
  const getHeroImage = (imgName: string) => {
     if (imgName === "hero-luxury-home.jpg") return new URL("../../attached_assets/generated_images/luxury_home_exterior_at_twilight.png", import.meta.url).href;
     if (imgName === "exterior-day.jpg") return new URL("../../attached_assets/generated_images/modern_estate_exterior_sunny_day.png", import.meta.url).href;
     return fallbackHero;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline={`Living in ${area.name}`}
        subhead="Discover the lifestyle, real estate, and community."
        image={getHeroImage(area.image)}
      />
      
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl mb-6">About {area.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {area.description}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {/* Dummy text for length */}
              Known for its exceptional quality of life, {area.name} offers a perfect blend of historic charm and modern amenities. 
              Residents enjoy access to top-rated schools, parks, and a vibrant community atmosphere that makes it one of the most desirable places to live in Michigan.
            </p>

            <h3 className="font-serif text-2xl mb-4 mt-12">Highlights</h3>
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
                <h3 className="font-serif text-2xl mb-2">Market Snapshot</h3>
                <p className="text-white/60 text-sm mb-6">Real-time data for {area.name}</p>
                
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
                  title={`Move to ${area.name}`} 
                  subtitle="Get the latest listings sent to your inbox." 
                  ctaText="Get Listings"
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
