import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { AreaCard } from "@/components/ui/AreaCard";
import areas from "@/data/areas.json";
import { getImage } from "@/lib/images";
import { useSEO } from "@/hooks/use-seo";

export default function CommunitiesPage() {
  useSEO({
    title: "Communities | Royal Oak, Troy, Shelby Township & Sterling Heights Real Estate",
    description: "Explore the diverse and vibrant neighborhoods we serve across Oakland and Macomb County including Royal Oak, Troy, Shelby Township, and more. Find the perfect luxury backdrop for your life.",
    canonicalUrl: "https://susiesharak.com/communities"
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline="Royal Oak, Troy & Sterling Heights Communities"
        subhead="Explore the diverse and vibrant neighborhoods we serve across Oakland and Macomb County."
        image={getImage("area-1")}
        primaryCta="View Areas"
        primaryCtaLink="#areas"
        secondaryCta="Contact Us"
      />
      
      <Section id="areas">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">Featured Neighborhoods</h2>
          <p className="text-muted-foreground">Find the perfect backdrop for your life.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area as any} />
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
