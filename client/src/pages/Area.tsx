import { useParams } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import areas from "@/data/areas.json";
import { Check } from "lucide-react";
import { getImage } from "@/lib/images";

export default function AreaPage() {
  const params = useParams();
  const slug = params.slug;
  const area = areas.find(a => a.slug === slug);

  if (!area) return <div>Area not found</div>;

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
                  title={`Reside in ${area.name}`} 
                  subtitle="Receive curated opportunities." 
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
