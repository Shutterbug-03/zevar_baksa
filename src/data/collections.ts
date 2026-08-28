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
        id: "p1",
        name: "P1 Bird Pendant",
        tagline: "925 Silver • 24K Gold Kundan & Enamel",
        description: "A delicate bird-shaped pendant in 925 silver with rich enamel detailing and 24K gold Kundan accent.",
        image: "/images/products/p1-1.jpg",
        price: "₹5,800",
        cta: "Explore P1 Pendant",
      },
      {
        id: "p2",
        name: "P2 Sculptural Bird Pendant",
        tagline: "24K Gold • Emerald, Ruby & Polki",
        description: "Handcrafted in 24K gold adorned with emeralds, rubies and luminous polki on a fine pearl strand.",
        image: "/images/products/p2.png",
        price: "₹28,500",
        cta: "Explore P2 Pendant",
      },
      {
        id: "p3",
        name: "P3 Polki Bird Pendant",
        tagline: "24K Gold • Kundan Polki & Pearls",
        description: "Delicate bird silhouette in pure 24K gold with traditional Kundan polki setting on a fine pearl necklace.",
        image: "/images/products/p3.png",
        price: "₹24,800",
        cta: "Explore P3 Pendant",
      },
      {
        id: "p4",
        name: "P4 Ruby Enamel Pendant",
        tagline: "925 Silver • Green Enamel & Ruby",
        description: "925 silver with rich green enamel, 24K gold bezel work framing a vibrant ruby on a pearl strand.",
        image: "/images/products/p4.png",
        price: "₹5,400",
        cta: "Explore P4 Pendant",
      },
      {
        id: "p5",
        name: "P5 Engraved Sapphire Pendant",
        tagline: "925 Silver • Emerald & Blue Sapphire",
        description: "Hand-engraved motifs in 925 silver with emerald and blue sapphire set in 24K gold Kundan.",
        image: "/images/products/p5.png",
        price: "₹7,200",
        cta: "Explore P5 Pendant",
      },
      {
        id: "p6",
        name: "P6 Lotus Emerald Drop Pendant",
        tagline: "24K Gold • Polki & Emerald Drop",
        description: "Lotus bud pendant in 24K gold with pink/green enamel, Polki work, and a radiant emerald drop.",
        image: "/images/products/p6.png",
        price: "₹18,600",
        cta: "Explore P6 Pendant",
      },
      {
        id: "p7",
        name: "P7 Floral Paisley Pendant",
        tagline: "24K Gold • Polki & Multi-Color Enamel",
        description: "Statement 24K gold floral paisley composition with central Kundan polki and fine pearl strand.",
        image: "/images/products/p7.png",
        price: "₹26,400",
        cta: "Explore P7 Pendant",
      },
      {
        id: "p8",
        name: "P8 Botanical Medallion Pendant",
        tagline: "Silver & Copper Base • White Enamel",
        description: "Intricate floral motif medallion in silver over copper base with soft white background.",
        image: "/images/products/p8.png",
        price: "₹6,800",
        cta: "Explore P8 Pendant",
      },
      {
        id: "p9",
        name: "P9 Cerulean Hummingbird Pendant",
        tagline: "Solid Silver • Blue & Green Enamel",
        description: "Oval silver pendant featuring an in-flight hummingbird motif in vivid blue & green cloisonné enamel.",
        image: "/images/products/p9.png",
        price: "₹7,600",
        cta: "Explore P9 Pendant",
      },
      {
        id: "e1",
        name: "E1 Bird Motif Drop Earrings",
        tagline: "Copper & Silver Base • Soft Pink Enamel",
        description: "Delicately hand-painted bird drop earrings on pastel pink enamel with wire hooks.",
        image: "/images/products/e1.png",
        price: "₹4,800",
        cta: "Explore E1 Earrings",
      },
      {
        id: "e2",
        name: "E2 Miniature Art Drop Earrings",
        tagline: "Copper & Silver Base • Deep Red Enamel",
        description: "Intricately hand-painted courtly miniature figures against a rich deep-red enamel background.",
        image: "/images/products/e2.png",
        price: "₹5,200",
        cta: "Explore E2 Earrings",
      },
      {
        id: "e3",
        name: "E3 Gold Flora Stud Earrings",
        tagline: "Copper & Silver Base • Soft Blue Enamel",
        description: "Ornate hand-painted floral motif in warm gold tones against a powder blue enamel background.",
        image: "/images/products/e3.png",
        price: "₹4,600",
        cta: "Explore E3 Earrings",
      },
      {
        id: "e4",
        name: "E4 Avian & Blossom Stud Earrings",
        tagline: "Copper & Silver Base • Soft Green Enamel",
        description: "Hand-painted bluebirds and blooming rosebuds on oval pistachio green enamel discs.",
        image: "/images/products/e4.png",
        price: "₹4,900",
        cta: "Explore E4 Earrings",
      },
      {
        id: "e5",
        name: "E5 Midnight Rose Drop Earrings",
        tagline: "Copper & Silver Base • Jet Black Enamel",
        description: "Romantic blushing pink lotus blossoms hand-painted on jet black enamel drop medallions.",
        image: "/images/products/e5.png",
        price: "₹4,700",
        cta: "Explore E5 Earrings",
      },
      {
        id: "e6",
        name: "E6 Cobalt Blossom Stud Earrings",
        tagline: "Copper & Silver Base • Cobalt Blue Enamel",
        description: "Warm pink and yellow petals blooming on a radiant royal blue enamel background.",
        image: "/images/products/e6.png",
        price: "₹4,500",
        cta: "Explore E6 Earrings",
      },
      {
        id: "e7",
        name: "E7 Turquoise Geometric Engraved Studs",
        tagline: "Copper & Silver Base • Vivid Turquoise Enamel",
        description: "Engraved geometric floral relief with brilliant turquoise blue cloisonné enamel inlay.",
        image: "/images/products/e7.png",
        price: "₹4,300",
        cta: "Explore E7 Earrings",
      },
      {
        id: "e8",
        name: "E8 Royal Blue Avian Medallion Studs",
        tagline: "Copper & Silver Base • Cobalt Blue Enamel",
        description: "Gilded bird and floral tracery on midnight cobalt blue enamel with polished silver bezel.",
        image: "/images/products/e8.png",
        price: "₹5,100",
        cta: "Explore E8 Earrings",
      },
      {
        id: "e9",
        name: "E9 Modernist Abstract Drop Earrings",
        tagline: "Copper & Silver Base • Multi-Color Enamel",
        description: "Vibrant abstract color blocking in vermilion, ochre, cobalt, and jade with silver lines.",
        image: "/images/products/e9.png",
        price: "₹4,800",
        cta: "Explore E9 Earrings",
      },
      {
        id: "e10",
        name: "E10 Art Deco Fan Drop Earrings",
        tagline: "Copper & Silver Base • Rose & Black Enamel",
        description: "Sculptural fan silhouette featuring alternating blush pink and black enamel flutes.",
        image: "/images/products/e10.png",
        price: "₹5,000",
        cta: "Explore E10 Earrings",
      },
      {
        id: "e11",
        name: "E11 Violet Botanical Drop Earrings",
        tagline: "Copper & Silver Base • Royal Violet Enamel",
        description: "Crisp white floral petals hand-painted against a royal violet enamel ground on drop hooks.",
        image: "/images/products/e11.png",
        price: "₹4,900",
        cta: "Explore E11 Earrings",
      },
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
