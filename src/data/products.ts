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
  collection?: string;
  description: string;
  story: string;
  specs: ProductSpec;
  dispatchTime: string;
};

export const products: Product[] = [
  // ═════════════════════════════════════════════════════════════════
  // MINA BAGH COLLECTION — AUTHENTIC JAIPUR PENDANTS (P1 – P9)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "p1",
    name: "P1 Bird Pendant",
    subtitle: "925 Silver Bird Pendant with Enamel & 24K Kundan",
    price: 5800,
    status: "Ready to Ship",
    image: "/images/products/p1-1.jpg",
    gallery: [
      "/images/products/p1-1.jpg",
      "/images/products/p1-2.jpg",
      "/images/products/p1-3.jpg",
      "/images/products/p1-4.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A delicate bird-shaped pendant, handcrafted in 925 silver and brought to life with intricate enamel detailing and traditional Kundan work set in 24K gold. Rich green and blue tones frame the petite Kundan accent, creating a playful piece rooted in Indian craftsmanship.",
    story:
      "Rooted in centuries-old Jaipur Meenakari, the bird motif symbolizes freedom and celestial grace, rendered in kiln-fired enamel with 24K gold Kundan settings.",
    specs: {
      code: "P1",
      metal: "925 Sterling Silver",
      gemstones: "Kundan Accent & Kiln-Fired Enamel",
      craftsmanship: "Kundan & Enamel Work",
      weight: "5.754 g (5.7g)",
      dimensions: "Pendant Length: 3.5 cm",
      setting: "24K Gold Kundan Setting",
      finish: "Fully Handcrafted",
      certification: "925 Silver BIS Hallmarked & Atelier Guarantee",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p2",
    name: "P2 Sculptural Bird Pendant",
    subtitle: "24K Gold Bird Pendant with Emerald, Ruby & Polki",
    price: 28500,
    status: "Made to Order",
    image: "/images/products/p2-1.jpg",
    gallery: [
      "/images/products/p2-1.jpg",
      "/images/products/p2-2.jpg",
      "/images/products/p2-3.jpg",
      "/images/products/p2-4.jpg",
      "/images/products/p2-5.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A sculptural bird-shaped pendant handcrafted entirely in 24K gold, adorned with vibrant emeralds, rubies and luminous polki. Suspended from a delicate pearl strand, the piece pairs the richness of traditional Indian jewellery craftsmanship with a playful, distinctive silhouette.",
    story:
      "Sculpted in pure 24K gold, this bird silhouette pairs precious gemstone pavé with luminous uncut Polki diamonds suspended on fine pearls.",
    specs: {
      code: "P2",
      metal: "24K Gold",
      gemstones: "Natural Emeralds, Rubies & Luminous Polki",
      craftsmanship: "Handcrafted 24K Gold Setting & Jadau",
      weight: "7.05 g (7.1g)",
      dimensions: "Pendant Length: 3.5 cm (Total Drop: 5.0 cm)",
      strand: "Delicate Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Certified & BIS Hallmarked",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "p3",
    name: "P3 Polki Bird Pendant",
    subtitle: "24K Gold Bird Pendant with Kundan Polki & Pearl Strand",
    price: 24800,
    status: "Made to Order",
    image: "/images/products/p3-1.jpg",
    gallery: [
      "/images/products/p3-1.jpg",
      "/images/products/p3-2.jpg",
      "/images/products/p3-3.jpg",
      "/images/products/p3-4.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A delicate bird-shaped pendant handcrafted in 24K gold, featuring intricate detailing and a traditional Kundan polki setting. Suspended from a fine pearl strand, the piece pairs the warmth of pure gold with the subtle brilliance of polki, creating an elegant expression of traditional Indian craftsmanship.",
    story:
      "A testament to understated royal luxury, pairing 24K pure gold warmth with the antique shimmer of hand-set Polki diamonds on an ethereal pearl necklace.",
    specs: {
      code: "P3",
      metal: "24K Gold",
      gemstones: "Natural Uncut Polki Diamonds & Pearls",
      craftsmanship: "Kundan Polki Work",
      weight: "5.648 g (5.6g)",
      dimensions: "Pendant Length: 3.5 cm",
      strand: "Fine Natural Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Hallmark & Authenticity Certificate",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "p4",
    name: "P4 Ruby Enamel Pendant",
    subtitle: "925 Silver Green Enamel Bird Pendant with Ruby & 24K Gold",
    price: 5400,
    status: "Ready to Ship",
    image: "/images/products/p4-1.jpg",
    gallery: [
      "/images/products/p4-1.jpg",
      "/images/products/p4-2.jpg",
      "/images/products/p4-3.jpg",
      "/images/products/p4-5.jpg",
      "/images/products/p4-6.jpg",
      "/images/products/p4-7.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A delicate bird-shaped pendant handcrafted in 925 silver, detailed with rich green enamel and traditional 24K gold work framing a vibrant ruby. Strung on a fine pearl strand with playful orange accents, the piece brings together colour, character and traditional Indian craftsmanship in a light, contemporary form.",
    story:
      "Rich parrot-green Jaipur enamel contrasts against fiery crimson ruby in a delicate bird silhouette made for modern daily elegance.",
    specs: {
      code: "P4",
      metal: "925 Sterling Silver",
      gemstones: "Natural Ruby & Kiln-Fired Green Enamel",
      craftsmanship: "Enamel Work & 24K Gold Bezel Setting",
      weight: "4.157 g (4.2g)",
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
    name: "P5 Engraved Sapphire Pendant",
    subtitle: "925 Silver Hand-Engraved Bird Pendant with Emerald & Sapphire",
    price: 7200,
    status: "Ready to Ship",
    image: "/images/products/p5-1.jpg",
    gallery: [
      "/images/products/p5-1.jpg",
      "/images/products/p5-2.jpg",
      "/images/products/p5-3.jpg",
      "/images/products/p5-4.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A sculptural bird-shaped pendant handcrafted in 925 sterling silver, detailed with intricate hand-engraved motifs and vibrant emerald and blue sapphire stones set in traditional 24K gold Kundan work. With its graceful form and rich jewel-toned accents, the piece brings a contemporary character to traditional Indian craftsmanship.",
    story:
      "Deep hand-chiseled engraving across solid silver with jewel-toned emerald and royal sapphire accents set into 24K gold collets.",
    specs: {
      code: "P5",
      metal: "925 Sterling Silver",
      gemstones: "Natural Emerald & Blue Sapphire",
      craftsmanship: "Hand Engraving & Kundan Work",
      weight: "10.484 g (10.5g)",
      dimensions: "Pendant Length: 4.3 cm",
      setting: "24K Gold Kundan Setting",
      finish: "Fully Handcrafted",
      certification: "925 Silver BIS Hallmarked",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "p6",
    name: "P6 Lotus Emerald Drop Pendant",
    subtitle: "24K Gold Kundan Polki Pendant with Pink/Green Enamel & Emerald Drop",
    price: 18600,
    status: "Made to Order",
    image: "/images/products/p6-1.jpg",
    gallery: [
      "/images/products/p6-1.jpg",
      "/images/products/p6-2.jpg",
      "/images/products/p6-3.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A delicate pendant handcrafted in 24K gold, featuring traditional Kundan polki work accented with soft pink and green detailing. Finished with a rich emerald drop and suspended from a fine pearl strand, the piece brings together vibrant colour, delicate proportions and timeless Indian craftsmanship.",
    story:
      "Classic Jaipur lotus-bud silhouette with delicate Meenakari petals, Polki center, and a faceted emerald drop on a pearl chain.",
    specs: {
      code: "P6",
      metal: "24K Gold",
      gemstones: "Uncut Polki & Hydro Emerald Drop",
      craftsmanship: "Kundan Polki Work & Hand Enameling",
      weight: "3.845 g (3.8g)",
      dimensions: "Pendant Height: 3.0 cm",
      strand: "Fine Pearl Strand",
      finish: "Fully Handcrafted",
      certification: "24K Gold Certified & BIS Hallmark",
    },
    dispatchTime: "Ships in 7–10 business days",
  },
  {
    id: "p7",
    name: "P7 Floral Paisley Pendant",
    subtitle: "24K Gold Floral Paisley Pendant with Polki & Emerald Enamel",
    price: 26400,
    status: "Made to Order",
    image: "/images/products/p7-1.jpg",
    gallery: [
      "/images/products/p7-1.jpg",
      "/images/products/p7-2.jpg",
      "/images/products/p7-3.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A statement pendant handcrafted in 24K gold, featuring an intricate floral composition in rich green and pink detailing. At its centre, traditional Kundan polki work adds a subtle brilliance, while the delicate pearl strand balances the ornate design with a soft, timeless finish.",
    story:
      "The iconic Rajasthani Kairi (mango/paisley) motif blooming with hand-enameled garden blossoms and centered with brilliant Polki.",
    specs: {
      code: "P7",
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
    name: "P8 Botanical Medallion Pendant",
    subtitle: "Silver & Copper Base Floral Medallion Pendant with White Enamel",
    price: 6800,
    status: "Ready to Ship",
    image: "/images/products/p8-1.jpg",
    gallery: [
      "/images/products/p8-1.jpg",
      "/images/products/p8-2.jpg",
      "/images/products/p8-3.jpg",
      "/images/products/p8-4.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "A statement circular pendant featuring an intricately detailed floral motif, crafted in silver over a copper base. The warm metallic detailing unfolds against a soft white background, giving the traditional botanical pattern an elegant, antique-inspired character.",
    story:
      "Inspired by Jaipur royal palace fresco murals, this substantial medallion interweaves silver and copper floral filigree upon luminous white enamel.",
    specs: {
      code: "P8",
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
    name: "P9 Cerulean Hummingbird Pendant",
    subtitle: "Silver Oval Bird Pendant with Blue & Green Cloisonné Enamel",
    price: 7600,
    status: "Ready to Ship",
    image: "/images/products/p9-1.jpg",
    gallery: [
      "/images/products/p9-1.jpg",
      "/images/products/p9-2.jpg",
      "/images/products/p9-3.jpg",
    ],
    category: "Necklaces",
    collection: "Mina Bagh",
    description:
      "An oval pendant handcrafted in silver, featuring a striking bird motif brought to life through vibrant green and blue enamel work. Set against a deep black background, the flowing form and vivid colours give the piece a bold, artistic character while celebrating traditional enamel craftsmanship.",
    story:
      "A dynamic depiction of a bird in flight against a nocturnal black enamel field, glowing with iridescent cerulean and jade cloisonné enamel.",
    specs: {
      code: "P9",
      metal: "Solid Sterling Silver",
      gemstones: "Vibrant Kiln-Fired Enamel (Green & Blue)",
      craftsmanship: "Enamel Work & Silver Relief Inlay",
      weight: "24.722 g (24.7g)",
      dimensions: "Pendant Length: 5.5 cm (Drop: 5.0 cm)",
      design: "Celestial Bird Motif",
      finish: "Fully Handcrafted",
      certification: "925 Silver Hallmark & Authenticity Card",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },

  // ═════════════════════════════════════════════════════════════════
  // MINA BAGH COLLECTION — AUTHENTIC JAIPUR EARRINGS (E1 – E11)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "e1",
    name: "E1 Bird Motif Drop Earrings",
    subtitle: "Copper & Silver Base Hand-Painted Bird Earrings on Soft Pink Enamel",
    price: 4800,
    status: "Ready to Ship",
    image: "/images/products/e1-1.jpg",
    gallery: [
      "/images/products/e1-1.jpg",
      "/images/products/e1-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring delicately hand-painted birds against a soft pink enamel background. Fine brushwork and gentle colour detailing give each piece a charming, miniature-art quality, finished in an elegant handcrafted silhouette.",
    story:
      "Drawing inspiration from royal avian miniature portraiture, the miniature bird sits gracefully on a pastel pink enamel medallion with wire hook drops.",
    specs: {
      code: "E1",
      metal: "Copper & Silver Base",
      gemstones: "Hand-Painted Enamel (Pink & Blue Bird)",
      craftsmanship: "Hand-Painted Enamel Work & Drop Hook Crafting",
      weight: "4.5 g each (8.93 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Bird Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e2",
    name: "E2 Miniature Art Drop Earrings",
    subtitle: "Copper & Silver Base Hand-Painted Miniature Figure Earrings on Deep Red Enamel",
    price: 5200,
    status: "Ready to Ship",
    image: "/images/products/e2-1.jpg",
    gallery: [
      "/images/products/e2-1.jpg",
      "/images/products/e2-2.jpg",
      "/images/products/e2-3.jpg",
      "/images/products/e2-4.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring intricately hand-painted miniature figures against a rich deep-red background. Inspired by traditional Indian miniature art, the fine detailing and expressive imagery turn each earring into a tiny work of wearable art.",
    story:
      "Recreating courtly Rajasthan miniature frescoes on fine enamel discs, capturing historical characters with single-hair brush precision.",
    specs: {
      code: "E2",
      metal: "Copper & Silver Base",
      gemstones: "Miniature Portrait Enamel on Deep Red Base",
      craftsmanship: "Hand-Painted Enamel Work & Miniature Painting",
      weight: "5.4 g each (10.75 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "Traditional Indian Miniature Art",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e3",
    name: "E3 Gold Flora Stud Earrings",
    subtitle: "Copper & Silver Base Botanical Floral Studs in Warm Gold on Soft Blue Enamel",
    price: 4600,
    status: "Ready to Ship",
    image: "/images/products/e3-1.jpg",
    gallery: [
      "/images/products/e3-1.jpg",
      "/images/products/e3-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring an ornate hand-painted floral motif in warm gold tones against a soft blue enamel background. Inspired by traditional decorative art, the intricate botanical detailing gives the pair an elegant, timeless character.",
    story:
      "Echoing the gilded ceiling panels of Jaipur palaces, delicate gold vine tracery sits upon serenely glazed powder-blue enamel.",
    specs: {
      code: "E3",
      metal: "Copper & Silver Base",
      gemstones: "Soft Blue Kiln-Fired Enamel Base",
      craftsmanship: "Hand-Painted Enamel Work & Gilded Filigree",
      weight: "7.04 g each (14.09 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Floral Botanical Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e4",
    name: "E4 Avian & Blossom Stud Earrings",
    subtitle: "Copper & Silver Base Hand-Painted Birds & Florals on Soft Green Enamel",
    price: 4900,
    status: "Ready to Ship",
    image: "/images/products/e4-1.jpg",
    gallery: [
      "/images/products/e4-1.jpg",
      "/images/products/e4-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of oval earrings crafted in silver, featuring delicate hand-painted enamel work. Set against a soft green background, vibrant birds and blooming florals are individually painted in fine detail, giving the pair a whimsical, artful character rooted in traditional craftsmanship.",
    story:
      "A springtime reverie rendered on oval ceramic-grade enamel discs, celebrating singing bluebirds amongst freshly bloomed rosebuds.",
    specs: {
      code: "E4",
      metal: "Copper & Silver Base",
      gemstones: "Pistachio Green Enamel with Fine Color Accents",
      craftsmanship: "Hand-Painted Enamel Work",
      weight: "6.4 g each (12.88 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "Bird & Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e5",
    name: "E5 Midnight Rose Drop Earrings",
    subtitle: "Copper & Silver Base Hand-Painted Pink Floral Drops on Jet Black Enamel",
    price: 4700,
    status: "Ready to Ship",
    image: "/images/products/e5-1.jpg",
    gallery: [
      "/images/products/e5-1.jpg",
      "/images/products/e5-2.jpg",
      "/images/products/e5-3.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring delicately hand-painted pink florals against a deep black enamel background. The layered petals and fine detailing create a striking contrast, giving the pair a romantic yet bold character with the charm of miniature wearable art.",
    story:
      "Dramatic nocturnal romance — blushing lotus petals blossoming against impenetrable black enamel, dangling on delicate French ear-wires.",
    specs: {
      code: "E5",
      metal: "Copper & Silver Base",
      gemstones: "Jet Black & Rose Pink Enamel Work",
      craftsmanship: "Hand-Painted Enamel Work & Wire Hooks",
      weight: "4.5 g each (9.02 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Layered Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e6",
    name: "E6 Cobalt Blossom Stud Earrings",
    subtitle: "Copper & Silver Base Pink & Yellow Floral Enamel on Rich Blue Field",
    price: 4500,
    status: "Ready to Ship",
    image: "/images/products/e6-1.jpg",
    gallery: [
      "/images/products/e6-1.jpg",
      "/images/products/e6-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring a softly detailed floral motif in warm pink and yellow tones against a rich blue enamel background. The delicate petal work and vibrant contrast give the pair a playful, feminine character inspired by traditional enamel artistry.",
    story:
      "Sun-drenched yellow and peony-pink petals radiating outward upon royal blue Jaipur enamel discs.",
    specs: {
      code: "E6",
      metal: "Copper & Silver Base",
      gemstones: "Cobalt Blue & Multi-Tone Floral Enamel",
      craftsmanship: "Enamel Work & Bezel Rim Framing",
      weight: "6.0 g each (11.98 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e7",
    name: "E7 Turquoise Geometric Engraved Studs",
    subtitle: "Copper & Silver Base Geometric Engraved Studs with Vivid Cerulean Blue Enamel",
    price: 4300,
    status: "Ready to Ship",
    image: "/images/products/e7-1.jpg",
    gallery: [
      "/images/products/e7-1.jpg",
      "/images/products/e7-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring an intricate floral-inspired pattern highlighted with vivid blue enamel. The engraved geometric detailing and cool-toned contrast create a contemporary interpretation of traditional enamel craftsmanship.",
    story:
      "Chiseled silver relief lines interlaced with pool-blue cloisonné enamel, reimagining geometric Jali patterns for the contemporary jewelry wardrobe.",
    specs: {
      code: "E7",
      metal: "Copper & Silver Base",
      gemstones: "Vivid Turquoise & Cerulean Enamel",
      craftsmanship: "Relief Engraving & Enamel Inlay Work",
      weight: "3.2 g each (6.38 g pair)",
      dimensions: "Diameter: 2.0 cm",
      design: "Floral Geometric Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e8",
    name: "E8 Royal Blue Avian Medallion Studs",
    subtitle: "Copper & Silver Base Gold Bird & Flora on Rich Cobalt Blue Enamel",
    price: 5100,
    status: "Ready to Ship",
    image: "/images/products/e8-2.jpg",
    gallery: [
      "/images/products/e8-2.jpg",
      "/images/products/e8-1.jpg",
      "/images/products/e8-3.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round earrings crafted in silver, featuring an intricate bird and floral motif in warm gold tones against a rich cobalt blue enamel background. Delicate detailing and the striking contrast of gold and blue give the pair an elegant, old-world character inspired by traditional decorative art.",
    story:
      "Golden songbirds perched amidst gilded foliage on midnight cobalt enamel, evoking the regal heritage of Jaipur darbars.",
    specs: {
      code: "E8",
      metal: "Copper & Silver Base",
      gemstones: "Cobalt Blue Glass Enamel Base",
      craftsmanship: "Hand-Painted Enamel Work & Gilded Detailing",
      weight: "6.0 g each (12.02 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "Bird & Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e9",
    name: "E9 Modernist Abstract Drop Earrings",
    subtitle: "Copper & Silver Base Abstract Multi-Color Enamel Composition with Silver Lines",
    price: 4800,
    status: "Ready to Ship",
    image: "/images/products/e9-1.jpg",
    gallery: [
      "/images/products/e9-1.jpg",
      "/images/products/e9-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of contemporary drop earrings crafted in silver, featuring a vibrant abstract composition in enamel. Bold shades of blue, green, orange and deep red are framed by delicate silver lines, giving the pair a playful, modern character while retaining the beauty of traditional enamel craftsmanship.",
    story:
      "A bold, modernistic celebration of pure color blocking — vermilion, ochre, cobalt, and jade divided by sculpted sterling silver partitions.",
    specs: {
      code: "E9",
      metal: "Copper & Silver Base",
      gemstones: "Multi-Hue Cloisonné Enamel Inlay",
      craftsmanship: "Cloisonné Enamel Work & Wirework",
      weight: "4.3 g each (8.57 g pair)",
      dimensions: "Trapezoid Drop (Drop Length: 3.2 cm)",
      design: "Abstract Colorway Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e10",
    name: "E10 Art Deco Fan Drop Earrings",
    subtitle: "Copper & Silver Base Sculptural Fan-Shaped Earrings in Rose & Black Enamel",
    price: 5000,
    status: "Ready to Ship",
    image: "/images/products/e10-1.jpg",
    gallery: [
      "/images/products/e10-1.jpg",
      "/images/products/e10-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of sculptural drop earrings crafted in silver, featuring flowing enamel panels in soft pink and deep black. The graceful, fan-like silhouette and clean linear detailing give the pair a distinctly contemporary character while preserving the beauty of traditional enamel craftsmanship.",
    story:
      "Art Deco fluted silhouette meet Rajasthani enamel work, alternating soft blush pink and obsidian enamel flutes.",
    specs: {
      code: "E10",
      metal: "Copper & Silver Base",
      gemstones: "Blush Pink & Obsidian Black Enamel",
      craftsmanship: "Sculpted Enamel Work & Linear Partitioning",
      weight: "5.0 g each (9.88 g pair)",
      dimensions: "Length: 3.0 cm",
      design: "Art Deco Fan Geometric Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },
  {
    id: "e11",
    name: "E11 Violet Botanical Drop Earrings",
    subtitle: "Copper & Silver Base Crisp White Floral Drop Earrings on Royal Violet Enamel",
    price: 4900,
    status: "Ready to Ship",
    image: "/images/products/e11-1.jpg",
    gallery: [
      "/images/products/e11-1.jpg",
      "/images/products/e11-2.jpg",
    ],
    category: "Earrings",
    collection: "Mina Bagh",
    description:
      "A pair of round drop earrings crafted in silver, featuring a delicate white floral motif against a rich violet enamel background. The crisp botanical design and vivid contrast create a fresh, elegant expression of traditional enamel craftsmanship.",
    story:
      "Pristine white Champa petals blossoming on a deep imperial violet enamel disc with polished silver bezel bezeling.",
    specs: {
      code: "E11",
      metal: "Copper & Silver Base",
      gemstones: "Royal Violet & Crisp White Enamel",
      craftsmanship: "Precision Enamel Work & Ear-wire Drop",
      weight: "5.1 g each (10.26 g pair)",
      dimensions: "Diameter: 2.2 cm",
      design: "White Floral Motif",
      finish: "Fully Handcrafted",
      certification: "Zevar Baksa Atelier Authenticity Certificate",
    },
    dispatchTime: "Dispatches within 24–48 hours",
  },

  // ═════════════════════════════════════════════════════════════════
  // SIGNATURE STATEMENT PIECES & EDITORIAL CREATIONS
  // ═════════════════════════════════════════════════════════════════
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
    collection: "Mina Bagh",
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
    collection: "Mina Bagh",
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
    collection: "Mina Bagh",
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
    collection: "Mina Bagh",
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
    collection: "Mina Bagh",
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
    collection: "Mina Bagh",
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
  return products.find((p) => p.id.toLowerCase() === id.toLowerCase());
}
