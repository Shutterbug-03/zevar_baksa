"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, X, ChevronDown, Heart } from "lucide-react";
import { collections } from "@/data/collections";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import { useCurrencyStore, ALL_CURRENCIES, FLAGS, type Currency } from "@/store/currencyStore";

// WhatsApp number — update this to the real Zevar Baksa number
const WHATSAPP_NUMBER = "919876543210";

const mainLinks = [
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collection/celestial-heritage", isCollections: true },
  { label: "About Us", to: "/about" },
  { label: "Retail Store", to: "/contact" },
  { label: "Wishlist", to: "/wishlist" },
];

const secondaryLinks = [
  { label: "Log in", action: "login" as const },
  { label: "Search", action: "search" as const },
  { label: "Jewellery Care & Material", to: "/about" },
  { label: "Shipping Policy", to: "/about" },
  { label: "Returns & Exchange", to: "/about" },
  { label: "Contact Atelier", to: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const isDarkHeroPage = pathname === "/" || pathname?.startsWith("/collection");

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);

  // Stores
  const { openCart, totalItems } = useCartStore();
  const { count: wishlistCount } = useWishlistStore();
  const { openSearch, openLogin } = useUIStore();
  const { currency, setCurrency } = useCurrencyStore();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const isLightHeader = !isDarkHeroPage || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          menuOpen
            ? "bg-background/98 backdrop-blur-md border-b border-border text-foreground"
            : isDarkHeroPage
            ? scrolled
              ? "bg-background/90 backdrop-blur-md border-b border-border/60 text-foreground"
              : "bg-transparent text-[#FAF7F2]"
            : "bg-background/90 backdrop-blur-md border-b border-border/60 text-foreground"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center h-[5.5rem] px-6 md:px-12 justify-between">

          {/* Left: Hamburger Button */}
          <div className="flex-1 flex justify-start items-center">
            {menuOpen ? (
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-center h-10 w-10 border border-foreground/30 hover:border-primary transition-all duration-300 active:scale-95"
              >
                <X className="h-5 w-5 stroke-[1.2] text-foreground hover:text-primary transition-colors" />
              </button>
            ) : (
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="group flex flex-col justify-center items-start gap-1.5 h-10 w-10 active:scale-95 transition-transform"
              >
                <span className={`w-6 h-[1.5px] transition-all duration-300 shadow-sm ${isLightHeader ? "bg-foreground group-hover:bg-primary group-hover:w-8" : "bg-[#FAF7F2] group-hover:bg-amber-300 group-hover:w-8"}`} />
                <span className={`w-8 h-[1.5px] transition-all duration-300 shadow-sm ${isLightHeader ? "bg-foreground group-hover:bg-primary" : "bg-[#FAF7F2] group-hover:bg-amber-300"}`} />
                <span className={`w-5 h-[1.5px] transition-all duration-300 shadow-sm ${isLightHeader ? "bg-foreground group-hover:bg-primary group-hover:w-8" : "bg-[#FAF7F2] group-hover:bg-amber-300 group-hover:w-8"}`} />
              </button>
            )}
          </div>

          {/* Center: Monogram Submark Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex justify-center items-center"
          >
            <img
              src="/logos/submark.png"
              alt="Zevar Baksa Monogram"
              className={`h-10 md:h-12 w-auto transition-all duration-500 hover:scale-105 ${
                isLightHeader
                  ? "brightness-0 contrast-200"
                  : "brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              }`}
            />
          </Link>

          {/* Right: Currency, Search, Wishlist & Cart */}
          <div className={`flex-1 flex justify-end items-center gap-3 md:gap-5 ${isLightHeader ? "text-foreground" : "text-[#FAF7F2]"}`}>

            {/* Currency Picker */}
            <div className="relative group/currency hidden sm:flex items-center">
              <button
                className={`flex items-center gap-1.5 border px-2.5 py-1 text-[10px] tracking-[0.1em] font-sans font-medium transition shadow-sm rounded-sm ${
                  isLightHeader
                    ? "border-foreground/20 hover:border-primary text-foreground"
                    : "border-[#FAF7F2]/40 hover:border-amber-200 bg-black/20 text-[#FAF7F2] backdrop-blur-sm"
                }`}
              >
                <span className="text-[12px]">{FLAGS[currency]}</span>
                <span>{currency}</span>
                <ChevronDown className="h-3 w-3 stroke-[1.4]" />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover/currency:opacity-100 group-hover/currency:pointer-events-auto transition duration-300 z-10">
                <div className="bg-background border border-border text-foreground shadow-lg py-1 text-[10px] tracking-[0.1em] min-w-[90px] font-sans rounded-lg overflow-hidden">
                  {ALL_CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c as Currency)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-muted hover:text-primary transition flex items-center gap-2 ${currency === c ? "text-primary font-semibold" : ""}`}
                    >
                      {FLAGS[c as Currency]} {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search */}
            <button
              aria-label="Search"
              onClick={openSearch}
              className="hover:text-primary transition relative"
            >
              <Search className="h-4 w-4 stroke-[1.4]" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Wishlist" className="hover:text-primary transition relative">
              <Heart className="h-4 w-4 stroke-[1.4]" />
              {wishlistCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                  {wishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              aria-label="Cart"
              onClick={openCart}
              className="hover:text-primary transition relative"
            >
              <ShoppingBag className="h-4 w-4 stroke-[1.4]" />
              {totalItems() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                  {totalItems()}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* FULL SCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col justify-start items-center overflow-y-auto px-6 pt-32 pb-16 transition-all duration-700 ease-in-out font-sans ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Close button */}
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="group fixed top-5 left-6 flex items-center justify-center h-10 w-10 border border-foreground/30 hover:border-primary transition-all duration-300 active:scale-95 z-50"
        >
          <X className="h-5 w-5 stroke-[1.2] text-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Main centered navigation list */}
        <div className="flex flex-col items-center gap-6 w-full max-w-xl text-center font-sans">
          {mainLinks.map((link) => {
            if (link.isCollections) {
              return (
                <div key={link.label} className="w-full flex flex-col items-center">
                  <button
                    onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                    className="group flex items-center justify-center gap-2 font-display text-2xl md:text-3xl uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors py-1"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-5 w-5 stroke-[1.4] transition-transform duration-300 ${
                        collectionsExpanded ? "rotate-180 text-primary" : "text-foreground/50"
                      }`}
                    />
                  </button>
                  {collectionsExpanded && (
                    <div className="mt-3 flex flex-col items-center gap-3 animate-fade-in">
                      {collections.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/collection/${c.slug}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setCollectionsExpanded(false);
                          }}
                          className="font-display text-xl md:text-2xl uppercase tracking-[0.18em] text-primary/90 hover:text-primary transition-colors py-1 border-b border-primary/20 pb-1"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.to!}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl md:text-3xl uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors py-1"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-foreground/15 my-8" />

        {/* Secondary links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 max-w-2xl text-center w-full font-sans">
          {secondaryLinks.map((link) => {
            if (link.action === "login") {
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setMenuOpen(false);
                    openLogin();
                  }}
                  className="text-xs uppercase tracking-[0.2em] font-sans text-foreground/75 hover:text-primary transition-colors text-center"
                >
                  {link.label}
                </button>
              );
            }
            if (link.action === "search") {
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setMenuOpen(false);
                    openSearch();
                  }}
                  className="text-xs uppercase tracking-[0.2em] font-sans text-foreground/75 hover:text-primary transition-colors text-center"
                >
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.to!}
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-[0.2em] font-sans text-foreground/75 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* WhatsApp CTA in menu */}
        <div className="mt-10 pt-8 border-t border-border/20 w-full max-w-xl text-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Zevar%20Baksa%20Atelier!%20I'd%20like%20to%20enquire%20about%20your%20collection.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans text-foreground/60 hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-base">💬</span> WhatsApp Atelier Concierge
          </a>
        </div>
      </div>
    </>
  );
}
