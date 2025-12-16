import heroLuxuryHome from "@assets/generated_images/luxury_home_exterior_at_twilight.png";
import exteriorDay from "@assets/generated_images/modern_estate_exterior_sunny_day.png";
import livingRoom from "@assets/generated_images/high-end_modern_living_room.png";
import kitchen from "@assets/generated_images/luxury_gourmet_kitchen.png";

// Map the JSON "image" keys to the actual imported assets
const imageMap: Record<string, string> = {
  "hero-luxury-home.jpg": heroLuxuryHome,
  "exterior-day.jpg": exteriorDay,
  "living-room.jpg": livingRoom,
  "kitchen.jpg": kitchen,
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
