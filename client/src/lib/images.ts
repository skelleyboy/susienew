import heroLuxuryHome from "@assets/generated_images/luxury_home_exterior_at_twilight.png";
import exteriorDay from "@assets/generated_images/modern_estate_exterior_sunny_day.png";
import livingRoom from "@assets/generated_images/high-end_modern_living_room.png";
import kitchen from "@assets/generated_images/luxury_gourmet_kitchen.png";

// Real images from susiesharak.com
import susieProfile from "@assets/susie_images/profile.jpg";
import susieHero from "@assets/susie_images/hero.jpg";
import homeModern from "@assets/susie_images/home_modern.jpg";
import buyingService from "@assets/susie_images/buying.jpg";
import sellingService from "@assets/susie_images/selling.jpg";
import commercialService from "@assets/susie_images/commercial.jpg";

// Map the JSON "image" keys to the actual imported assets
const imageMap: Record<string, string> = {
  // Generated fallbacks
  "hero-luxury-home.jpg": susieHero, // Use real hero
  "exterior-day.jpg": homeModern, // Use real home
  "living-room.jpg": livingRoom,
  "kitchen.jpg": kitchen,
  
  // Real assets keys (can be used in JSON)
  "susie-profile": susieProfile,
  "susie-hero": susieHero,
  "home-modern": homeModern,
  "service-buying": buyingService,
  "service-selling": sellingService,
  "service-commercial": commercialService,
};

// Fallback image
const fallbackImage = exteriorDay;

export function getImage(key: string): string {
  if (!key) return fallbackImage;
  // If it's already a full URL (external), return it
  if (key.startsWith("http")) return key;
  // Return mapped image or fallback
  return imageMap[key] || fallbackImage;
}
