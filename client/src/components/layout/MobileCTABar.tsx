import { Button } from "@/components/ui/button";
import { Phone, Mail, Home } from "lucide-react";
import siteData from "@/data/site.json";
import { Link } from "wouter";

export function MobileCTABar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f1115] border-t border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50 flex justify-between items-center px-6 py-4 safe-area-bottom backdrop-blur-lg">
      <a href={`tel:${siteData.phone}`} className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors">
        <Phone className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[9px] uppercase font-medium tracking-[0.2em]">Call</span>
      </a>
      <Link href="/contact" className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors">
        <Mail className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[9px] uppercase font-medium tracking-[0.2em]">Email</span>
      </Link>
      <Link href="/home-value" className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors">
        <Home className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[9px] uppercase font-medium tracking-[0.2em]">Value</span>
      </Link>
      <Button size="sm" className="rounded-none bg-white text-primary hover:bg-white/90 text-[10px] uppercase font-bold tracking-[0.2em] h-10 px-6 ml-2" asChild>
        <Link href="/contact">Book</Link>
      </Button>
    </div>
  );
}
