import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/ui/LeadForm";
import siteData from "@/data/site.json";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-40 pb-20 bg-[#0f1115] text-white text-center">
        <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-6">Get in Touch</span>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 font-light tracking-tight">Inquire</h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
          For private consultation regarding the acquisition or sale of significant properties, please contact us directly.
        </p>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-4xl mb-8 font-light">Direct Line</h2>
              <div className="w-12 h-px bg-primary/20 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                We are available to discuss your real estate goals at your convenience. Please reach out via your preferred method below.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="p-4 border border-gray-100 group-hover:border-accent/50 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Phone</p>
                  <a href={`tel:${siteData.phone}`} className="font-serif text-2xl hover:text-accent transition-colors">{siteData.phone}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="p-4 border border-gray-100 group-hover:border-accent/50 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Email</p>
                  <a href={`mailto:${siteData.email}`} className="font-serif text-2xl hover:text-accent transition-colors">{siteData.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 border border-gray-100 group-hover:border-accent/50 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Office</p>
                  <p className="font-serif text-2xl">{siteData.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f8f8f8] p-10 md:p-14">
            <LeadForm title="Send a Message" subtitle="How can we assist you today?" />
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
