// High-end stock assets for luxury feel
import heroVideo from "@assets/generated_videos/luxury_real_estate_cinematic_tour.mp4";
import mansionGarden from "@assets/stock_images/luxury_mansion_garde_4fe305b6.jpg"; // Updated: Garden view (no cars)
import estateExterior from "@assets/stock_images/luxury_estate_exteri_063918c6.jpg";
import livingRoom from "@assets/stock_images/luxury_living_room_i_5a41ac4c.jpg";
import kitchen from "@assets/stock_images/luxury_kitchen_inter_aacfdbcc.jpg";
import commercialBuilding from "@assets/stock_images/modern_glass_office__dae0368d.jpg";
import masterBedroom from "@assets/stock_images/luxury_master_bedroo_91c6bf2f.jpg";
import poolTwilight from "@assets/stock_images/luxury_backyard_pool_114490e2.jpg";
import homeOffice from "@assets/stock_images/luxury_home_office_i_a3f83978.jpg";
import spaBathroom from "@assets/stock_images/luxury_bathroom_spa__8f82a893.jpg";
import walkInCloset from "@assets/stock_images/luxury_walk_in_close_6c0ce704.jpg";
import twilightPatio from "@assets/stock_images/luxury_home_exterior_2e1bee3a.jpg"; // Footer image

// Listing Images
import villaInfinity from "@assets/stock_images/modern_luxury_villa__28a2d5ad.jpg";
import frenchChateau from "@assets/stock_images/french_chateau_style_57515742.jpg";
import concreteModern from "@assets/stock_images/ultra_modern_concret_1898b29b.jpg";

// Area Images
import birminghamStreet from "@assets/stock_images/luxury_shopping_dist_961549e0.jpg";
import bloomfieldEstate from "@assets/stock_images/grand_estate_with_lo_b8bc282b.jpg";
import royalOakLoft from "@assets/stock_images/modern_luxury_loft_b_914b1900.jpg";
import northvilleVictorian from "@assets/stock_images/luxury_victorian_sty_5cf7eace.jpg";


// Map the JSON "image" keys to the actual imported assets
const imageMap: Record<string, string> = {
  // Brand assets
  "susie-hero": mansionGarden, // Fallback for video - Garden view
  
  // Feature images
  "hero-luxury-home.jpg": poolTwilight,
  "exterior-day.jpg": estateExterior,
  "living-room.jpg": livingRoom,
  "kitchen.jpg": kitchen,
  
  // Service images - ensuring uniqueness
  "home-modern": twilightPatio, // Footer / Lead Capture
  "service-buying": spaBathroom, // Aspiring lifestyle
  "service-selling": walkInCloset, // Highlighting luxury details/closet
  "service-commercial": commercialBuilding,
  
  // Listings - Unique images for each
  "listing-1": villaInfinity,
  "listing-2": frenchChateau,
  "listing-3": concreteModern,

  // Areas - Unique images for each
  "area-1": birminghamStreet,
  "area-2": bloomfieldEstate,
  "area-3": royalOakLoft,
  "area-4": northvilleVictorian,
};

// Fallback image
const fallbackImage = mansionGarden;

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
