import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import siteData from "@/data/site.json";
import { Link } from "wouter";

export function MobileCTABar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f1115] border-t border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50 flex justify-between items-center px-4 py-3 safe-area-bottom backdrop-blur-lg">
      <div className="flex gap-4">
        <a href={`tel:${siteData.phone}`} className="flex flex-col items-center justify-center text-white/80 hover:text-white transition-colors">
          <Phone className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
          <span className="text-[9px] uppercase font-medium tracking-[0.1em]">Call</span>
        </a>
        <a href={`sms:${siteData.phone}`} className="flex flex-col items-center justify-center text-white/80 hover:text-white transition-colors">
          <Mail className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
          <span className="text-[9px] uppercase font-medium tracking-[0.1em]">Text</span>
        </a>
      </div>
      <div className="text-white/90 font-serif tracking-widest text-[11px] sm:text-xs text-center flex-1">
        {siteData.phone}
      </div>
      <Button size="sm" className="rounded-none bg-white text-primary hover:bg-white/90 text-[10px] uppercase font-bold tracking-[0.2em] h-9 px-4" asChild>
        <Link href="/contact">Contact</Link>
      </Button>
    </div>
  );
}
