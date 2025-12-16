import { Link } from "wouter";
import siteData from "@/data/site.json";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl mb-6">Susie Sharak</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premier real estate agent serving Downriver & Oakland County with a focus on luxury service and exceptional results.
            </p>
            <div className="flex gap-4">
              <a href={siteData.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteData.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={siteData.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest font-semibold mb-6 text-accent">Navigation</h4>
            <div className="flex flex-col space-y-4 text-sm text-white/80">
              <Link href="/buy" className="hover:text-white transition-colors">Buy a Home</Link>
              <Link href="/sell" className="hover:text-white transition-colors">Sell Your Home</Link>
              <Link href="/communities" className="hover:text-white transition-colors">Featured Areas</Link>
              <Link href="/home-value" className="hover:text-white transition-colors">Home Valuation</Link>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest font-semibold mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href={`mailto:${siteData.email}`} className="hover:text-white transition-colors">{siteData.email}</a></li>
              <li><a href={`tel:${siteData.phone}`} className="hover:text-white transition-colors">{siteData.phone}</a></li>
              <li className="text-white/60">{siteData.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest font-semibold mb-6 text-accent">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Market updates and off-market listings.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm px-4 py-2 w-full focus:outline-none focus:border-accent"
              />
              <button className="bg-white text-primary px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-white/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Susie Sharak. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
