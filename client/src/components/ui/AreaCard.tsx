import { Link } from "wouter";
import { cn } from "@/lib/utils";

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
  // Helper to handle image paths for demo
  const getImagePath = (img: string) => {
    if (img.startsWith('http')) return img;
    // Map JSON names to generated file names for this demo
    if (img === "hero-luxury-home.jpg") return "luxury_home_exterior_at_twilight.png";
    if (img === "exterior-day.jpg") return "modern_estate_exterior_sunny_day.png";
    if (img === "living-room.jpg") return "high-end_modern_living_room.png";
    if (img === "kitchen.jpg") return "luxury_gourmet_kitchen.png";
    return img;
  };

  // Import logic is tricky in dynamic strings without real imports in Vite for this mockup mode.
  // We'll use the absolute path approach supported by the tool for now or fallback URLs.
  // Since we can't dynamic import easily in this specific constrained environment without a map, 
  // we will rely on the fact that we can reference assets if they are in public or use the tool's return paths.
  // For simplicity in this prototype, I will use the `attached_assets` path directly if possible or `src` import if hardcoded.
  // Actually, standard <img> src works with /src/... in Vite dev but better to move to public? 
  // No, `attached_assets` are served. I will use a direct import map in the component for simplicity.

  const imageMap: Record<string, string> = {
    "hero-luxury-home.jpg": new URL("../../attached_assets/generated_images/luxury_home_exterior_at_twilight.png", import.meta.url).href,
    "exterior-day.jpg": new URL("../../attached_assets/generated_images/modern_estate_exterior_sunny_day.png", import.meta.url).href,
    "living-room.jpg": new URL("../../attached_assets/generated_images/high-end_modern_living_room.png", import.meta.url).href,
    "kitchen.jpg": new URL("../../attached_assets/generated_images/luxury_gourmet_kitchen.png", import.meta.url).href,
  };

  const imgSrc = imageMap[area.image] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800";

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
