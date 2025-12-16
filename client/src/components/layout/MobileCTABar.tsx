import { Button } from "@/components/ui/button";
import { Phone, Mail, Home } from "lucide-react";
import siteData from "@/data/site.json";
import { Link } from "wouter";

export function MobileCTABar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex justify-between items-center px-4 py-3 safe-area-bottom">
      <a href={`tel:${siteData.phone}`} className="flex flex-col items-center gap-1 text-primary hover:text-accent">
        <Phone className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-wider">Call</span>
      </a>
      <Link href="/contact">
        <a className="flex flex-col items-center gap-1 text-primary hover:text-accent">
          <Mail className="w-5 h-5" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Email</span>
        </a>
      </Link>
      <Link href="/home-value">
        <a className="flex flex-col items-center gap-1 text-primary hover:text-accent">
          <Home className="w-5 h-5" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Value</span>
        </a>
      </Link>
      <Button size="sm" className="rounded-none bg-primary text-white text-xs uppercase font-bold tracking-wider h-9" asChild>
        <Link href="/contact">Schedule</Link>
      </Button>
    </div>
  );
}
