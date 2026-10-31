"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  Gift,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Share2,
  Heart,
  ZoomIn,
  Maximize2,
  X,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useHydrated } from "@/hooks/useHydrated";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { whatsappLink } from "@/data/siteConfig";
import type { Product } from "@/data/products";



export default function ProductClient({
  id,
  initialProduct,
}: {
  id: string;
  /** Resolved server-side so catalog-only (BUSY) ids render before the store loads */
  initialProduct?: Product;
}) {
  const { products, getById, fetchProducts } = useProductStore();

  // Trigger fetch on mount so the store is always populated
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const product = getById(id) ?? initialProduct ?? products[0]; // page.tsx 404s unknown ids; this is only a safety net

  // State for active image gallery
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Sync selectedImage when product changes
  useEffect(() => {
    setSelectedImage(product.image);
  }, [product.image]);

  // Ensure fresh media delivery and bypass cached orientation mismatches
  const getMediaUrl = (url: string) => {
    if (!url) return url;
    if (url.includes("/storage/v1/object/public/media/")) {
      const sep = url.includes("?") ? "&" : "?";
      return `${url}${sep}v=portrait_v3`;
    }
    return url;
  };

  const currentIndex = Math.max(0, product.gallery.indexOf(selectedImage));

  const handlePrevImage = () => {
    if (product.gallery.length <= 1) return;
    const nextIdx = (currentIndex - 1 + product.gallery.length) % product.gallery.length;
    setSelectedImage(product.gallery[nextIdx]);
  };

  const handleNextImage = () => {
    if (product.gallery.length <= 1) return;
    const nextIdx = (currentIndex + 1) % product.gallery.length;
    setSelectedImage(product.gallery[nextIdx]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  // Keyboard navigation when Lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentIndex, product.gallery]);

  // Accordion active tabs
  const [openTab, setOpenTab] = useState<string | null>("specs");

  // Bag addition state feedback
  const [addedToBag, setAddedToBag] = useState(false);

  // Sizing selection state
  const [selectedSize, setSelectedSize] = useState("Standard Atelier Fit");

  // Stores
  const { addItem } = useCartStore();
  const { toggle: toggleWishlist, isWishlisted } = useWishlistStore();
  const { format } = useCurrencyStore();
  const hydrated = useHydrated();
  const wishlisted = hydrated ? isWishlisted(product.id) : false;

  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  const handleAddToBag = () => {
    if (authLoaded && !isSignedIn) {
      router.push(`/login?redirect_url=${encodeURIComponent(pathname)}`);
      return;
    }
    addItem(product, selectedSize);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 3500);
  };

  // Related products (exclude current)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <Layout>
      <Script id="structured-data-product" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.gallery,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": "Zevar Baksa"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://zevarbaksa.com/product/${product.id}`,
          "priceCurrency": "INR",
          "price": product.price,
          "availability": product.status === "Out of Stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }) }} />
      <div className="bg-background min-h-screen pt-28 md:pt-36 pb-20 font-sans">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-16">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground/50 mb-8 md:mb-12 font-sans">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 stroke-[1.5]" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-3 w-3 stroke-[1.5]" />
            <span className="text-foreground/80 font-medium">{product.category}</span>
            <ChevronRight className="h-3 w-3 stroke-[1.5]" />
            <span className="text-primary truncate max-w-[180px] font-semibold">
              {product.name}
            </span>
          </nav>

          {/* MAIN PRODUCT GRID (2-Columns: Left Gallery, Right Details) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: MULTI-IMAGE GALLERY (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
              
              {/* Thumbnails rail */}
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[680px] scrollbar-none flex-shrink-0 py-0.5">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    aria-label={`View ${product.name} angle ${idx + 1}`}
                    className={`relative w-16 h-22 sm:w-20 sm:h-26 md:w-22 md:h-28 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 flex items-center justify-center ${
                      selectedImage === imgUrl
                        ? "ring-2 ring-primary shadow-md scale-[1.02] opacity-100"
                        : "opacity-60 hover:opacity-100 hover:scale-[1.01]"
                    }`}
                  >
                    <img
                      src={getMediaUrl(imgUrl)}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>

              {/* Main Featured Image — Clean, direct presentation with zero extra section box */}
              <div
                className="relative flex-1 select-none flex items-start justify-center group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                {/* Main Image with Zoom pan */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative w-full cursor-zoom-in overflow-hidden rounded-2xl flex items-center justify-center"
                  title="Click to view full screen"
                >
                  <img
                    src={getMediaUrl(selectedImage)}
                    alt={product.name}
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isZoomed ? "scale(1.35)" : "scale(1)",
                    }}
                    className="w-full h-auto max-h-[760px] object-contain mx-auto rounded-2xl transition-transform duration-200 ease-out pointer-events-none"
                  />

                  {/* Floating Action Controls: Fullscreen Zoom & Share */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      className="h-9 w-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md text-[#420002] border border-[#420002]/10 flex items-center justify-center transition-all duration-300 shadow-sm opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:scale-105"
                      title="Fullscreen zoom"
                      aria-label="Zoom image"
                    >
                      <Maximize2 className="h-4 w-4 stroke-[1.7]" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(window.location.href);
                      }}
                      className="h-9 w-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md text-[#420002] border border-[#420002]/10 flex items-center justify-center transition-all duration-300 shadow-sm opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:scale-105"
                      title="Copy link to product"
                      aria-label="Share product"
                    >
                      <Share2 className="h-4 w-4 stroke-[1.7]" />
                    </button>
                  </div>

                  {/* Floating Left / Right Nav Arrows */}
                  {product.gallery.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/85 hover:bg-white text-[#420002] backdrop-blur-md border border-[#420002]/10 shadow-md flex items-center justify-center transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:scale-110 active:scale-95"
                        aria-label="Previous view"
                      >
                        <ChevronLeft className="h-5 w-5 stroke-[1.8]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/85 hover:bg-white text-[#420002] backdrop-blur-md border border-[#420002]/10 shadow-md flex items-center justify-center transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:scale-110 active:scale-95"
                        aria-label="Next view"
                      >
                        <ChevronRight className="h-5 w-5 stroke-[1.8]" />
                      </button>
                    </>
                  )}

                  {/* Availability Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold backdrop-blur-md shadow-xs font-sans ${
                        product.status === "Ready to Ship"
                          ? "bg-[#2D4A3E]/90 text-[#E2F2E7] border border-[#3E6554]/30"
                          : product.status === "Made to Order"
                          ? "bg-[#5A381E]/90 text-[#F5E6D8] border border-[#7A4F2C]/30"
                          : "bg-stone-800/80 text-stone-200 border border-stone-600/30"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  {/* Bottom Gallery Position Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#420002] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] border border-[#420002]/10 shadow-xs pointer-events-none opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    {currentIndex + 1} / {product.gallery.length}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: STICKY PRODUCT INFO & ACTIONS (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32 font-sans">
              
              {/* Category & Collection Tag */}
              <div>
                {/* Category, Collection & Product Code */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {product.specs.code && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#420002] text-[#fffaee] text-[9px] uppercase tracking-[0.25em] font-bold font-sans">
                      {product.specs.code}
                    </span>
                  )}
                  <span className="text-[11px] uppercase tracking-[0.32em] text-primary font-medium font-sans">
                    {product.category}
                  </span>
                  {product.collection && (
                    <>
                      <span className="text-foreground/30">•</span>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/60 font-sans">
                        {product.collection}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl md:text-5xl text-foreground font-normal leading-[1.1] tracking-wide">
                  {product.name}
                </h1>

                {/* Subtitle / Spec brief */}
                <p className="mt-2.5 text-sm text-foreground/75 font-sans leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Taxes */}
              <div className="flex items-baseline gap-3 border-y border-border/60 py-4">
                <span className="font-display text-3xl md:text-4xl text-primary font-normal">
                  {hydrated ? format(product.price) : `₹${product.price.toLocaleString("en-IN")}`}
                </span>
                <span className="text-xs text-foreground/55 font-sans">
                  Inclusive of all taxes & insured shipping
                </span>
              </div>

              {/* Dispatch timeframe alert */}
              <div className="flex items-center gap-3 bg-secondary/60 border border-primary/15 p-3.5 rounded-lg text-foreground/80 text-[12px] font-sans">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <span>
                  <strong>Fulfillment:</strong> {product.dispatchTime}
                </span>
              </div>

              {/* Custom Sizing Dropdown / Info */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/80 mb-2 font-sans">
                  Size & Fit Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Standard Atelier Fit", "Custom Sizing Request"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedSize(option)}
                      className={`px-4 py-2.5 rounded-md text-[11px] uppercase tracking-[0.15em] border transition-all text-center font-sans ${
                        selectedSize === option
                          ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                          : "border-border text-foreground/70 hover:border-foreground/40 bg-background"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3 pt-2">
                
                {/* Primary Add to Box button */}
                <button
                  onClick={handleAddToBag}
                  disabled={product.status === "Out of Stock"}
                  className={`w-full py-4 px-6 rounded-full text-[11px] uppercase tracking-[0.25em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md ${
                    product.status === "Out of Stock"
                      ? "bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-300"
                      : addedToBag
                      ? "bg-emerald-800 text-emerald-100 hover:bg-emerald-900 shadow-lg scale-[1.01]"
                      : "bg-primary text-primary-foreground hover:bg-[#5C0A19] hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                >
                  {addedToBag ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Added to Heirloom Box
                    </>
                  ) : product.status === "Out of Stock" ? (
                    "Currently Out of Stock"
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 stroke-[1.7]" />
                      Add to Heirloom Box
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    if (authLoaded && !isSignedIn) {
                      router.push(`/login?redirect_url=${encodeURIComponent(pathname)}`);
                      return;
                    }
                    toggleWishlist(product);
                  }}
                  className={`w-full py-3 px-6 rounded-full border text-[11px] uppercase tracking-[0.22em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 ${
                    wishlisted
                      ? "border-primary/60 bg-primary/5 text-primary"
                      : "border-border text-foreground/60 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wishlisted ? "fill-primary text-primary" : ""}`} />
                  {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
                </button>

                {/* WhatsApp Concierge — number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (falls back to /contact) */}
                <Link
                  href={whatsappLink(`Hello Zevar Baksa, I would like to enquire about ${product.name}.`)}
                  className="w-full py-3.5 px-6 rounded-full border border-primary/30 text-primary hover:bg-primary/5 text-[11px] uppercase tracking-[0.22em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  Inquire via WhatsApp Concierge
                </Link>
              </div>

              {/* SUCCESS TOAST NOTIFICATION */}
              {addedToBag && (
                <div className="p-4 rounded-lg bg-emerald-950/90 text-emerald-100 text-xs font-body flex items-center justify-between border border-emerald-500/30 animate-fade-in shadow-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>
                      <strong>{product.name}</strong> added to your collection!
                    </span>
                  </div>
                  <Link
                    href="/shop"
                    className="underline text-amber-300 hover:text-white uppercase tracking-wider text-[10px] font-semibold"
                  >
                    View Box
                  </Link>
                </div>
              )}

              {/* TRUST & ASSURANCE BADGES */}
              <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-6 mt-2 text-center">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-secondary/40">
                  <ShieldCheck className="h-5 w-5 text-primary stroke-[1.4]" />
                  <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-foreground/80 font-sans">
                    BIS Hallmarked
                  </span>
                  <span className="text-[9px] text-foreground/50 font-sans">22k Certified</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-secondary/40">
                  <Truck className="h-5 w-5 text-primary stroke-[1.4]" />
                  <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-foreground/80 font-sans">
                    Insured Transit
                  </span>
                  <span className="text-[9px] text-foreground/50 font-sans">Doorstep Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-secondary/40">
                  <Gift className="h-5 w-5 text-primary stroke-[1.4]" />
                  <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-foreground/80 font-sans">
                    Velvet Packaging
                  </span>
                  <span className="text-[9px] text-foreground/50 font-sans">Brass Box Included</span>
                </div>
              </div>

              {/* ACCORDION SPECIFICATIONS & HERITAGE TABS */}
              <div className="border-t border-border/60 pt-4 flex flex-col gap-3 font-sans">
                
                {/* Tab 1: Specifications */}
                <div className="border border-border/60 rounded-lg overflow-hidden bg-background">
                  <button
                    onClick={() => toggleTab("specs")}
                    className="w-full flex items-center justify-between p-4 text-left font-sans text-xs uppercase tracking-[0.2em] font-semibold text-primary hover:bg-secondary/40 transition-colors"
                  >
                    <span>Materials & Technical Specifications</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        openTab === "specs" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openTab === "specs" && (
                    <div className="p-4 pt-2 border-t border-border/40 text-[13px] text-foreground/80 space-y-2.5 font-sans">
                      {product.specs.code && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">Product Code</span>
                          <span className="font-semibold text-primary text-right">{product.specs.code}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-foreground/50 font-medium">Precious Metal</span>
                        <span className="font-semibold text-right">{product.specs.metal}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-foreground/50 font-medium">Gemstones & Detail</span>
                        <span className="font-semibold text-right max-w-[240px]">{product.specs.gemstones}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/30 pb-2">
                        <span className="text-foreground/50 font-medium">Craft Technique</span>
                        <span className="font-semibold text-right">{product.specs.craftsmanship}</span>
                      </div>
                      {product.specs.setting && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">Collet & Setting</span>
                          <span className="font-semibold text-right">{product.specs.setting}</span>
                        </div>
                      )}
                      {product.specs.strand && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">Strand & Closure</span>
                          <span className="font-semibold text-right">{product.specs.strand}</span>
                        </div>
                      )}
                      {product.specs.design && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">Motif & Design</span>
                          <span className="font-semibold text-right">{product.specs.design}</span>
                        </div>
                      )}
                      {product.specs.weight && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">Gross Weight</span>
                          <span className="font-semibold text-right">{product.specs.weight}</span>
                        </div>
                      )}
                      {product.specs.dimensions && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">
                            {product.category === "Earrings"
                              ? "Earring Size"
                              : product.type === "Pendant"
                              ? "Pendant Size"
                              : "Dimensions & Fit"}
                          </span>
                          <span className="font-semibold text-right">{product.specs.dimensions}</span>
                        </div>
                      )}
                      {product.specs.finish && (
                        <div className="flex justify-between border-b border-border/30 pb-2">
                          <span className="text-foreground/50 font-medium">Atelier Finish</span>
                          <span className="font-semibold text-right">{product.specs.finish}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1">
                        <span className="text-foreground/50 font-medium">Authentication</span>
                        <span className="font-semibold text-primary text-right">{product.specs.certification}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tab 2: Heritage & Inspiration */}
                <div className="border border-border/60 rounded-lg overflow-hidden bg-background">
                  <button
                    onClick={() => toggleTab("story")}
                    className="w-full flex items-center justify-between p-4 text-left font-sans text-xs uppercase tracking-[0.2em] font-semibold text-primary hover:bg-secondary/40 transition-colors"
                  >
                    <span>Artisan Heritage & Inspiration</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        openTab === "story" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openTab === "story" && (
                    <div className="p-4 pt-2 border-t border-border/40 text-[13px] text-foreground/80 font-sans leading-relaxed space-y-3">
                      <p>{product.description}</p>
                      <p className="italic text-foreground/70 border-l-2 border-primary/40 pl-3 font-serif text-base">
                        &quot;{product.story}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Tab 3: Care & Maintenance */}
                <div className="border border-border/60 rounded-lg overflow-hidden bg-background">
                  <button
                    onClick={() => toggleTab("care")}
                    className="w-full flex items-center justify-between p-4 text-left font-sans text-xs uppercase tracking-[0.2em] font-semibold text-primary hover:bg-secondary/40 transition-colors"
                  >
                    <span>Complimentary Lifetime Care</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        openTab === "care" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openTab === "care" && (
                    <div className="p-4 pt-2 border-t border-border/40 text-[13px] text-foreground/80 font-sans leading-relaxed space-y-2">
                      <p>
                        • Store individually in the provided velvet brass box away from moisture and perfume.
                      </p>
                      <p>
                        • Clean gently with a lint-free dry cloth after each wearing.
                      </p>
                      <p>
                        • Includes <strong>complimentary annual re-polishing & inspection</strong> at our Jaipur atelier.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* PAIR IT WITH / RELATED HEIRLOOMS SECTION */}
          <div className="mt-28 border-t border-border pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-primary font-semibold font-sans mb-2">
                  Curated Pairings
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-foreground">
                  You May Also Love
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-[11px] uppercase tracking-[0.22em] font-sans text-primary hover:text-[#5C0A19] flex items-center gap-1 font-semibold"
              >
                View Full Collection <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN LUXURY ATELIER LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0d0204]/96 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 animate-fade-in select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white/90 z-20 pb-4 border-b border-white/10 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl md:text-2xl text-[#f3eedf]">{product.name}</span>
              <span className="text-white/30">•</span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-sans font-medium">
                View {currentIndex + 1} of {product.gallery.length}
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Close fullscreen view"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Full-Res Display with Navigation */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-auto px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {product.gallery.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md"
                aria-label="Previous view"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <img
              src={getMediaUrl(selectedImage)}
              alt={product.name}
              className="max-h-[82vh] max-w-full object-contain rounded-xl drop-shadow-2xl select-none"
            />

            {product.gallery.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md"
                aria-label="Next view"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip in Lightbox */}
          <div
            className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20 max-w-4xl mx-auto w-full scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {product.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative w-14 h-18 rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
                  selectedImage === imgUrl
                    ? "border-[#d4af37] ring-2 ring-[#d4af37]/40 scale-105 opacity-100"
                    : "border-white/20 opacity-40 hover:opacity-100"
                }`}
              >
                <img
                  src={getMediaUrl(imgUrl)}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
