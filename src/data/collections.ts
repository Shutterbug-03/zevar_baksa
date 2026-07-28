export interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  cta: string;
}

export interface Collection {
  slug: string;
  name: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  items: CollectionItem[];
}

export const collections: Collection[] = [
  {
    slug: "celestial-heritage",
    name: "Celestial Heritage",
    subtitle: "Constellations in Gold & Uncut Polki",
    heroTitle: "Celestial Heritage",
    heroSubtitle:
      "A tribute to Rajasthan's starlit skies — each piece channels the radiance of constellations into gold, polki, and precious gemstones.",
    heroImage: "/images/real-shot-2.jpg",
    items: [
      {
        id: "ruhnoor",
        name: "Ruhnoor Cuff",
        tagline: "Wrist Armour, Reimagined",
        description:
          "Forged from 22k gold with hand-set uncut diamonds, the Ruhnoor Cuff is a modern heirloom that speaks of quiet power. Each cuff is individually cast by master artisans in our Jaipur atelier, taking over 120 hours of meticulous handwork.",
        image: "/images/real-shot-1.jpg",
        price: "₹9,400",
        cta: "Explore Ruhnoor",
      },
      {
        id: "iraaya",
        name: "Iraaya Choker",
        tagline: "The Collar of Queens",
        description:
          "Inspired by the chokers worn by Rajasthani royalty, the Iraaya wraps the neck in cascading Kundan work framed by seed pearls and deep green emerald drops.",
        image: "/images/real-shot-3.jpg",
        price: "₹4,300",
        cta: "Discover Iraaya",
      },
      {
        id: "noorzaan",
        name: "Noorzaan Jhumka",
        tagline: "Movement & Light",
        description:
          "These statement jhumkas sway with deliberate grace — the dome engraved with floral Meenakari, suspended by delicate gold chains that catch every whisper of movement.",
        image: "/images/real-shot-5.jpg",
        price: "₹8,300",
        cta: "View Noorzaan",
      },
      {
        id: "nishat",
        name: "Nishat Bridal Set",
        tagline: "Your Forever Heirloom",
        description:
          "The crown jewel of our Celestial Heritage collection — a complete bridal parure of necklace, earrings, maang tikka, and haath phool set with Zambian emeralds.",
        image: "/images/real-shot-7.jpg",
        price: "₹14,840",
        cta: "Explore Nishat",
      },
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
