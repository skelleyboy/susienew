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
      <div className={cn("group relative aspect-[3/4] overflow-hidden cursor-pointer bg-gray-100", className)}>
        <img 
          src={imgSrc} 
          alt={area.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        
        <div className="absolute bottom-0 left-0 p-10 w-full transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
          <h3 className="font-serif text-3xl text-white mb-3 tracking-wide">
            {area.name}
          </h3>
          <div className="h-px w-12 bg-white/60 mb-6 group-hover:w-24 transition-all duration-500" />
          <ul className="text-white/90 text-sm space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0 font-light tracking-wide">
            {area.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
