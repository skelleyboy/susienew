import { Link } from "wouter";
import siteData from "@/data/site.json";
import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f1115] text-white pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-20">
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-8 tracking-tight">Susie Sharak</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-8 font-light max-w-xs">
              Premier real estate agent serving Downriver & Oakland County with a focus on luxury service and exceptional results.
            </p>
            <div className="flex gap-4">
              <a href={siteData.socials.instagram} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteData.socials.facebook} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={siteData.socials.linkedin} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn" className="text-white/80 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 text-accent">Navigation</h4>
            <div className="flex flex-col space-y-4 text-sm text-white/80 font-light tracking-wide">
              <Link href="/buy" className="hover:text-white transition-colors">Buy a Home</Link>
              <Link href="/sell" className="hover:text-white transition-colors">Sell Your Home</Link>
              <Link href="/communities" className="hover:text-white transition-colors">Featured Areas</Link>
              <Link href="/home-value" className="hover:text-white transition-colors">Home Valuation</Link>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm text-white/80 font-light tracking-wide">
              <li><a href={`mailto:${siteData.email}`} className="hover:text-white transition-colors">{siteData.email}</a></li>
              <li><a href={`tel:${siteData.phone}`} className="hover:text-white transition-colors">{siteData.phone}</a></li>
              <li className="text-white/80">{siteData.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 text-accent">Newsletter</h4>
            <p className="text-white/80 text-sm mb-4 font-light">Market updates and off market listings.</p>
            <form 
              className="flex gap-2" 
              name="newsletter" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={(e) => {
                // Let the default form submission happen for Netlify if js is disabled,
                // but since we preventDefault here, we might need to handle submission differently or remove preventDefault.
                // For Netlify forms with React, usually a hidden form is needed or just standard submission.
                // But typically with React we might want to handle it via fetch, or just let it submit.
                // If we want simple Netlify form handling without fetch, we can remove onSubmit or do e.target.submit()
                // However, standard practice for static sites is often just letting it post.
                // Let's remove e.preventDefault() if we want it to actually post to Netlify, 
                // OR implement a fetch submission.
                // Given "mockup mode" often implies visual, but the user asked for "needed code for netlify forms",
                // we should add the attributes.
                // To keep SPA behavior, we usually fetch.
                // But for simplicity in this context, let's just add attributes and keep the preventDefault as a placeholder
                // or remove it to allow testing if deployed.
                // For now, I will keep the visual behavior but add the attributes.
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                fetch("/", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams(formData as any).toString(),
                }).then(() => alert("Thanks for subscribing!")).catch((error) => alert(error));
              }}
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </p>
              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border-b border-white/20 text-white placeholder:text-white/50 text-xs px-0 py-2 w-full focus:outline-none focus:border-accent transition-colors font-light tracking-wide rounded-none"
              />
              <button type="submit" className="text-white/90 hover:text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white/5 transition-all border-b border-transparent hover:border-white/20">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Susie Sharak. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="https://designgandalf.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Website by Gandalf</a>
            </div>
          </div>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-semibold hover:text-white transition-colors"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
