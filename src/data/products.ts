export type ProductSpec = {
  code?: string;
  metal: string;
  gemstones: string;
  craftsmanship: string;
  weight?: string;
  dimensions?: string;
  setting?: string;
  strand?: string;
  design?: string;
  finish?: string;
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
  /** Finer-grained type used by the shop filter; set from the BUSY item group (e.g. "Pendants"). */
  type?: "Pendant";
  collection?: string;
  description: string;
  story: string;
  specs: ProductSpec;
  dispatchTime: string;
};

export const products: Product[] = [
  // ═════════════════════════════════════════════════════════════════
  // MEENA BAGH COLLECTION — AUTHENTIC JAIPUR PENDANTS (P1 – P9)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "p1",
    name: "Sugga",
    subtitle: "925 Silver Bird Pendant with Enamel & 24K Kundan",
    price: 16000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sugga/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sugga/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sugga/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sugga/4.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A delicate bird-shaped pendant, handcrafted in 925 silver and brought to life with intricate enamel detailing and traditional Kundan work set in 24K gold. Rich green and blue tones frame the petite Kundan accent, creating a playful piece rooted in Indian craftsmanship.",
    story:
      "Rooted in centuries-old Jaipur Meenakari, the bird motif symbolizes freedom and celestial grace, rendered in kiln-fired enamel with 24K gold Kundan settings.",
    specs: {
      code: "ZB-26-MB-P-0001 (P1)",
      metal: "925 Sterling Silver",
      gemstones: "Kundan Accent & Kiln-Fired Enamel",
      craftsmanship: "Kundan & Enamel Work",
      weight: "5.754 g",
      dimensions: "Pendant Length: 3.5 cm",
      setting: "24K Gold Kundan Setting",
      finish: "Fully Handcrafted",
      certification: "925 Silver BIS Hallmarked & Atelier Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p2",
    name: "Rangila",
    subtitle: "24K Gold Bird Pendant with Emerald, Ruby & Polki",
    price: 150000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/2.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rangila/6.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A sculptural bird-shaped pendant handcrafted entirely in 24K gold, adorned with vibrant emeralds, rubies and luminous polki. Suspended from a delicate pearl strand, the piece pairs the richness of traditional Indian jewellery craftsmanship with a playful, distinctive silhouette.",
    story:
      "Sculpted in pure 24K gold, this bird silhouette pairs precious gemstone pavé with luminous uncut Polki diamonds suspended on fine pearls.",
    specs: {
      code: "ZB-26-MB-P-0002 (P2)",
      metal: "24K Gold",
      gemstones: "Natural Emeralds, Rubies & Luminous Polki",
      craftsmanship: "Handcrafted 24K Gold Setting & Jadau",
      weight: "7.05 g",
      dimensions: "Pendant Length: 3.5 cm (Total Drop: 5.0 cm)",
      strand: "Delicate Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Certified & BIS Hallmarked",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p3",
    name: "Bulbul",
    subtitle: "24K Gold Bird Pendant with Kundan Polki & Pearl Strand",
    price: 125000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/bulbul/6.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A delicate bird-shaped pendant handcrafted in 24K gold, featuring intricate detailing and a traditional Kundan polki setting. Suspended from a fine pearl strand, the piece pairs the warmth of pure gold with the subtle brilliance of polki, creating an elegant expression of traditional Indian craftsmanship.",
    story:
      "A testament to understated royal luxury, pairing 24K pure gold warmth with the antique shimmer of hand-set Polki diamonds on an ethereal pearl necklace.",
    specs: {
      code: "ZB-26-MB-P-0003 (P3)",
      metal: "24K Gold",
      gemstones: "Natural Uncut Polki Diamonds & Pearls",
      craftsmanship: "Kundan Polki Work",
      weight: "5.648 g",
      dimensions: "Pendant Length: 3.5 cm",
      strand: "Fine Natural Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Hallmark & Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p4",
    name: "Manik",
    subtitle: "925 Silver Green Enamel Bird Pendant with Ruby & 24K Gold",
    price: 20000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/manik/6.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A delicate bird-shaped pendant handcrafted in 925 silver, detailed with rich green enamel and traditional 24K gold work framing a vibrant ruby. Strung on a fine pearl strand with playful orange accents, the piece brings together colour, character and traditional Indian craftsmanship in a light, contemporary form.",
    story:
      "Rich parrot-green Jaipur enamel contrasts against fiery crimson ruby in a delicate bird silhouette made for modern daily elegance.",
    specs: {
      code: "ZB-26-MB-P-0004 (P4)",
      metal: "925 Sterling Silver",
      gemstones: "Natural Ruby & Kiln-Fired Green Enamel",
      craftsmanship: "Enamel Work & 24K Gold Bezel Setting",
      weight: "4.157 g",
      dimensions: "Pendant Length: 3.5 cm",
      setting: "24K Gold Setting",
      strand: "Fine Pearl Strand with Accent Beads",
      finish: "Fully Handcrafted",
      certification: "925 Silver BIS Hallmarked & Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p5",
    name: "Kalapi",
    subtitle: "925 Silver Hand-Engraved Bird Pendant with Emerald & Sapphire",
    price: 25000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kalapi/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kalapi/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kalapi/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kalapi/2.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kalapi/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kalapi/5.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A sculptural bird-shaped pendant handcrafted in 925 sterling silver, detailed with intricate hand-engraved motifs and vibrant emerald and blue sapphire stones set in traditional 24K gold Kundan work. With its graceful form and rich jewel-toned accents, the piece brings a contemporary character to traditional Indian craftsmanship.",
    story:
      "Deep hand-chiseled engraving across solid silver with jewel-toned emerald and royal sapphire accents set into 24K gold collets.",
    specs: {
      code: "ZB-26-MB-P-0005 (P5)",
      metal: "925 Sterling Silver",
      gemstones: "Natural Emerald & Blue Sapphire",
      craftsmanship: "Hand Engraving & Kundan Work",
      weight: "10.484 g",
      dimensions: "Pendant Length: 4.3 cm",
      setting: "24K Gold Kundan Setting",
      finish: "Fully Handcrafted",
      certification: "925 Silver BIS Hallmarked",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p6",
    name: "Boond",
    subtitle: "24K Gold Kundan Polki Pendant with Pink/Green Enamel & Emerald Drop",
    price: 100000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/6.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/boond/7.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A delicate pendant handcrafted in 24K gold, featuring traditional Kundan polki work accented with soft pink and green detailing. Finished with a rich emerald drop and suspended from a fine pearl strand, the piece brings together vibrant colour, delicate proportions and timeless Indian craftsmanship.",
    story:
      "Classic Jaipur lotus-bud silhouette with delicate Meenakari petals, Polki center, and a faceted emerald drop on a pearl chain.",
    specs: {
      code: "ZB-26-MB-P-0006 (P6)",
      metal: "24K Gold",
      gemstones: "Uncut Polki & Hydro Emerald Drop",
      craftsmanship: "Kundan Polki Work & Hand Enameling",
      weight: "3.845 g",
      dimensions: "Pendant Height: 3.0 cm",
      strand: "Fine Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Certified & BIS Hallmark",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p7",
    name: "Naksh-e-Gul",
    subtitle: "24K Gold Floral Paisley Pendant with Polki & Emerald Enamel",
    price: 160000,
    status: "Made to Order",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/naksh-e-gul/6.jpg",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A statement pendant handcrafted in 24K gold, featuring an intricate floral composition in rich green and pink detailing. At its centre, traditional Kundan polki work adds a subtle brilliance, while the delicate pearl strand balances the ornate design with a soft, timeless finish.",
    story:
      "The iconic Rajasthani Kairi (mango/paisley) motif blooming with hand-enameled garden blossoms and centered with brilliant Polki.",
    specs: {
      code: "ZB-26-MB-P-0007 (P7)",
      metal: "24K Gold",
      gemstones: "Polki Diamonds & Emerald Details",
      craftsmanship: "Kundan Polki Work & Multi-Color Enameling",
      weight: "6.647 g",
      dimensions: "Pendant Length: 2.6 cm",
      strand: "Delicate Natural Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Hallmark & Authenticity Card",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "p8",
    name: "Sunehri",
    subtitle: "Silver & Copper Base Floral Medallion Pendant with White Enamel",
    price: 10000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sunehri/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sunehri/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sunehri/3.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sunehri/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sunehri/22.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/sunehri/1-option-2.png",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "A statement circular pendant featuring an intricately detailed floral motif, crafted in silver over a copper base. The warm metallic detailing unfolds against a soft white background, giving the traditional botanical pattern an elegant, antique-inspired character.",
    story:
      "Inspired by Jaipur royal palace fresco murals, this substantial medallion interweaves silver and copper floral filigree upon luminous white enamel.",
    specs: {
      code: "ZB-26-MB-P-0008 (P8)",
      metal: "Silver with Copper Base",
      gemstones: "White Porcelain-Grade Enamel Base",
      craftsmanship: "Detailed Floral Motif Filigree & Enameling",
      weight: "22.3 g",
      dimensions: "Pendant Diameter: 4.0 cm",
      design: "Floral Botanical Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p9",
    name: "Parwaaz",
    subtitle: "Silver Oval Bird Pendant with Blue & Green Cloisonné Enamel",
    price: 11000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/parwaaz/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/parwaaz/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/parwaaz/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/parwaaz/2.png",
    ],
    category: "Necklaces",
    type: "Pendant",
    collection: "Meena Bagh",
    description:
      "An oval pendant handcrafted in silver, featuring a striking bird motif brought to life through vibrant green and blue enamel work. Set against a deep black background, the flowing form and vivid colours give the piece a bold, artistic character while celebrating traditional enamel craftsmanship.",
    story:
      "A dynamic depiction of a bird in flight against a nocturnal black enamel field, glowing with iridescent cerulean and jade cloisonné enamel.",
    specs: {
      code: "ZB-26-MB-P-0009 (P9)",
      metal: "Solid Sterling Silver",
      gemstones: "Vibrant Kiln-Fired Enamel (Green & Blue)",
      craftsmanship: "Enamel Work & Silver Relief Inlay",
      weight: "24.722 g",
      dimensions: "Pendant Length: 5.5 cm",
      design: "Celestial Bird Motif",
      finish: "Fully Handcrafted",
      certification: "925 Silver Hallmark & Authenticity Card",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },

  // ═════════════════════════════════════════════════════════════════
  // MEENA BAGH COLLECTION — AUTHENTIC JAIPUR NECKLACES (N1 – N4)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "n1",
    name: "Mayuri",
    subtitle: "Hand-Enamelled Silver Peacock Collar with Green Drops & Pearl Tassel",
    price: 40000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/hero-sheet.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/hero-sheet.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/2.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/dscf0747.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/mayuri/dscf0749.jpg",
    ],
    category: "Necklaces",
    collection: "Meena Bagh",
    description:
      "A graceful collar of linked silver panels, each one hand-enamelled in sea green and cobalt with pairs of peacocks curving around delicate floral jaal. Green drops and tiny turquoise beads hang along the lower edge, moving softly as you wear it. The necklace ties with a traditional braided green-and-gold dori, finished with seed-pearl caps and a pearl tassel at the back, so it can sit high on the collarbone or a little lower.",
    story:
      "Inspired by the royal peacock courtyards of Jaipur palaces, Mayuri interweaves traditional Meenakari enamel with articulated silver panels that drape effortlessly along the neckline.",
    specs: {
      code: "ZB-26-MB-N-0001 (N1)",
      metal: "Solid 925 Sterling Silver",
      gemstones: "Sea Green & Cobalt Kiln-Fired Enamel with Seed Pearls & Turquoise Drops",
      craftsmanship: "Meenakari Enamel Work with Articulated Hand-Linked Panels",
      weight: "63.2 g",
      dimensions: "Collar Length: Adjustable (14\" - 20\")",
      strand: "Adjustable Braided Green-and-Gold Dori with Seed Pearl Caps & Tassel",
      setting: "Hand-Linked Silver Bezels",
      design: "Royal Peacock Pair & Delicate Floral Jaal Motif",
      finish: "Fully Handcrafted Heirloom Finish",
      certification: "925 BIS Hallmarked Silver & Zevar Baksa Atelier Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "n2",
    name: "Kusum",
    subtitle: "Silver Floral Meenakari Necklace Set on Maroon Dori with Matching Earrings",
    price: 40000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/hero-sheet.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/hero-sheet.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/6.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kusum/7.jpg",
    ],
    category: "Necklaces",
    collection: "Meena Bagh",
    description:
      "Rich maroon enamel forms the ground of this silver necklace set, painted over with blossoms in emerald green, cobalt blue and marigold, and edged in a bright band of green. A large scalloped centrepiece is flanked by four smaller panels, all strung between hand-shaped silver beads on a twisted maroon dori. The matching earrings pair a coiled silver stud with a scalloped enamel drop, completing a set with an old-world, heirloom feel.",
    story:
      "Rooted in timeless floral compositions of Mughal gardens, Kusum pairs botanical enamel artistry with coiled silver accents and a twisted maroon dori tie.",
    specs: {
      code: "ZB-26-MB-N-0002 (N2)",
      metal: "Solid 925 Sterling Silver",
      gemstones: "Rich Maroon, Emerald Green, Cobalt & Marigold Meenakari Enamel",
      craftsmanship: "Meenakari Enamel Work & Hand-Shaped Silver Beads",
      weight: "63.49 g (complete set)",
      dimensions: "Centrepiece: 4.5 cm x 4.0 cm; Earrings Drop: 3.2 cm",
      strand: "Twisted Maroon Dori (Adjustable Thread Tie)",
      setting: "Scalloped Silver Bezel Frame with Coiled Silver Studs",
      design: "Mughal Floral Garden (Kusum) Blossoms & Coiled Spirals",
      finish: "Fully Handcrafted (Complete Set with Matching Drop Earrings)",
      certification: "925 BIS Hallmarked Silver & Zevar Baksa Atelier Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "n3",
    name: "Kumud",
    subtitle: "Two-Tiered Turquoise & Cobalt Silver Enamel Set with Ghungroo Bells & Matching Earrings",
    price: 55000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/hero-sheet.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/hero-sheet.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/dscf0649.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kumud/dscf0664.jpg",
    ],
    category: "Necklaces",
    collection: "Meena Bagh",
    description:
      "A two-tiered silver pendant set hand-enamelled in shades of turquoise and deep cobalt, each panel painted with delicate floral meenakari and framed by rows of hand-coiled silver spirals. Clusters of chains fall from the lower tier, ending in tiny ghungroo bells that sway and chime with every movement. Paired with matching drop earrings that echo the same blue blooms and tassels, the set carries the charm of Rajasthani craftsmanship into a piece made to be noticed.",
    story:
      "Evoking the tranquil water lilies of royal Rajasthani stepwells, Kumud marries architectural silver filigree with resonant chiming ghungroo accents.",
    specs: {
      code: "ZB-26-MB-N-0003 (N3)",
      metal: "Solid 925 Sterling Silver",
      gemstones: "Turquoise & Deep Cobalt Kiln-Fired Meenakari Enamel",
      craftsmanship: "Meenakari Enamel Work, Coiled Silver Spirals & Chiming Ghungroo Bells",
      weight: "94.345 g (complete set)",
      dimensions: "Two-Tiered Pendant: 7.5 cm drop; Earrings: 4.8 cm drop",
      strand: "Silver Box Chain with Adjustable Lobster Clasp",
      setting: "Hand-Coiled Silver Spiral Wire Borders",
      design: "Turquoise Water Lily (Kumud) Blooms with Resonant Ghungroo Bells",
      finish: "Fully Handcrafted (Complete Set with Matching Drop Earrings)",
      certification: "925 BIS Hallmarked Silver & Zevar Baksa Atelier Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "n4",
    name: "Nilofer",
    subtitle: "13 Teardrop Cobalt Enamel Silver Hasli-Inspired Necklace with Matching Stud Drops",
    price: 60000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/hero-sheet.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/hero-sheet.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/1a.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/1b.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/6.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/nilofer/7.jpg",
    ],
    category: "Necklaces",
    collection: "Meena Bagh",
    description:
      "13 teardrop panels in deep cobalt enamel fan out along this silver necklace, each painted with climbing green leaves and framed in a border of hand-coiled silver spirals. Collar-like fall in the spirit of traditional Rajasthani hasli. Matching earrings pair a domed silver stud with a single cobalt teardrop, carrying the same leaf motif and spiral edge.",
    story:
      "Sculpted in the regal silhouette of an antique Rajasthani hasli collar, Nilofer’s fanned teardrop panels create a majestic cascade of deep cobalt Meenakari.",
    specs: {
      code: "ZB-26-MB-N-0004 (N4)",
      metal: "Solid 925 Sterling Silver",
      gemstones: "Deep Cobalt Kiln-Fired Enamel with Climbing Leaf Inlay",
      craftsmanship: "Meenakari Enamel Work & Hand-Coiled Spiral Wire Borders",
      weight: "97.882 g (complete set)",
      dimensions: "13 Teardrop Fanned Collar: 16\" contour; Earrings: 3.5 cm drop",
      strand: "Articulated Hasli Collar Curve with Silver Hook Clasp",
      setting: "Individual Teardrop Silver Wire Frames with Domed Silver Studs",
      design: "13 Fanned Teardrops with Climbing Leaf (Nilofer) Motifs",
      finish: "Fully Handcrafted (Complete Set with Matching Stud Drops)",
      certification: "925 BIS Hallmarked Silver & Zevar Baksa Atelier Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },

  // ═════════════════════════════════════════════════════════════════
  // MEENA BAGH COLLECTION — AUTHENTIC JAIPUR EARRINGS (E1 – E11)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "e1",
    name: "Neel",
    subtitle: "Copper & Silver Base Hand-Painted Bird Earrings on Soft Pink Enamel",
    price: 11000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/neel/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/neel/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/neel/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring delicately hand-painted birds against a soft pink enamel background. Fine brushwork and gentle colour detailing give each piece a charming, miniature-art quality, finished in an elegant handcrafted silhouette.",
    story:
      "Drawing inspiration from royal avian miniature portraiture, the miniature bird sits gracefully on a pastel pink enamel medallion with wire hook drops.",
    specs: {
      code: "ZB-26-MB-E-0001 (E1)",
      metal: "Copper & Silver Base",
      gemstones: "Hand-Painted Enamel (Pink & Blue Bird)",
      craftsmanship: "Hand-Painted Enamel Work & Drop Hook Crafting",
      weight: "4.465*2 g (8.93 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Bird Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e2",
    name: "Darbar",
    subtitle: "Copper & Silver Base Hand-Painted Miniature Figure Earrings on Deep Red Enamel",
    price: 15000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/4.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/5.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/darbar/8.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring intricately hand-painted miniature figures against a rich deep-red background. Inspired by traditional Indian miniature art, the fine detailing and expressive imagery turn each earring into a tiny work of wearable art.",
    story:
      "Recreating courtly Rajasthan miniature frescoes on fine enamel discs, capturing historical characters with single-hair brush precision.",
    specs: {
      code: "ZB-26-MB-E-0002 (E2)",
      metal: "Copper & Silver Base",
      gemstones: "Miniature Portrait Enamel on Deep Red Base",
      craftsmanship: "Hand-Painted Enamel Work & Miniature Painting",
      weight: "5.373*2 g (10.75 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "Traditional Indian Miniature Art",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e3",
    name: "Kanak",
    subtitle: "Copper & Silver Base Botanical Floral Studs in Warm Gold on Soft Blue Enamel",
    price: 11000,
    status: "Made to Order",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kanak/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kanak/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/kanak/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring an ornate hand-painted floral motif in warm gold tones against a soft blue enamel background. Inspired by traditional decorative art, the intricate botanical detailing gives the pair an elegant, timeless character.",
    story:
      "Echoing the gilded ceiling panels of Jaipur palaces, delicate gold vine tracery sits upon serenely glazed powder-blue enamel.",
    specs: {
      code: "ZB-26-MB-E-0003 (E3)",
      metal: "Copper & Silver Base",
      gemstones: "Soft Blue Kiln-Fired Enamel Base",
      craftsmanship: "Hand-Painted Enamel Work & Gilded Filigree",
      weight: "7.045*2 g (14.09 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Floral Botanical Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "e4",
    name: "Gul",
    subtitle: "Copper & Silver Base Hand-Painted Birds & Florals on Soft Green Enamel",
    price: 12000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gul/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gul/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gul/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gul/2.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gul/4.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of oval earrings crafted in silver, featuring delicate hand-painted enamel work. Set against a soft green background, vibrant birds and blooming florals are individually painted in fine detail, giving the pair a whimsical, artful character rooted in traditional craftsmanship.",
    story:
      "A springtime reverie rendered on oval ceramic-grade enamel discs, celebrating singing bluebirds amongst freshly bloomed rosebuds.",
    specs: {
      code: "ZB-26-MB-E-0004 (E4)",
      metal: "Copper & Silver Base",
      gemstones: "Pistachio Green Enamel with Fine Color Accents",
      craftsmanship: "Hand-Painted Enamel Work",
      weight: "6.439*2 g (12.88 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "Bird & Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e5",
    name: "Gulabi",
    subtitle: "Copper & Silver Base Hand-Painted Pink Floral Drops on Jet Black Enamel",
    price: 11000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulabi/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulabi/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulabi/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulabi/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring delicately hand-painted pink florals against a deep black enamel background. The layered petals and fine detailing create a striking contrast, giving the pair a romantic yet bold character with the charm of miniature wearable art.",
    story:
      "Dramatic nocturnal romance — blushing lotus petals blossoming against impenetrable black enamel, dangling on delicate French ear-wires.",
    specs: {
      code: "ZB-26-MB-E-0005 (E5)",
      metal: "Copper & Silver Base",
      gemstones: "Jet Black & Rose Pink Enamel Work",
      craftsmanship: "Hand-Painted Enamel Work & Wire Hooks",
      weight: "4.511*2 g (9.02 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Layered Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e6",
    name: "Gulnaar",
    subtitle: "Copper & Silver Base Pink & Yellow Floral Enamel on Rich Blue Field",
    price: 12000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/2.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/dscf0416.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/dscf0429.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/gulnaar/dscf0434.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring a softly detailed floral motif in warm pink and yellow tones against a rich blue enamel background. The delicate petal work and vibrant contrast give the pair a playful, feminine character inspired by traditional enamel artistry.",
    story:
      "Sun-drenched yellow and peony-pink petals radiating outward upon royal blue Jaipur enamel discs.",
    specs: {
      code: "ZB-26-MB-E-0006 (E6)",
      metal: "Copper & Silver Base",
      gemstones: "Cobalt Blue & Multi-Tone Floral Enamel",
      craftsmanship: "Enamel Work & Bezel Rim Framing",
      weight: "5.990*2 g (11.98 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e7",
    name: "Aabha",
    subtitle: "Copper & Silver Base Geometric Engraved Studs with Vivid Cerulean Blue Enamel",
    price: 9000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/aabha/1.jpg",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/aabha/1.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/aabha/3.jpg",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/aabha/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring an intricate floral-inspired pattern highlighted with vivid blue enamel. The engraved geometric detailing and cool-toned contrast create a contemporary interpretation of traditional enamel craftsmanship.",
    story:
      "Chiseled silver relief lines interlaced with pool-blue cloisonné enamel, reimagining geometric Jali patterns for the contemporary jewelry wardrobe.",
    specs: {
      code: "ZB-26-MB-E-0007 (E7)",
      metal: "Copper & Silver Base",
      gemstones: "Vivid Turquoise & Cerulean Enamel",
      craftsmanship: "Relief Engraving & Enamel Inlay Work",
      weight: "3.191*2 g (6.38 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Floral Geometric Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e8",
    name: "Pankhuri",
    subtitle: "Copper & Silver Base Gold Bird & Flora on Rich Cobalt Blue Enamel",
    price: 12000,
    status: "Made to Order",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/pankhuri/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/pankhuri/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/pankhuri/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring an intricate bird and floral motif in warm gold tones against a rich cobalt blue enamel background. Delicate detailing and the striking contrast of gold and blue give the pair an elegant, old-world character inspired by traditional decorative art.",
    story:
      "Golden songbirds perched amidst gilded foliage on midnight cobalt enamel, evoking the regal heritage of Jaipur darbars.",
    specs: {
      code: "ZB-26-MB-E-0008 (E8)",
      metal: "Copper & Silver Base",
      gemstones: "Cobalt Blue Glass Enamel Base",
      craftsmanship: "Hand-Painted Enamel Work & Gilded Detailing",
      weight: "6.011*2 g (12.02 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "Bird & Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "e9",
    name: "Rang",
    subtitle: "Copper & Silver Base Abstract Multi-Color Enamel Composition with Silver Lines",
    price: 10000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rang/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rang/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/rang/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of contemporary drop earrings crafted in silver, featuring a vibrant abstract composition in enamel. Bold shades of blue, green, orange and deep red are framed by delicate silver lines, giving the pair a playful, modern character while retaining the beauty of traditional enamel craftsmanship.",
    story:
      "A bold, modernistic celebration of pure color blocking — vermilion, ochre, cobalt, and jade divided by sculpted sterling silver partitions.",
    specs: {
      code: "ZB-26-MB-E-0009 (E9)",
      metal: "Copper & Silver Base",
      gemstones: "Multi-Hue Cloisonné Enamel Inlay",
      craftsmanship: "Cloisonné Enamel Work & Wirework",
      weight: "4.286*2 g (8.57 g pair)",
      dimensions: "Drop Length: 3.2 cm",
      design: "Abstract Colorway Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e10",
    name: "Leher",
    subtitle: "Copper & Silver Base Sculptural Fan-Shaped Earrings in Rose & Black Enamel",
    price: 10000,
    status: "Made to Order",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/leher/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/leher/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/leher/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of sculptural drop earrings crafted in silver, featuring flowing enamel panels in soft pink and deep black. The graceful, fan-like silhouette and clean linear detailing give the pair a distinctly contemporary character while preserving the beauty of traditional enamel craftsmanship.",
    story:
      "Art Deco fluted silhouette meet Rajasthani enamel work, alternating soft blush pink and obsidian enamel flutes.",
    specs: {
      code: "ZB-26-MB-E-0010 (E10)",
      metal: "Copper & Silver Base",
      gemstones: "Blush Pink & Obsidian Black Enamel",
      craftsmanship: "Sculpted Enamel Work & Linear Partitioning",
      weight: "4.939*2 g (9.88 g pair)",
      dimensions: "Length: 3.0 cm",
      design: "Art Deco Fan Geometric Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "e11",
    name: "Neelkamal",
    subtitle: "Copper & Silver Base Crisp White Floral Drop Earrings on Royal Violet Enamel",
    price: 10000,
    status: "Ready to Ship",
    image: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/neelkamal/1.png",
    gallery: [
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/neelkamal/1.png",
      "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/images/products/neelkamal/2.jpg",
    ],
    category: "Earrings",
    collection: "Meena Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring a delicate white floral motif against a rich violet enamel background. The crisp botanical design and vivid contrast create a fresh, elegant expression of traditional enamel craftsmanship.",
    story:
      "Pristine white Champa petals blossoming on a deep imperial violet enamel disc with polished silver bezel bezeling.",
    specs: {
      code: "ZB-26-MB-E-0011 (E11)",
      metal: "Copper & Silver Base",
      gemstones: "Royal Violet & Crisp White Enamel",
      craftsmanship: "Precision Enamel Work & Ear-wire Drop",
      weight: "5.132*2 g (10.26 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "White Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id.toLowerCase() === id.toLowerCase());
}
