import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import areas from "@/data/areas.json";
import { Check, Info } from "lucide-react";
import { getImage } from "@/lib/images";
import { useSEO } from "@/hooks/use-seo";

export default function RoyalOakPage() {
  const slug = "royal-oak";
  const area = areas.find(a => a.slug === slug);

  if (!area) return <div>Area not found</div>;

  useSEO({
    title: `Best Realtor in ${area.name}, MI | Top Real Estate Agent | Susie Sharak`,
    description: `Looking for the best real estate agent to buy or sell a house in ${area.name}, Michigan? Susie Sharak offers top-tier real estate services, market trends, and luxury homes.`,
    canonicalUrl: `https://susiesharak.com/area/${slug}`
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${area.name} a good place to live?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": area.longDescription || `${area.name} represents the pinnacle of Michigan living, offering top-rated school districts, vibrant downtown areas, and a robust lifestyle for professionals, families, and retirees alike.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the housing market like in ${area.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The median home price in ${area.name} is currently ${area.marketStats?.avgPrice || "$450,000"} with homes averaging ${area.marketStats?.daysOnMarket || "12"} days on the market.`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline={`Living in ${area.name}`}
        subhead="Discover the lifestyle, real estate, and community."
        image={getImage(area.image)}
      />
      
      <Section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-muted/30 border border-muted p-6 rounded-lg mb-10 flex gap-4">
              <Info className="text-primary w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-2">TL;DR: {area.name} Real Estate</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Median home price is <strong>{area.marketStats?.avgPrice || "$450,000"}</strong>.</li>
                  <li>• Homes spend an average of <strong>{area.marketStats?.daysOnMarket || "12"} days</strong> on market.</li>
                  <li>• Renowned for {area.highlights?.[0] || 'great schools'} and {area.highlights?.[1] || 'beautiful parks'}.</li>
                  <li>• Perfect for buyers looking for {area.buyingTips?.slice(0, 80) || 'a mix of historic estates and modern new builds'}...</li>
                </ul>
              </div>
            </div>

            <h1 className="font-serif text-3xl mb-6">The Essence of {area.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {area.description}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {area.longDescription || `Celebrated for its uncompromising quality of life, ${area.name} represents the pinnacle of Michigan living. A harmonious blend of heritage and modernity, it attracts those who seek not just a home, but a legacy. From top-rated school districts to vibrant downtown areas and serene parks, ${area.name} offers a robust lifestyle for professionals, families, and retirees alike.`}
            </p>

            <h2 className="font-serif text-2xl mb-4 mt-12">Selling Your Home in {area.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {area.sellingTips || `If you are looking to sell your house in ${area.name} Michigan, you need a marketing strategy that highlights the unique value of your property. We leverage targeted digital campaigns, professional staging, and our extensive network to connect your home with qualified buyers.`}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Wondering where to start? Learn more <Link href="/about" className="text-primary hover:text-accent underline font-medium">about Susie Sharak</Link>, explore our comprehensive <Link href="/sell" className="text-primary hover:text-accent underline font-medium">selling strategy</Link>, or contact us directly to discuss your goals.
            </p>

            <h2 className="font-serif text-2xl mb-4 mt-12">Home Buyers in {area.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {area.buyingTips || `For home buyers in ${area.name}, the market offers a diverse range of properties from historic estates to modern new builds. We provide exclusive access to off-market listings and guide you through every step of the purchasing process.`}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Ready to find your dream home? <Link href="/buy" className="text-primary hover:text-accent underline font-medium">View our buying services</Link>, browse <Link href="/" className="text-primary hover:text-accent underline font-medium">our homepage</Link> for featured listings, or <Link href="/contact" className="text-primary hover:text-accent underline font-medium">contact our team</Link> to schedule a private tour.
            </p>

            <h3 className="font-serif text-2xl mb-4 mt-12">Distinguishing Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(area.highlights || []).map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-muted/50">
                  <Check className="text-accent w-5 h-5" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <h3 className="font-serif text-2xl mb-6">Explore Other Communities</h3>
              <p className="text-muted-foreground mb-6">
                Oakland and Macomb counties offer a variety of exceptional neighborhoods. If you're expanding your search beyond {area.name}, explore our local real estate guides for these nearby communities:
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {areas.filter(a => a.slug !== area.slug).map(a => (
                  <li key={a.slug} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <Link 
                      href={`/area/${a.slug}`}
                      className="text-primary hover:text-accent hover:underline font-medium transition-colors cursor-pointer"
                    >
                      {a.name} Real Estate
                    </Link>
                  </li>
                ))}
              </ul>
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
                    <p className="font-serif text-2xl">{area.marketStats?.avgPrice || "$450,000"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Avg. Days on Market</p>
                    <p className="font-serif text-2xl">{area.marketStats?.daysOnMarket || "12"} Days</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Active Listings</p>
                    <p className="font-serif text-2xl">{area.marketStats?.homesSold || "45"}</p>
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