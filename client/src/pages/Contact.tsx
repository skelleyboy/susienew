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
      
      <div className="pt-32 pb-12 bg-primary text-white text-center">
        <h1 className="font-serif text-5xl mb-4">Inquire</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          For private consultation regarding the acquisition or sale of significant properties, please contact us directly.
        </p>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h2 className="font-serif text-3xl mb-8">Direct Line</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${siteData.phone}`} className="text-lg hover:text-accent transition-colors">{siteData.phone}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${siteData.email}`} className="text-lg hover:text-accent transition-colors">{siteData.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Office</p>
                  <p className="text-lg">{siteData.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 border border-gray-100 shadow-xl">
            <LeadForm />
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
