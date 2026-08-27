"use client";

import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=640&fit=crop&q=80&auto=format`;

const SLIDES = [
  {
    src: UNSPLASH("1515562141207-7a88fb7ce338"),
    alt: "Handcrafted Royal Gold Necklace with Gemstones",
    title: "Celestial Polki Parure",
    subtitle: "22k Gold & Natural Jaipur Diamonds",
    badge: "New Release",
    price: "₹14,840",
    href: "/product/nishat",
    meta: [
      { label: "Craftsmanship", value: "Hand Jadau & Meenakari" },
      { label: "Origin", value: "Jaipur Atelier" },
      { label: "Edition", value: "Exclusive 2026" },
    ],
  },
  {
    src: UNSPLASH("1599643478518-a784e5dc4c8f"),
    alt: "Heritage Emerald & Diamond Royal Necklace",
    title: "Iraaya Emerald Choker",
    subtitle: "Cascading Kundan & Hydro Emerald Drops",
    badge: "Bespoke",
    price: "₹4,300",
    href: "/product/iraaya",
    meta: [
      { label: "Metal", value: "18k & 22k Gold Plated" },
      { label: "Fastening", value: "Adjustable Silk Dori" },
      { label: "Purity", value: "BIS Hallmark Certified" },
    ],
  },
  {
    src: UNSPLASH("1535632066927-ab7c9ab60908"),
    alt: "Carved Gold Pearl Statement Jhumkas",
    title: "Noorzaan Heritage Jhumkas",
    subtitle: "Hand-Enameled Jaipur Dome with Seed Pearls",
    badge: "Ready to Ship",
    price: "₹8,300",
    href: "/product/noorzaan",
    meta: [
      { label: "Detailing", value: "Ruby-Pink Meenakari" },
      { label: "Weight", value: "24.2g Pair" },
      { label: "Dispatch", value: "48 Hours" },
    ],
  },
  {
    src: UNSPLASH("1611591475102-468ac7f03529"),
    alt: "Polki Crescent Moon Chandbalis",
    title: "Ruhvika Chandbalis",
    subtitle: "Crescent Pearl & Polki Radiance",
    badge: "Trending",
    price: "₹4,100",
    href: "/product/ruhvika",
    meta: [
      { label: "Gemstone", value: "Uncut Kundan Stones" },
      { label: "Finish", value: "Lustrous Gold Plated" },
      { label: "Artisan", value: "Master Karigar Jaipur" },
    ],
  },
  {
    src: UNSPLASH("1602751584552-8ba73aad10e1"),
    alt: "Architectural 22k Gold Uncut Diamond Cuff",
    title: "Ruhnoor Royal Cuff",
    subtitle: "Amber Fort Lattice in 22k Gold",
    badge: "Heirloom",
    price: "₹9,400",
    href: "/product/ruhnoor",
    meta: [
      { label: "Gold Purity", value: "22k BIS Hallmarked" },
      { label: "Diamonds", value: "Natural Polki" },
      { label: "Sizing", value: "Custom Tailored" },
    ],
  },
  {
    src: UNSPLASH("1600003014755-ba31aa59c4b6"),
    alt: "Multi-Tiered Polki and Ruby Drop Necklace",
    title: "Meherbani Royal Necklace",
    subtitle: "Multi-strand Gold Beads with Ruby Pavé",
    badge: "Ready to Ship",
    price: "₹12,600",
    href: "/product/meherbani",
    meta: [
      { label: "Includes", value: "Matching Drop Earrings" },
      { label: "Stones", value: "Faceted Rubies & Kundan" },
      { label: "Dispatch", value: "24-48 Hours" },
    ],
  },
];

export default function DemoOne() {
  return (
    <div className="w-full overflow-hidden bg-background py-10">
      <CoverflowCarousel
        slides={SLIDES}
        showCaption
        showNavigation
        showPagination
        cardWidth="clamp(220px, 28vw, 360px)"
        rotate={38}
        depth={0.7}
        perspective={2.8}
      />
    </div>
  );
}
