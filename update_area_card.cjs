const fs = require('fs');

const content = `import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
  return (
    <Link href={\`/area/\${area.slug}\`}>
      <div className={cn(
        "group relative aspect-square sm:aspect-[4/5] overflow-hidden cursor-pointer bg-[#0f1115] hover:bg-black transition-colors duration-700 flex flex-col justify-center items-center text-center", 
        className
      )}>
        <div className="p-8 transform transition-transform duration-700 group-hover:-translate-y-2">
          <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
            {area.name}
          </h3>
          <div className="mt-8 flex items-center justify-center text-white/80 group-hover:text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
            Explore <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
`;

fs.writeFileSync('client/src/components/ui/AreaCard.tsx', content);
console.log('Updated AreaCard to be a big text link design');
