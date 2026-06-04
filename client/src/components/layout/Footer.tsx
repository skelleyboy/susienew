import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import areas from "@/data/areas.json";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#15191e] text-white/80 pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif text-white mb-2">Susie Sharak</h3>
              <p className="text-sm tracking-widest uppercase text-white/50">Luxury Real Estate</p>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Top 5% real estate agent providing unparalleled service, strategic marketing, and exclusive access to Oakland & Macomb County's finest properties.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/susiesharakrealtor" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/susiesharak" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/buy" className="hover:text-primary transition-colors text-sm">Buy a Home</Link></li>
              <li><Link href="/sell" className="hover:text-primary transition-colors text-sm">Sell Your Home</Link></li>
              <li><Link href="/communities" className="hover:text-primary transition-colors text-sm">Communities</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors text-sm">About Susie</Link></li>
              <li><Link href="/home-value" className="hover:text-primary transition-colors text-sm">Home Valuation</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors text-sm">Real Estate Journal</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Featured Areas</h4>
            <ul className="space-y-4">
              {areas.slice(0, 8).map(area => (
                <li key={area.slug}>
                  <Link href={`/area/${area.slug}`} className="hover:text-primary transition-colors text-sm">
                    {area.name} Real Estate
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>1120 E Long Lake Rd<br />Troy, MI 48085</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:2489436906" className="hover:text-primary transition-colors">248-943-6906</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:susie@propertypro1.com" className="hover:text-primary transition-colors">susie@propertypro1.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {currentYear} Susie Sharak Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
