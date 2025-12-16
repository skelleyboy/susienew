// High-end stock assets for luxury feel
import heroVideo from "@assets/generated_videos/luxury_real_estate_cinematic_tour.mp4";
import mansionExterior from "@assets/stock_images/luxury_modern_mansio_d6dbb395.jpg";
import livingRoom from "@assets/stock_images/luxury_living_room_i_5a41ac4c.jpg";
import kitchen from "@assets/stock_images/luxury_kitchen_inter_aacfdbcc.jpg";
import detailArch from "@assets/stock_images/modern_architecture__83fa55d0.jpg";

// Map the JSON "image" keys to the actual imported assets
const imageMap: Record<string, string> = {
  // Brand assets
  "susie-hero": mansionExterior, // Fallback for video
  
  // Feature images
  "hero-luxury-home.jpg": mansionExterior,
  "exterior-day.jpg": mansionExterior,
  "living-room.jpg": livingRoom,
  "kitchen.jpg": kitchen,
  
  // Service images
  "home-modern": detailArch,
  "service-buying": livingRoom,
  "service-selling": kitchen,
  "service-commercial": detailArch,
};

// Fallback image
const fallbackImage = mansionExterior;

export function getImage(key: string): string {
  if (!key) return fallbackImage;
  // If it's already a full URL (external), return it
  if (key.startsWith("http")) return key;
  // Return mapped image or fallback
  return imageMap[key] || fallbackImage;
}

export const videos = {
  hero: heroVideo
};
