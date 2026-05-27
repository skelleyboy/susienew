import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getImage } from "@/lib/images";

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
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center text-center pt-24 md:pt-0">
      {/* Background Image/Video with Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
          />
        ) : (
          <img 
            src={image} 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
        )}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl mt-16 md:mt-0">
        

          
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex justify-center mb-8"
        >
          <div className="bg-white/95 backdrop-blur-md pl-2 pr-4 sm:pr-6 py-2 sm:py-2 rounded-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shadow-xl border border-white/20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 hidden sm:block">
               <img src={getImage("susie-hero")} alt="Susie Sharak" className="w-full h-full object-cover object-top" />
            </div>
            <img src="/zillow-logo.svg" alt="Zillow" className="h-6 sm:h-7 object-contain mb-1 sm:mb-0" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col text-center sm:text-left border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4 border-gray-200 w-full sm:w-auto">
              <span className="text-[10px] sm:text-xs font-bold text-[#006AFF] tracking-wider uppercase">Premier Agent</span>
              <span className="text-[9px] sm:text-[10px] text-gray-600 font-medium tracking-wide">Top 5% Realtor</span>
            </div>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight drop-shadow-lg font-light tracking-tight">
            {headline}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="font-sans text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            {subhead}
          </p>
        </motion.div>
        
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex md:hidden justify-center mb-6"
        >
          <div className="bg-white/95 backdrop-blur-md pl-2 pr-4 sm:pr-6 py-2 sm:py-2 rounded-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shadow-xl border border-white/20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 hidden sm:block">
               <img src={getImage("susie-hero")} alt="Susie Sharak" className="w-full h-full object-cover object-top" />
            </div>
            <img src="/zillow-logo.svg" alt="Zillow" className="h-6 sm:h-7 object-contain mb-1 sm:mb-0" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col text-center sm:text-left border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4 border-gray-200 w-full sm:w-auto">
              <span className="text-[10px] sm:text-xs font-bold text-[#006AFF] tracking-wider uppercase">Premier Agent</span>
              <span className="text-[9px] sm:text-[10px] text-gray-600 font-medium tracking-wide">Top 5% Realtor</span>
            </div>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="hidden"
        >
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 rounded-none px-10 py-7 uppercase tracking-[0.2em] text-xs font-medium min-w-[220px] transition-all duration-300"
            asChild
          >
            {primaryCtaLink.startsWith('#') ? (
              <a href={primaryCtaLink} onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(primaryCtaLink);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}>{primaryCta}</a>
            ) : (
              <Link href={primaryCtaLink}>{primaryCta}</Link>
            )}
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary rounded-none px-10 py-7 uppercase tracking-[0.2em] text-xs font-medium min-w-[220px] backdrop-blur-sm transition-all duration-300"
            asChild
          >
            {secondaryCtaLink?.startsWith('#') ? (
              <a href={secondaryCtaLink} onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(secondaryCtaLink);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}>{secondaryCta}</a>
            ) : (
              <Link href={secondaryCtaLink}>{secondaryCta}</Link>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
