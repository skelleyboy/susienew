import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import { TestimonialSection } from "@/components/ui/TestimonialSection";
import siteData from "@/data/site.json";
import { getImage } from "@/lib/images";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero 
        headline="Meet Susie Sharak"
        subhead="Dedicated to elevating your real estate experience with integrity and expertise."
        image={getImage("about-header")}
        primaryCta="Work With Susie"
        primaryCtaLink="/contact"
      />
      
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] bg-muted relative overflow-hidden">
               <img 
                 src={getImage("susie-hero")} 
                 alt="Susie Sharak" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-xl hidden md:block max-w-xs">
              <p className="font-serif text-2xl text-primary italic">
                "Real estate is not just about transactions; it's about helping people move into their next chapter."
              </p>
            </div>
          </div>
          
          <div>
            <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">About Susie</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-primary">Your Trusted Advisor</h2>
            <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
              <p>
                With a reputation built on trust, integrity, and exceptional results, Susie Sharak has established herself as a leading force in Metro Detroit's luxury real estate market.
              </p>
              <p>
                Susie's approach is rooted in a deep understanding that buying or selling a home is one of life's most significant decisions. She combines market intelligence with a personalized touch, ensuring every client feels supported, informed, and confident throughout the process.
              </p>
              <p>
                Whether you are a first-time homebuyer or a seasoned investor, Susie brings the same level of dedication and detail to every interaction, making your goals her top priority.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100">
              {siteData.stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="font-serif text-3xl md:text-4xl text-primary mb-2">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <TestimonialSection />

      <Section background="muted">
        <div className="max-w-xl mx-auto">
          <LeadForm 
            title="Let's Connect" 
            subtitle="I'd love to hear about your real estate goals."
            formName="contact-about"
          />
        </div>
      </Section>

      <Footer />
    </div>
  );
}
