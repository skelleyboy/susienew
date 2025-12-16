// Real images from susiesharak.com
import susieProfile from "@assets/susie_images/profile.jpg";
import susieHero from "@assets/susie_images/hero.jpg";
import homeModern from "@assets/susie_images/home_modern.jpg";
import buyingService from "@assets/susie_images/buying.jpg";
import sellingService from "@assets/susie_images/selling.jpg";
import commercialService from "@assets/susie_images/commercial.jpg";

// Map the JSON "image" keys to the actual imported assets
const imageMap: Record<string, string> = {
  // Generated fallbacks replaced with real images
  "hero-luxury-home.jpg": susieHero,
  "exterior-day.jpg": homeModern,
  "living-room.jpg": buyingService, // Using real interior/service shots
  "kitchen.jpg": sellingService, // Using real interior/service shots
  
  // Real assets keys (can be used in JSON)
  "susie-profile": susieProfile,
  "susie-hero": susieHero,
  "home-modern": homeModern,
  "service-buying": buyingService,
  "service-selling": sellingService,
  "service-commercial": commercialService,
};

// Fallback image - use a high quality real image
const fallbackImage = susieHero;

export function getImage(key: string): string {
  if (!key) return fallbackImage;
  // If it's already a full URL (external), return it
  if (key.startsWith("http")) return key;
  // Return mapped image or fallback
  return imageMap[key] || fallbackImage;
}
