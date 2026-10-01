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
    slug: "meena-bagh",
    name: "Meena Bagh",
    subtitle: "The Devotion of Permanent Colour — Meenakari & Gold",
    heroTitle: "Meena Bagh",
    heroSubtitle:
      "Meenakari is the art of placing colour onto metal and making it permanent. The name comes from the Persian mina, meaning paradise, and the craft travelled from Persia into the Mughal court, and from there to Jaipur, where it found the hands that would keep it alive for centuries to come.",
    heroImage: "/meena-bagh-bg.jpg",
    story: {
      meenakariHistory:
        "A single piece passes through many artisans before it is finished, each one adding what the last could not, then fired at close to 750°C, fused to metal by heat that forgives nothing.",
      artisanDesigner:
        "Deepak Sankit (Designer/Artisan) was born into this craft. He continues the ritual and tradition seven generations of jewellers followed before him. He picks up the same tools which once made jewellery for the royals and now carries the family's legacy forward.",
      founderNote:
        "For Tanishka (Founder), Meenakari has always stood apart: a craft where colour becomes permanent, where patience is shown in places one thinks not to look. It was the kind of artistry she wanted the brand built around from the start. Not decoration, but devotion, fired into metal.",
      philosophy:
        "The collection is meant to be timeless, something to be passed down to generations, something they choose. It is meant to be chosen everyday, the same way Deepak chooses to sit on the bench his predecessors sat at. The thread does not survive because it was handed down. It survives because someone, generation after generation, decides to pick it up.\n\nIt’s a craft to sit with, to be indulged in.",
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
        id: "p1",
        name: "Sugga",
        tagline: "925 Silver • 24K Gold Kundan & Enamel",
        description: "A delicate bird-shaped pendant in 925 silver with rich enamel detailing and 24K gold Kundan accent.",
        image: "/images/products/p1-1.jpg",
        price: "₹16,000",
        cta: "Explore Sugga Pendant",
      },
      {
        id: "p2",
        name: "Rangila",
        tagline: "24K Gold • Emerald, Ruby & Polki",
        description: "Handcrafted in 24K gold adorned with emeralds, rubies and luminous polki on a fine pearl strand.",
        image: "/images/products/p2-1.jpg",
        price: "₹1,05,000",
        cta: "Explore Rangila Pendant",
      },
      {
        id: "p3",
        name: "Bulbul",
        tagline: "24K Gold • Kundan Polki & Pearls",
        description: "Delicate bird silhouette in pure 24K gold with traditional Kundan polki setting on a fine pearl necklace.",
        image: "/images/products/p3-1.jpg",
        price: "₹90,000",
        cta: "Explore Bulbul Pendant",
      },
      {
        id: "p4",
        name: "Manik",
        tagline: "925 Silver • Green Enamel & Ruby",
        description: "925 silver with rich green enamel, 24K gold bezel work framing a vibrant ruby on a pearl strand.",
        image: "/images/products/p4-1.jpg",
        price: "₹17,000",
        cta: "Explore Manik Pendant",
      },
      {
        id: "p5",
        name: "Kalapi",
        tagline: "925 Silver • Emerald & Blue Sapphire",
        description: "Hand-engraved motifs in 925 silver with emerald and blue sapphire set in 24K gold Kundan.",
        image: "/images/products/p5-1.jpg",
        price: "₹21,000",
        cta: "Explore Kalapi Pendant",
      },
      {
        id: "p6",
        name: "Boond",
        tagline: "24K Gold • Polki & Emerald Drop",
        description: "Lotus bud pendant in 24K gold with pink/green enamel, Polki work, and a radiant emerald drop.",
        image: "/images/products/p6-1.jpg",
        price: "₹73,000",
        cta: "Explore Boond Pendant",
      },
      {
        id: "p7",
        name: "Naksh-e-Gul",
        tagline: "24K Gold • Polki & Multi-Color Enamel",
        description: "Statement 24K gold floral paisley composition with central Kundan polki and fine pearl strand.",
        image: "/images/products/p7-1.jpg",
        price: "₹1,20,000",
        cta: "Explore Naksh-e-Gul Pendant",
      },
      {
        id: "p8",
        name: "Sunehri",
        tagline: "Silver & Copper Base • White Enamel",
        description: "Intricate floral motif medallion in silver over copper base with soft white background.",
        image: "/images/products/p8-1.jpg",
        price: "₹10,000",
        cta: "Explore Sunehri Pendant",
      },
      {
        id: "p9",
        name: "Parwaaz",
        tagline: "Solid Silver • Blue & Green Enamel",
        description: "Oval silver pendant featuring an in-flight hummingbird motif in vivid blue & green cloisonné enamel.",
        image: "/images/products/p9-1.jpg",
        price: "₹11,000",
        cta: "Explore Parwaaz Pendant",
      },
      {
        id: "e1",
        name: "Neel",
        tagline: "Copper & Silver Base • Soft Pink Enamel",
        description: "Delicately hand-painted bird drop earrings on pastel pink enamel with wire hooks.",
        image: "/images/products/e1-1.jpg",
        price: "₹11,000",
        cta: "Explore Neel Earrings",
      },
      {
        id: "e2",
        name: "Darbar",
        tagline: "Copper & Silver Base • Deep Red Enamel",
        description: "Intricately hand-painted courtly miniature figures against a rich deep-red enamel background.",
        image: "/images/products/e2-1.jpg",
        price: "₹16,000",
        cta: "Explore Darbar Earrings",
      },
      {
        id: "e3",
        name: "Kanak",
        tagline: "Copper & Silver Base • Soft Blue Enamel",
        description: "Ornate hand-painted floral motif in warm gold tones against a powder blue enamel background.",
        image: "/images/products/e3-1.jpg",
        price: "₹11,000",
        cta: "Explore Kanak Earrings",
      },
      {
        id: "e4",
        name: "Gul",
        tagline: "Copper & Silver Base • Soft Green Enamel",
        description: "Hand-painted bluebirds and blooming rosebuds on oval pistachio green enamel discs.",
        image: "/images/products/e4-1.jpg",
        price: "₹11,000",
        cta: "Explore Gul Earrings",
      },
      {
        id: "e5",
        name: "Gulabi",
        tagline: "Copper & Silver Base • Jet Black Enamel",
        description: "Romantic blushing pink lotus blossoms hand-painted on jet black enamel drop medallions.",
        image: "/images/products/e5-1.jpg",
        price: "₹11,000",
        cta: "Explore Gulabi Earrings",
      },
      {
        id: "e6",
        name: "Gulnaar",
        tagline: "Copper & Silver Base • Cobalt Blue Enamel",
        description: "Warm pink and yellow petals blooming on a radiant royal blue enamel background.",
        image: "/images/products/e6-1.jpg",
        price: "₹11,000",
        cta: "Explore Gulnaar Earrings",
      },
      {
        id: "e7",
        name: "Aabha",
        tagline: "Copper & Silver Base • Vivid Turquoise Enamel",
        description: "Engraved geometric floral relief with brilliant turquoise blue cloisonné enamel inlay.",
        image: "/images/products/e7-1.jpg",
        price: "₹8,500",
        cta: "Explore Aabha Earrings",
      },
      {
        id: "e8",
        name: "Pankhuri",
        tagline: "Copper & Silver Base • Cobalt Blue Enamel",
        description: "Gilded bird and floral tracery on midnight cobalt blue enamel with polished silver bezel.",
        image: "/images/products/e8-2.jpg",
        price: "₹11,000",
        cta: "Explore Pankhuri Earrings",
      },
      {
        id: "e9",
        name: "Rang",
        tagline: "Copper & Silver Base • Multi-Color Enamel",
        description: "Vibrant abstract color blocking in vermilion, ochre, cobalt, and jade with silver lines.",
        image: "/images/products/e9-1.jpg",
        price: "₹10,000",
        cta: "Explore Rang Earrings",
      },
      {
        id: "e10",
        name: "Leher",
        tagline: "Copper & Silver Base • Rose & Black Enamel",
        description: "Sculptural fan silhouette featuring alternating blush pink and black enamel flutes.",
        image: "/images/products/e10-1.jpg",
        price: "₹10,000",
        cta: "Explore Leher Earrings",
      },
      {
        id: "e11",
        name: "Neelkamal",
        tagline: "Copper & Silver Base • Royal Violet Enamel",
        description: "Crisp white floral petals hand-painted against a royal violet enamel ground on drop hooks.",
        image: "/images/products/e11-1.jpg",
        price: "₹10,000",
        cta: "Explore Neelkamal Earrings",
      },
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
