export type ProductSpec = {
  metal: string;
  gemstones: string;
  craftsmanship: string;
  weight?: string;
  dimensions?: string;
  certification: string;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  status: "Made to Order" | "Ready to Ship" | "Out of Stock";
  image: string;
  gallery: string[];
  category: "Necklaces" | "Earrings" | "Bracelets" | "Bridal";
  collection?: string;
  description: string;
  story: string;
  specs: ProductSpec;
  dispatchTime: string;
};

export const products: Product[] = [
  {
    id: "ruhnoor",
    name: "Ruhnoor Cuff",
    subtitle: "22k Gold & Hand-Set Uncut Diamond Cuff",
    price: 9400,
    status: "Made to Order",
    image: "/images/real-shot-1.jpg",
    gallery: [
      "/images/real-shot-1.jpg",
      "/images/real-shot-2.jpg",
      "/images/real-shot-3.jpg",
      "/images/real-shot-4.jpg",
    ],
    category: "Bracelets",
    collection: "Celestial Heritage",
    description:
      "Forged from 22k gold with hand-set uncut Polki diamonds, the Ruhnoor Cuff is a modern heirloom that speaks of quiet power. Each cuff is individually cast by master artisans in our Jaipur atelier, featuring precise bezel settings that cradle natural gemstones catching light from every angle.",
    story:
      "Inspired by the architectural arches of Amber Fort, the lattice structure of the Ruhnoor Cuff balances historical royal majesty with sleek contemporary wearability.",
    specs: {
      metal: "22k Yellow Gold (BIS Hallmarked)",
      gemstones: "Natural Uncut Diamonds (Polki) & South Sea Seed Pearls",
      craftsmanship: "Handcrafted Jadau & Reverse Meenakari Enameling",
      weight: "38.5 grams",
      dimensions: "Inner diameter 58mm (Custom sizing available)",
      certification: "SGL Gemstone & BIS Hallmark Certified",
    },
    dispatchTime: "Ships in 2–3 weeks from design confirmation",
  },
  {
    id: "iraaya",
    name: "Iraaya Choker",
    subtitle: "Kundan & Emerald Accent Regal Collar",
    price: 4300,
    status: "Made to Order",
    image: "/images/real-shot-3.jpg",
    gallery: [
      "/images/real-shot-3.jpg",
      "/images/real-shot-4.jpg",
      "/images/real-shot-5.jpg",
      "/images/real-shot-6.jpg",
    ],
    category: "Necklaces",
    collection: "Celestial Heritage",
    description:
      "Inspired by the traditional royal chokers of Rajasthan, the Iraaya wraps the neck in cascading Kundan work framed by seed pearls and deep green emerald drops. The flexible gold lattice ensures comfortable, contouring wear through hours of celebratory events.",
    story:
      "Every stone in the Iraaya Choker is individually selected for color brilliance and set into foil-backed gold cells, recreating authentic 18th-century courtly splendor.",
    specs: {
      metal: "18k & 22k Gold Plated Silver Base",
      gemstones: "Fine Kundan Glass, Hydro Emerald Drops & Cultured Pearls",
      craftsmanship: "Authentic Jaipur Kundan Setting with Dori Fastening",
      weight: "62.0 grams",
      dimensions: "Adjustable silk dori cord (fits all neck sizes)",
      certification: "Zevar Baksa Authenticity Card",
    },
    dispatchTime: "Ships in 10–14 business days",
  },
  {
    id: "noorzaan",
    name: "Noorzaan Jhumka",
    subtitle: "Carved Meenakari & Pearl Statement Jhumkas",
    price: 8300,
    status: "Ready to Ship",
    image: "/images/real-shot-5.jpg",
    gallery: [
      "/images/real-shot-5.jpg",
      "/images/real-shot-6.jpg",
      "/images/real-shot-7.jpg",
      "/images/real-shot-8.jpg",
    ],
    category: "Earrings",
    collection: "Celestial Heritage",
    description:
      "These statement jhumkas sway with deliberate grace. The upper floral stud leads to a hand-enameled dome intricately decorated with ruby-pink Meenakari detailing, suspended above clusters of micro seed pearls.",
    story:
      "Handmade by third-generation Jaipur enamellers, Noorzaan captures the poetic movement of royal courtyard dancers in lightweight, wearable art.",
    specs: {
      metal: "22k Gold Plated Brass & Silver Alloy",
      gemstones: "Synthetic Rubies, Cubic Zirconia & Fresh Water Pearl Clusters",
      craftsmanship: "Intricate Hand Meenakari & Pearl Stringing",
      weight: "24.2 grams per pair",
      dimensions: "Length: 7.5cm | Width: 3.2cm",
      certification: "Zevar Baksa Certificate of Guarantee",
    },
    dispatchTime: "Dispatches within 48 hours",
  },
  {
    id: "nishat",
    name: "Nishat Bridal Set",
    subtitle: "Complete Royal Heirloom Parure (Necklace, Earrings & Tikka)",
    price: 14840,
    status: "Out of Stock",
    image: "/images/real-shot-7.jpg",
    gallery: [
      "/images/real-shot-7.jpg",
      "/images/real-shot-8.jpg",
      "/images/real-shot-1.jpg",
      "/images/real-shot-2.jpg",
    ],
    category: "Bridal",
    collection: "Celestial Heritage",
    description:
      "The ultimate crown jewel — a masterwork bridal set crafted over 160 artisan hours. Features a layered multi-strand necklace, matching chandelier earrings, and an ornate maang tikka set with Zambian emerald cabochons and natural Polki diamonds.",
    story:
      "Reserved for wedding celebrations of distinction, Nishat embodies the grand wedding heritage of Rajput royalty, created to become your family's treasured heirloom.",
    specs: {
      metal: "22k Solid Yellow Gold (BIS Hallmarked)",
      gemstones: "Zambian Emerald Cabochons, Certified Uncut Polki Diamonds",
      craftsmanship: "Hand-carved Gold Wirework & Royal Jadau",
      weight: "145.0 grams total set weight",
      dimensions: "Necklace inner perimeter 42cm; Earrings length 9cm",
      certification: "IGLI International Gemological Certificate & BIS Hallmark",
    },
    dispatchTime: "Bespoke order: 4–6 weeks crafting cycle",
  },
  {
    id: "ruhvika",
    name: "Ruhvika Earring",
    subtitle: "Crescent Pearl & Polki Chandbalis",
    price: 4100,
    status: "Made to Order",
    image: "/images/real-shot-2.jpg",
    gallery: [
      "/images/real-shot-2.jpg",
      "/images/real-shot-4.jpg",
      "/images/real-shot-6.jpg",
      "/images/real-shot-8.jpg",
    ],
    category: "Earrings",
    collection: "Celestial Heritage",
    description:
      "Echoing the shape of the crescent moon, the Ruhvika Chandbali pairs sparkling uncut glass Kundan with delicate pearl fringe work. Elegant yet lightweight for festive soirees.",
    story:
      "A tribute to moonlit evenings in Rajasthan, designed to frame the face with gentle radiance and royal grace.",
    specs: {
      metal: "18k Gold Plated Brass",
      gemstones: "Uncut Kundan Stones & Cultured Seed Pearls",
      craftsmanship: "Traditional Chandbali Casting & Hand Stringing",
      weight: "18.5 grams per pair",
      dimensions: "Length: 6.0cm | Width: 4.5cm",
      certification: "Zevar Baksa Guarantee Card",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "meherbani",
    name: "Meherbani Necklace",
    subtitle: "Multi-Tiered Polki & Ruby Drop Necklace",
    price: 12600,
    status: "Ready to Ship",
    image: "/images/real-shot-6.jpg",
    gallery: [
      "/images/real-shot-6.jpg",
      "/images/real-shot-5.jpg",
      "/images/real-shot-3.jpg",
      "/images/real-shot-1.jpg",
    ],
    category: "Necklaces",
    collection: "Celestial Heritage",
    description:
      "A showstopping neckpiece composed of multi-strand gold beads culminating in a central motif encrusted with rubies and Polki diamonds. Comes with a matching pair of drop earrings.",
    story:
      "Designed for grand celebrations, Meherbani combines rich crimson hues with shimmering gold to celebrate warmth, prosperity, and love.",
    specs: {
      metal: "22k Gold Plated Silver",
      gemstones: "Faceted Rubies, Uncut Glass Kundan & Gold Micro Beads",
      craftsmanship: "Multi-strand Weaving & Hand-Pave Setting",
      weight: "84.0 grams",
      dimensions: "Adjustable back silk cord (14in to 20in)",
      certification: "Zevar Baksa Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
