"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Img } from "@/components/Img";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  CheckCircle2,
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

  // Ensure fresh media delivery and normalize any remote Supabase URLs to local HTTPS CDN paths
  const getMediaUrl = (url: string) => {
    if (!url) return "";
    let clean = url;
    if (clean.includes("/storage/v1/object/public/media/")) {
      clean = "/" + clean.split("/storage/v1/object/public/media/")[1];
    }
    const sep = clean.includes("?") ? "&" : "?";
    return `${clean}${sep}v=portrait_v3`;
  };

  const currentIndex = Math.max(0, product.gallery.indexOf(selectedImage));

  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const lightboxCarouselRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const scrollToSlide = (idx: number, smooth = true) => {
    if (idx < 0 || idx >= product.gallery.length) return;
    setSelectedImage(product.gallery[idx]);
    isProgrammaticScroll.current = true;

    if (mobileCarouselRef.current) {
      const width = mobileCarouselRef.current.clientWidth;
      mobileCarouselRef.current.scrollTo({
        left: idx * width,
        behavior: smooth ? "smooth" : "instant",
      });
    }

    if (lightboxCarouselRef.current) {
      const width = lightboxCarouselRef.current.clientWidth;
      lightboxCarouselRef.current.scrollTo({
        left: idx * width,
        behavior: smooth ? "smooth" : "instant",
      });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  };

  const handleMobileScroll = () => {
    if (isProgrammaticScroll.current || !mobileCarouselRef.current) return;
    const { scrollLeft, clientWidth } = mobileCarouselRef.current;
    if (clientWidth === 0) return;
    const newIdx = Math.round(scrollLeft / clientWidth);
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < product.gallery.length) {
      setSelectedImage(product.gallery[newIdx]);
    }
  };

  const handleLightboxScroll = () => {
    if (isProgrammaticScroll.current || !lightboxCarouselRef.current) return;
    const { scrollLeft, clientWidth } = lightboxCarouselRef.current;
    if (clientWidth === 0) return;
    const newIdx = Math.round(scrollLeft / clientWidth);
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < product.gallery.length) {
      setSelectedImage(product.gallery[newIdx]);
    }
  };

  const handlePrevImage = () => {
    if (product.gallery.length <= 1) return;
    const nextIdx = (currentIndex - 1 + product.gallery.length) % product.gallery.length;
    scrollToSlide(nextIdx);
  };

  const handleNextImage = () => {
    if (product.gallery.length <= 1) return;
    const nextIdx = (currentIndex + 1) % product.gallery.length;
    scrollToSlide(nextIdx);
  };

  // Sync carousel slide when lightbox opens
  useEffect(() => {
    if (isLightboxOpen && lightboxCarouselRef.current) {
      const width = lightboxCarouselRef.current.clientWidth;
      lightboxCarouselRef.current.scrollTo({
        left: currentIndex * width,
        behavior: "instant",
      });
    }
  }, [isLightboxOpen]);

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

  // Lightbox thumbnail strip ref & active thumbnail auto-scroll
  const lightboxThumbsRef = useRef<HTMLDivElement>(null);
  const lightboxThumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pageThumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep active thumbnail visible in both gallery rail and lightbox strip
  useEffect(() => {
    if (isLightboxOpen && lightboxThumbRefs.current[currentIndex]) {
      lightboxThumbRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    if (pageThumbRefs.current[currentIndex]) {
      pageThumbRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isLightboxOpen, currentIndex]);

  // Wheel / trackpad scrolling through lightbox gallery
  const lastScrollTime = useRef(0);
  const handleLightboxWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 280) return;
    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      lastScrollTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  // Touch swipe through lightbox gallery
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    touchStartX.current = null;
  };

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
            <div className="lg:col-span-7">

              {/* MOBILE GALLERY VIEW (md:hidden) — Native Smooth Touch-Swipe Carousel & Stable Frame */}
              <div className="md:hidden flex flex-col gap-3.5">
                {/* Fixed Aspect-Ratio Stage: Stable, Zero Layout Shifts */}
                <div className="relative w-full aspect-[4/5] bg-[#f7f2e7]/80 rounded-2xl overflow-hidden shadow-xs border border-[#420002]/5">
                  <div
                    ref={mobileCarouselRef}
                    onScroll={handleMobileScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x w-full h-full"
                  >
                    {product.gallery.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedImage(imgUrl);
                          setIsLightboxOpen(true);
                        }}
                        className="min-w-full w-full h-full snap-center flex-shrink-0 relative flex items-center justify-center p-3.5 cursor-zoom-in select-none"
                      >
                        <Img
                          src={getMediaUrl(imgUrl)}
                          sizes="(max-width: 768px) 100vw, 55vw"
                          priority={idx === 0}
                          alt={`${product.name} view ${idx + 1}`}
                          className="w-full h-full object-contain pointer-events-none drop-shadow-sm transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Top-Left: Availability Badge */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] uppercase tracking-[0.2em] font-medium backdrop-blur-md shadow-xs ${
                        product.status === "Ready to Ship"
                          ? "bg-[#1E3A2F]/90 text-[#D7EFE2] border border-[#2F5848]/40"
                          : "bg-[#420002]/90 text-[#FAF7F2] border border-[#d4af37]/30"
                      }`}
                    >
                      <span className="text-[#d4af37]">✦</span> {product.status}
                    </span>
                  </div>

                  {/* Top-Right: Fullscreen Zoom & Share */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      className="h-8 w-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#420002] border border-[#420002]/10 flex items-center justify-center shadow-xs active:scale-95 transition-all"
                      aria-label="Fullscreen zoom"
                    >
                      <Maximize2 className="h-3.5 w-3.5 stroke-[1.8]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(window.location.href);
                      }}
                      className="h-8 w-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#420002] border border-[#420002]/10 flex items-center justify-center shadow-xs active:scale-95 transition-all"
                      aria-label="Share product"
                    >
                      <Share2 className="h-3.5 w-3.5 stroke-[1.8]" />
                    </button>
                  </div>

                  {/* Floating Bottom: Counter Pill */}
                  <div className="absolute bottom-3 inset-x-0 z-20 pointer-events-none flex flex-col items-center gap-1.5">
                    <div className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[#fffaee] text-[10px] font-sans font-medium tracking-[0.2em] shadow-xs">
                      {currentIndex + 1} / {product.gallery.length}
                    </div>
                  </div>
                </div>

                {/* Mobile Thumbnails Strip */}
                {product.gallery.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none w-full">
                    {product.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        ref={(el) => {
                          pageThumbRefs.current[idx] = el;
                        }}
                        onClick={() => scrollToSlide(idx)}
                        aria-label={`View ${product.name} angle ${idx + 1}`}
                        className={`relative aspect-[4/5] w-14 sm:w-16 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 bg-[#f7f2e7]/80 flex items-center justify-center border-2 ${
                          currentIndex === idx
                            ? "border-[#c82127] ring-2 ring-[#c82127]/20 scale-105 opacity-100 shadow-sm"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Img
                          src={getMediaUrl(imgUrl)}
                          sizes="80px"
                          alt={`${product.name} view ${idx + 1}`}
                          className="w-full h-full object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DESKTOP GALLERY VIEW (hidden md:flex) */}
              <div className="hidden md:flex gap-4 lg:gap-6">
                {/* Thumbnails rail */}
                <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[680px] scrollbar-none flex-shrink-0 py-0.5">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      ref={(el) => {
                        pageThumbRefs.current[idx] = el;
                      }}
                      onClick={() => scrollToSlide(idx)}
                      aria-label={`View ${product.name} angle ${idx + 1}`}
                      className={`relative w-20 h-26 md:w-22 md:h-28 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 flex items-center justify-center bg-[#f7f2e7]/80 border-2 ${
                        currentIndex === idx
                          ? "border-[#c82127] ring-2 ring-[#c82127]/20 shadow-md scale-[1.02] opacity-100"
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.01]"
                      }`}
                    >
                      <Img
                        src={getMediaUrl(imgUrl)}
                        sizes="96px"
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-contain p-1 rounded-xl"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Featured Image with Hover Zoom Pan */}
                <div
                  className="relative flex-1 select-none flex items-start justify-center group"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative w-full aspect-[4/5] max-h-[720px] bg-[#f7f2e7]/80 cursor-zoom-in overflow-hidden rounded-2xl flex items-center justify-center border border-[#420002]/5 shadow-xs"
                    title="Click to view full screen"
                  >
                    <Img
                      src={getMediaUrl(selectedImage)}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                      alt={product.name}
                      style={{
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: isZoomed ? "scale(1.4)" : "scale(1)",
                      }}
                      className="w-full h-full object-contain p-4 mx-auto rounded-2xl transition-transform duration-200 ease-out pointer-events-none drop-shadow-sm"
                    />

                    {/* Floating Action Controls */}
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
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-medium backdrop-blur-md shadow-xs font-sans ${
                          product.status === "Ready to Ship"
                            ? "bg-[#1E3A2F]/90 text-[#D7EFE2] border border-[#2F5848]/40"
                            : "bg-[#420002]/90 text-[#FAF7F2] border border-[#d4af37]/30"
                        }`}
                      >
                        <span className="text-[#d4af37]">✦</span> {product.status}
                      </span>
                    </div>

                    {/* Bottom Gallery Position Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#420002] text-[10px] font-sans font-semibold uppercase tracking-[0.22em] border border-[#420002]/10 shadow-xs pointer-events-none opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {currentIndex + 1} of {product.gallery.length}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STICKY PRODUCT INFO & ACTIONS (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32 font-sans">

              {/* Category & Collection Tag */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#420002] font-semibold font-sans">
                    {product.category}
                  </span>
                  {product.collection && (
                    <>
                      <span className="text-[#420002]/30">•</span>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/60 font-sans">
                        {product.collection}
                      </span>
                    </>
                  )}
                  <span className="text-[#d4af37] text-xs">✦</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-medium font-sans">
                    925 Solid Silver
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl sm:text-5xl text-[#420002] font-normal leading-[1.08] tracking-normal">
                  {product.name}
                </h1>

                {/* Subtitle / Spec brief */}
                <p className="mt-2.5 text-sm sm:text-base text-foreground/75 font-sans leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Taxes */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-y border-[#420002]/15 py-4 gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl text-[#420002] font-normal tracking-tight">
                    {hydrated ? format(product.price) : `₹${product.price.toLocaleString("en-IN")}`}
                  </span>
                  <span className="text-xs text-foreground/60 font-sans">
                    Inclusive of all taxes
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-medium font-sans flex items-center gap-1">
                  <span>✦</span> Free Insured Transit
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3 pt-2">

                {/* Primary Add to Box button */}
                <button
                  onClick={handleAddToBag}
                  disabled={product.status === "Out of Stock"}
                  className={`w-full py-4 px-6 rounded-full text-[11px] uppercase tracking-[0.25em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md ${product.status === "Out of Stock"
                      ? "bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-300"
                      : addedToBag
                        ? "bg-[#1E3A2F] text-[#D7EFE2] hover:bg-[#274D3E] shadow-lg scale-[1.01]"
                        : "bg-[#420002] text-[#fffaee] hover:bg-[#5a0003] hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] border border-transparent hover:border-[#d4af37]/40"
                    }`}
                >
                  {addedToBag ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
                      Added to Heirloom Box
                    </>
                  ) : product.status === "Out of Stock" ? (
                    "Currently Out of Stock"
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 stroke-[1.8] text-[#d4af37]" />
                      Add to Heirloom Box
                    </>
                  )}
                </button>

                {/* Secondary Actions: Wishlist & WhatsApp Concierge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      if (authLoaded && !isSignedIn) {
                        router.push(`/login?redirect_url=${encodeURIComponent(pathname)}`);
                        return;
                      }
                      toggleWishlist(product);
                    }}
                    className={`w-full py-3 px-4 rounded-full border text-[11px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${wishlisted
                        ? "border-[#420002] bg-[#420002]/5 text-[#420002]"
                        : "border-[#420002]/20 text-foreground/70 hover:border-[#420002] hover:text-[#420002] bg-transparent"
                      }`}
                  >
                    <Heart className={`h-4 w-4 ${wishlisted ? "fill-[#420002] text-[#420002]" : "text-[#420002]"}`} />
                    {wishlisted ? "In Wishlist" : "Save to Wishlist"}
                  </button>

                  <Link
                    href={whatsappLink(`Hello Zevar Baksa, I would like to enquire about ${product.name}.`)}
                    className="w-full py-3 px-4 rounded-full border border-[#420002]/20 text-[#420002] hover:border-[#420002] hover:bg-[#420002]/5 text-[11px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    WhatsApp Concierge
                  </Link>
                </div>
              </div>

              {/* SUCCESS TOAST NOTIFICATION */}
              {addedToBag && (
                <div className="p-4 rounded-xl bg-[#1E3A2F] text-[#D7EFE2] text-xs font-sans flex items-center justify-between border border-[#2F5848] animate-fade-in shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#d4af37]" />
                    <span>
                      <strong>{product.name}</strong> added to your Heirloom Box.
                    </span>
                  </div>
                  <Link
                    href="/shop"
                    className="underline text-[#d4af37] hover:text-white uppercase tracking-wider text-[10px] font-semibold"
                  >
                    View Box
                  </Link>
                </div>
              )}

              {/* ACCORDION SPECIFICATIONS & HERITAGE TABS */}
              <div className="border-t border-[#420002]/15 pt-2 flex flex-col font-sans">

                {/* Tab 1: Specifications */}
                <div className="border-b border-[#420002]/10 py-3.5">
                  <button
                    onClick={() => toggleTab("specs")}
                    className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#420002] hover:text-[#5a0003] transition-colors"
                  >
                    <span>Materials & Technical Specifications</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${openTab === "specs" ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openTab === "specs" && (
                    <div className="pt-4 pb-2 text-[13px] text-foreground/80 space-y-2.5 font-sans">
                      <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                        <span className="text-foreground/55 font-medium">Precious Metal</span>
                        <span className="font-semibold text-right">{product.specs.metal}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                        <span className="text-foreground/55 font-medium">Gemstones & Detail</span>
                        <span className="font-semibold text-right max-w-[260px]">{product.specs.gemstones}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                        <span className="text-foreground/55 font-medium">Craft Technique</span>
                        <span className="font-semibold text-right">{product.specs.craftsmanship}</span>
                      </div>
                      {product.specs.setting && (
                        <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                          <span className="text-foreground/55 font-medium">Collet & Setting</span>
                          <span className="font-semibold text-right">{product.specs.setting}</span>
                        </div>
                      )}
                      {product.specs.strand && (
                        <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                          <span className="text-foreground/55 font-medium">Strand & Closure</span>
                          <span className="font-semibold text-right">{product.specs.strand}</span>
                        </div>
                      )}
                      {product.specs.design && (
                        <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                          <span className="text-foreground/55 font-medium">Motif & Design</span>
                          <span className="font-semibold text-right">{product.specs.design}</span>
                        </div>
                      )}
                      {product.specs.weight && (
                        <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                          <span className="text-foreground/55 font-medium">Gross Weight</span>
                          <span className="font-semibold text-right">{product.specs.weight}</span>
                        </div>
                      )}
                      {product.specs.dimensions && (
                        <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                          <span className="text-foreground/55 font-medium">
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
                        <div className="flex justify-between border-b border-[#420002]/10 pb-2">
                          <span className="text-foreground/55 font-medium">Atelier Finish</span>
                          <span className="font-semibold text-right">{product.specs.finish}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1">
                        <span className="text-foreground/55 font-medium">Authentication</span>
                        <span className="font-semibold text-[#420002] text-right">{product.specs.certification}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tab 2: Heritage & Inspiration */}
                <div className="border-b border-[#420002]/10 py-3.5">
                  <button
                    onClick={() => toggleTab("story")}
                    className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#420002] hover:text-[#5a0003] transition-colors"
                  >
                    <span>Artisan Heritage & Inspiration</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${openTab === "story" ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Always rendered (hidden when closed) so the story is in the page text crawlers read */}
                  <div hidden={openTab !== "story"} className="pt-4 pb-2 text-[13px] text-foreground/80 font-sans leading-relaxed space-y-3">
                    <p>{product.description}</p>
                    <p className="italic text-[#420002] border-l-2 border-[#d4af37] pl-3.5 font-serif text-base">
                      &quot;{product.story}&quot;
                    </p>
                  </div>
                </div>

                {/* Tab 3: Care & Maintenance */}
                <div className="border-b border-[#420002]/10 py-3.5">
                  <button
                    onClick={() => toggleTab("care")}
                    className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#420002] hover:text-[#5a0003] transition-colors"
                  >
                    <span>Complimentary Lifetime Care</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${openTab === "care" ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openTab === "care" && (
                    <div className="pt-4 pb-2 text-[13px] text-foreground/80 font-sans leading-relaxed space-y-2">
                      <p>
                        ✦ Store individually in the provided signature velvet brass box away from moisture and perfume.
                      </p>
                      <p>
                        ✦ Clean gently with a lint-free dry cloth after each wearing.
                      </p>
                      <p>
                        ✦ Includes <strong>complimentary annual re-polishing & inspection</strong> at our Jaipur atelier.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* PAIR IT WITH / RELATED HEIRLOOMS SECTION */}
          <div className="mt-28 border-t border-[#420002]/15 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-[#420002] font-semibold font-sans mb-2 flex items-center gap-1.5">
                  <span className="text-[#d4af37]">✦</span> From the Meena Bagh Atelier
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-[#420002] font-normal tracking-normal">
                  Complete Your Royal Parure
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-[11px] uppercase tracking-[0.25em] font-sans text-[#420002] hover:text-[#5a0003] flex items-center gap-1.5 font-semibold group"
              >
                Explore Full Atelier <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          className="fixed inset-0 z-50 bg-[#0d0204]/96 backdrop-blur-2xl flex flex-col h-[100dvh] w-screen overflow-hidden select-none animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex-shrink-0 flex items-center justify-between text-white/90 z-30 px-4 sm:px-6 md:px-8 pt-4 pb-3 border-b border-white/10 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg sm:text-xl md:text-2xl text-[#f3eedf]">{product.name}</span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-sans font-medium">
                View {currentIndex + 1} of {product.gallery.length}
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Full-Res Display Carousel (Smooth swipe on mobile, smooth navigation on desktop) */}
          <div
            ref={lightboxCarouselRef}
            onScroll={handleLightboxScroll}
            className="relative flex-1 min-h-0 flex items-center overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x w-full animate-modal-in"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleLightboxWheel}
          >
            {product.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="min-w-full w-full h-full snap-center flex-shrink-0 flex items-center justify-center p-3 sm:p-6"
              >
                <Img
                  src={getMediaUrl(imgUrl)}
                  sizes="100vw"
                  alt={`${product.name} fullscreen view ${idx + 1}`}
                  className="max-h-[76vh] sm:max-h-[82vh] max-w-[92vw] sm:max-w-4xl object-contain rounded-xl drop-shadow-2xl select-none"
                />
              </div>
            ))}
          </div>

          {/* Desktop Chevron Floating Buttons */}
          {product.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 text-white items-center justify-center transition-all z-30 backdrop-blur-md shadow-lg active:scale-95"
                aria-label="Previous view"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 text-white items-center justify-center transition-all z-30 backdrop-blur-md shadow-lg active:scale-95"
                aria-label="Next view"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Bottom Thumbnails Strip in Lightbox - Fully Visible, Elevated with Breathing Room */}
          <div
            className="flex-shrink-0 z-30 max-w-4xl mx-auto w-full px-4 pt-2 pb-5 sm:pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={lightboxThumbsRef}
              className="flex items-center justify-center gap-2.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none"
            >
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  ref={(el) => {
                    lightboxThumbRefs.current[idx] = el;
                  }}
                  onClick={() => scrollToSlide(idx)}
                  className={`relative w-12 h-16 sm:w-14 sm:h-19 md:w-16 md:h-22 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 bg-white/5 ${
                    currentIndex === idx
                      ? "border-[#d4af37] ring-2 ring-[#d4af37]/40 scale-105 opacity-100 shadow-[0_0_14px_rgba(212,175,55,0.45)]"
                      : "border-white/20 opacity-45 hover:opacity-100 hover:border-white/50"
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                >
                  <Img
                    src={getMediaUrl(imgUrl)}
                    sizes="80px"
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain p-1 rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
