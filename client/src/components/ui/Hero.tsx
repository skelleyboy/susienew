import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getImage } from "@/lib/images";
import siteData from "@/data/site.json";

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
    <section className="relative min-h-[100svh] md:min-h-[600px] md:h-[90vh] w-full overflow-hidden flex items-center justify-center text-center pt-32 pb-24 md:pt-0 md:pb-0">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8 leading-tight drop-shadow-lg font-light tracking-tight">
            {headline}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="font-sans text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            {subhead}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="bg-white/95 backdrop-blur-md pl-2 pr-3 sm:pr-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 sm:gap-3 shadow-xl border border-white/20 scale-90 sm:scale-100 origin-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
               <img src={getImage("susie-hero")} alt="Susie Sharak" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <img src="/zillow-logo.svg" alt="Zillow" className="h-4 object-contain" />
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-3 h-3 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#006AFF] tracking-wider uppercase">Premier Agent</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-[10px] text-gray-600 font-medium tracking-wide">Top 5% Realtor</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4"
        >
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 rounded-none px-6 py-5 sm:px-10 sm:py-7 uppercase tracking-[0.2em] text-xs font-medium w-full sm:w-auto sm:min-w-[220px] transition-all duration-300"
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
            className="border-white text-white hover:bg-white hover:text-primary rounded-none px-6 py-5 sm:px-10 sm:py-7 uppercase tracking-[0.2em] text-xs font-medium w-full sm:w-auto sm:min-w-[220px] backdrop-blur-sm transition-all duration-300"
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
          <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4 text-white/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <a href={`tel:${siteData.phone}`} className="font-medium tracking-wider hover:text-white transition-colors">{siteData.phone}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
