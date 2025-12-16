import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/lib/images";

interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: string;
}

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn("group cursor-pointer", className)}>
      <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
        <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium text-primary shadow-sm">
          {listing.status}
        </div>
        <img 
          src={getImage(listing.image)} 
          onError={(e) => {
            // Fallback handled by getImage usually, but if load fails:
            e.currentTarget.src = "https://images.unsplash.com/photo-1600596542815-27b88e57e609?auto=format&fit=crop&q=80&w=800";
          }}
          alt={listing.address}
          loading="lazy"
          width="400"
          height="533"
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
      </div>
      
      <div className="space-y-3 text-center">
        <h3 className="font-serif text-2xl text-primary group-hover:text-accent transition-colors duration-300">
          {listing.address}
        </h3>
        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          {listing.city}, {listing.state}
        </p>
        <div className="flex justify-center gap-6 text-xs text-primary/60 font-medium uppercase tracking-widest pt-2 border-t border-gray-100 w-3/4 mx-auto">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.sqft.toLocaleString()} Sq Ft</span>
        </div>
        <p className="font-serif text-xl text-primary pt-1">
          {formatPrice(listing.price)}
        </p>
      </div>
    </div>
  );
}
