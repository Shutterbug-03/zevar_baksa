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
  story?: {
    meenakariHistory: string;
    artisanDesigner: string;
    founderNote: string;
    philosophy: string;
    makingFormats: string[];
    careInstructions: string[];
  };
  items: CollectionItem[];
}

export const collections: Collection[] = [
  {
    slug: "mina-bagh",
    name: "Mina Bagh",
    subtitle: "The Devotion of Permanent Colour — Meenakari & Gold",
    heroTitle: "Mina Bagh",
    heroSubtitle:
      "Meenakari is the art of placing colour onto metal and making it permanent. Fired at 750°C, each piece is a collaboration between centuries of Jaipur tradition and modern design.",
    heroImage: "/images/real-shot-2.jpg",
    story: {
      meenakariHistory:
        "The name comes from the Persian 'mina', meaning paradise. The craft travelled from Persia into the Mughal court, and from there to Jaipur, where it found the hands that would keep it alive for centuries. A single piece passes through many artisans before it is finished, each adding what the last could not, then fired at close to 750°C — fused to metal by heat that forgives nothing.",
      artisanDesigner:
        "Deepak Sankit (Designer/Artisan) was born into this craft. Seven generations of jewellers came before him, and he picked up the brush his elders once put in his hands as a child, choosing to carry the family's legacy forward.",
      founderNote:
        "For Tanishka (Founder), meenakari has always stood apart: a craft where colour becomes permanent, where patience shows in places no one thinks to look. It was the kind of artistry she wanted the brand built around from the start. Not decoration, but devotion, fired into metal.",
      philosophy:
        "A woman chooses to wear what another woman once wore. She does not inherit it passively, she chooses it again, the way Deepak chooses the bench each morning. The thread survives because someone, generation after generation, decides to pick it up. Not a craft to be sold quickly, but one to be understood, and then worn.",
      makingFormats: [
        "925 Silver",
        "925 Silver with Gold Plating",
        "22kt Gold"
      ],
      careInstructions: [
        "Keep your piece dry. Remove it before swimming, showering, or exercising.",
        "Avoid direct contact with perfume, sweat, and liquids — they can affect enamel and plating over time.",
        "Store in a soft pouch away from direct sunlight and abrasive surfaces.",
        "Clean gently with a soft, dry cloth. Avoid harsh chemicals or ultrasonic cleaners.",
        "925 silver pieces naturally oxidise over time. Gentle polishing with a silver cloth restores shine.",
        "22kt gold pieces are naturally soft; handle with care to avoid bending or scratching."
      ]
    },
    items: [
      {
        id: "mina-choker",
        name: "Mina Paradise Choker",
        tagline: "Fired Enamel & Hand-carved Gold",
        description:
          "Intricate Jaipur Meenakari in royal green and crimson enamel, set in 925 silver with 22kt gold plating. Designed by Tanishka and crafted in collaboration with Deepak Sankit.",
        image: "/images/real-shot-1.jpg",
        price: "₹12,500",
        cta: "Explore Mina Choker",
      },
      {
        id: "bagh-jhumka",
        name: "Bagh Meenakari Jhumka",
        tagline: "750°C Enamel & Pearl Drops",
        description:
          "Hand-painted floral motifs on solid silver & gold plating, carrying 7 generations of Sankit family expertise. Lightweight yet opulent.",
        image: "/images/real-shot-3.jpg",
        price: "₹8,900",
        cta: "Discover Bagh Jhumka",
      },
      {
        id: "mina-ring",
        name: "Persian Rose Mina Ring",
        tagline: "Permanent Colour on Metal",
        description:
          "A statement cocktail ring capturing paradise motifs. Available in 925 silver, 18kt gold plated silver, or solid 22kt gold upon request.",
        image: "/images/real-shot-5.jpg",
        price: "₹6,400",
        cta: "View Mina Ring",
      },
      {
        id: "mina-bangle-set",
        name: "Mina Bagh Royal Kangan",
        tagline: "Heritage Jaipur Artistry",
        description:
          "Paired bangles with intricate reverse Meenakari detailing, ensuring beauty both inside and out.",
        image: "/images/real-shot-7.jpg",
        price: "₹16,800",
        cta: "Explore Royal Kangan",
      },
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
