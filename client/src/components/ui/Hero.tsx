import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  headline: string;
  subhead: string;
  image: string;
  video?: string;
  primaryCta?: string;
  primaryCtaLink?: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
}

export function Hero({
  headline,
  subhead,
  image,
  video,
  primaryCta = "Schedule a Call",
  primaryCtaLink = "/contact",
  secondaryCta = "Get Home Value",
  secondaryCtaLink = "/home-value"
}: HeroProps) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center">
      {/* Background Image/Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={image} 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg">
            {headline}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light tracking-wide">
            {subhead}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold min-w-[200px]"
            asChild
          >
            <Link href={primaryCtaLink}>{primaryCta}</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white/10 hover:text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold min-w-[200px]"
            asChild
          >
            <Link href={secondaryCtaLink}>{secondaryCta}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
