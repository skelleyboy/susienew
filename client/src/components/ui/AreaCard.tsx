import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { getImage } from "@/lib/images";

interface Area {
  id: string;
  name: string;
  slug: string;
  image: string;
  highlights: string[];
}

interface AreaCardProps {
  area: Area;
  className?: string;
}

export function AreaCard({ area, className }: AreaCardProps) {
  const imgSrc = getImage(area.image);

  return (
    <Link href={`/area/${area.slug}`}>
      <div className={cn("group relative aspect-[3/4] overflow-hidden cursor-pointer", className)}>
        <img 
          src={imgSrc} 
          alt={area.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h3 className="font-serif text-2xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
            {area.name}
          </h3>
          <div className="h-0.5 w-12 bg-accent mb-4 group-hover:w-20 transition-all duration-300" />
          <ul className="text-white/80 text-sm space-y-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            {area.highlights.map((highlight, idx) => (
              <li key={idx}>• {highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
