import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import siteData from "@/data/site.json";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/buy", label: "Buy" },
    { href: "/sell", label: "Sell" },
    { href: "/communities", label: "Communities" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-sm py-4 shadow-sm border-gray-100 text-primary"
          : "bg-transparent py-6 text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight font-medium hover:opacity-80 transition-opacity">
          Susie Sharak
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[11px] font-medium uppercase tracking-[0.2em] hover:text-accent transition-colors duration-300 relative group">
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href={`tel:${siteData.phone}`} className="text-[11px] font-medium tracking-[0.1em] hover:text-accent transition-colors">
            {siteData.phone}
          </a>
          <Button 
            className={cn(
              "rounded-none px-8 uppercase tracking-[0.2em] text-[10px] font-semibold h-12 transition-all duration-300",
              scrolled || !isHome ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"
            )}
            asChild
          >
            <Link href="/contact">Schedule a Call</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu" className={scrolled || !isHome ? "text-primary" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white text-primary pt-12">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-xl font-serif font-medium hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8 border-t pt-8">
                  <p className="text-sm text-muted-foreground mb-4">Get in touch</p>
                  <Button className="w-full rounded-none uppercase tracking-widest" asChild>
                    <Link href="/contact">Schedule a Call</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
