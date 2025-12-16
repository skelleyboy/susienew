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
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-100">
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-widest font-semibold text-primary">
          {listing.status}
        </div>
        <img 
          src={getImage(listing.image)} 
          onError={(e) => {
            // Fallback handled by getImage usually, but if load fails:
            e.currentTarget.src = "https://images.unsplash.com/photo-1600596542815-27b88e57e609?auto=format&fit=crop&q=80&w=800";
          }}
          alt={listing.address}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-accent transition-colors">
            {listing.address}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            {listing.city}, {listing.state} {listing.zip}
          </p>
          <div className="flex gap-4 text-xs text-primary/80 font-medium uppercase tracking-wide">
            <span>{listing.beds} Beds</span>
            <span className="w-px h-3 bg-gray-300" />
            <span>{listing.baths} Baths</span>
            <span className="w-px h-3 bg-gray-300" />
            <span>{listing.sqft.toLocaleString()} Sq Ft</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-xl text-primary mb-2">
            {formatPrice(listing.price)}
          </p>
          <Link href={`/listing/${listing.id}`} className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors" aria-label={`View listing at ${listing.address}`}>
            View <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
