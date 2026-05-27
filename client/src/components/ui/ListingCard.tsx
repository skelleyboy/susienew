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
    <Link href={`/buy`}>
      <div className={cn("group relative h-[500px] overflow-hidden cursor-pointer bg-black", className)}>
        <img 
          src={getImage(listing.image)} 
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1600596542815-27b88e57e609?auto=format&fit=crop&q=80&w=800";
          }}
          alt={listing.address}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-40"
        />
        
        <div className="absolute top-6 left-6 z-10 bg-white text-black px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium shadow-sm">
          {listing.status}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
              {listing.address}
            </h3>
            <p className="text-white/80 text-sm uppercase tracking-widest mb-6">
              {listing.city}, {listing.state}
            </p>
            
            <div className="flex gap-4 sm:gap-6 text-xs text-white/90 font-medium uppercase tracking-widest pt-6 border-t border-white/20">
              <span>{listing.beds} Beds</span>
              <span>{listing.baths} Baths</span>
              <span>{listing.sqft.toLocaleString()} Sq Ft</span>
            </div>
            
            <p className="font-serif text-3xl text-white mt-6">
              {formatPrice(listing.price)}
            </p>

            <div className="mt-8 flex items-center text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
              View Property <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
