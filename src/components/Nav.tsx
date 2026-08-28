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
import { useHydrated } from "@/hooks/useHydrated";

const mainLinks = [
  { label: "Shop All", to: "/shop" },
  { label: "Collections", to: "#", isCollections: true },
  { label: "Our Story", to: "/about" },
  { label: "Jaipur Atelier", to: "/contact" },
  { label: "Wishlist", to: "/wishlist" },
];

const secondaryLinks = [
  { label: "Log in", action: "login" as const },
  { label: "Search Heirloom", action: "search" as const },
  { label: "Jewellery Care & Material", to: "/about" },
  { label: "Shipping Policy", to: "/about" },
  { label: "Returns & Exchange", to: "/about" },
  { label: "Contact Atelier", to: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const isDarkHero = false; // Minimal clean light base

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);

  // Stores
  const { openCart, totalItems } = useCartStore();
  const { count: wishlistCount } = useWishlistStore();
  const { openSearch, openLogin } = useUIStore();
  const { currency, setCurrency } = useCurrencyStore();

  const hydrated = useHydrated();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out font-sans ${
          !visible && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          menuOpen
            ? "bg-[#fffaee] border-b border-[#420002]/10 text-[#420002]"
            : scrolled
            ? "bg-[#fffaee]/95 backdrop-blur-md border-b border-[#420002]/10 text-[#420002] shadow-sm"
            : "bg-[#fffaee]/90 backdrop-blur-sm border-b border-[#420002]/10 text-[#420002]"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center h-[4.8rem] md:h-[5.2rem] px-5 sm:px-8 md:px-14 justify-between">

          {/* Left: Minimal Hamburger Button */}
          <div className="flex-1 flex justify-start items-center">
            {menuOpen ? (
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#420002]/20 bg-[#fffaee] text-[#420002] hover:bg-[#c82127] hover:text-[#fffaee] hover:border-[#c82127] transition-all duration-300 active:scale-95"
              >
                <X className="h-4 w-4 stroke-[1.5]" />
              </button>
            ) : (
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="group flex flex-col justify-center items-start gap-1.5 h-10 w-10 active:scale-95 transition-transform cursor-pointer"
              >
                <span className="w-5 h-[1.5px] bg-[#420002] group-hover:w-7 group-hover:bg-[#c82127] transition-all duration-300" />
                <span className="w-7 h-[1.5px] bg-[#420002] group-hover:w-5 group-hover:bg-[#c82127] transition-all duration-300" />
                <span className="w-4 h-[1.5px] bg-[#420002] group-hover:w-7 group-hover:bg-[#c82127] transition-all duration-300" />
              </button>
            )}
          </div>

          {/* Center: Brand Monogram Submark */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex justify-center items-center group py-1"
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/logos/submark.png"
                alt="Zevar Baksa Monogram"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Right: Currency, Search, Wishlist & Cart */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4 md:gap-5 text-[#420002]">

            {/* Currency Picker */}
            <div className="relative group/currency hidden sm:flex items-center">
              <button
                className="flex items-center gap-1.5 border border-[#420002]/20 hover:border-[#c82127] bg-[#fffaee] text-[#420002] px-3 py-1.5 text-[10px] tracking-[0.12em] font-sans font-medium transition-all duration-300 rounded-full"
              >
                <span className="text-[12px]">{hydrated ? FLAGS[currency] : "🇮🇳"}</span>
                <span>{hydrated ? currency : "INR"}</span>
                <ChevronDown className="h-3 w-3 stroke-[1.5] transition-transform duration-300 group-hover/currency:rotate-180 text-[#420002]/60" />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover/currency:opacity-100 group-hover/currency:pointer-events-auto transition-all duration-300 z-10">
                <div className="bg-[#fffaee] border border-[#420002]/15 text-[#420002] shadow-xl py-1.5 text-[10px] tracking-[0.1em] min-w-[110px] font-sans rounded-xl overflow-hidden">
                  {ALL_CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c as Currency)}
                      className={`w-full text-left px-3.5 py-1.5 hover:bg-[#f4eee1] hover:text-[#c82127] transition-colors flex items-center gap-2 ${hydrated && currency === c ? "text-[#c82127] font-semibold bg-[#f4eee1]/80" : ""}`}
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
              className="p-2 rounded-full text-[#420002] hover:text-[#c82127] hover:bg-[#420002]/5 transition-all duration-300 relative cursor-pointer active:scale-95"
            >
              <Search className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="p-2 rounded-full text-[#420002] hover:text-[#c82127] hover:bg-[#420002]/5 transition-all duration-300 relative active:scale-95"
            >
              <Heart className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[1.5]" />
              {hydrated && wishlistCount() > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-[#c82127] text-[#fffaee] text-[9px] flex items-center justify-center font-bold shadow-sm">
                  {wishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              aria-label="Cart"
              onClick={openCart}
              className="p-2 rounded-full text-[#420002] hover:text-[#c82127] hover:bg-[#420002]/5 transition-all duration-300 relative cursor-pointer active:scale-95"
            >
              <ShoppingBag className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[1.5]" />
              {hydrated && totalItems() > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-[#c82127] text-[#fffaee] text-[9px] flex items-center justify-center font-bold shadow-sm">
                  {totalItems()}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* FULL SCREEN LUXURY MINIMAL OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#fffaee] flex flex-col justify-between items-center overflow-y-auto px-6 pt-28 pb-12 transition-all duration-500 ease-in-out font-sans ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Main centered navigation list */}
        <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 w-full max-w-xl text-center font-sans mt-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
              Jaipur Atelier • Fine Jewellery
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>

          {mainLinks.map((link) => {
            if (link.isCollections) {
              return (
                <div key={link.label} className="w-full flex flex-col items-center">
                  <button
                    onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                    className="group flex items-center justify-center gap-2 font-display text-2xl sm:text-3xl uppercase tracking-[0.2em] text-[#420002] hover:text-[#c82127] transition-colors py-1 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-5 w-5 stroke-[1.5] transition-transform duration-300 ${
                        collectionsExpanded ? "rotate-180 text-[#c82127]" : "text-[#420002]/40"
                      }`}
                    />
                  </button>
                  {collectionsExpanded && (
                    <div className="mt-3 flex flex-col items-center gap-2.5 animate-in fade-in slide-in-from-top-2 py-3 border-y border-[#420002]/10 w-full max-w-sm">
                      {collections.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/collection/${c.slug}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setCollectionsExpanded(false);
                          }}
                          className="group/col flex items-center gap-2 font-display text-lg sm:text-xl uppercase tracking-[0.2em] text-[#c82127] hover:text-[#420002] transition-colors py-1"
                        >
                          <span className="text-[9px] text-[#c82127]/60 group-hover/col:text-[#c82127]">✦</span>
                          <span>{c.name} Collection</span>
                        </Link>
                      ))}
                      <Link
                        href="/shop"
                        onClick={() => {
                          setMenuOpen(false);
                          setCollectionsExpanded(false);
                        }}
                        className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#420002]/70 hover:text-[#c82127] transition-colors pt-1 font-sans font-medium"
                      >
                        Explore All Heirlooms →
                      </Link>
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
                className="font-display text-2xl sm:text-3xl uppercase tracking-[0.2em] text-[#420002] hover:text-[#c82127] transition-colors py-1"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Delicate Line Divider */}
        <div className="relative z-10 flex items-center gap-2.5 my-6 sm:my-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#420002]/20" />
          <div className="h-1.5 w-1.5 rotate-45 border border-[#c82127]" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#420002]/20" />
        </div>

        {/* Secondary links */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-8 max-w-2xl text-center w-full font-sans">
          {secondaryLinks.map((link) => {
            if (link.action === "login") {
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setMenuOpen(false);
                    openLogin();
                  }}
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans text-[#420002]/70 hover:text-[#c82127] transition-colors text-center cursor-pointer"
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
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans text-[#420002]/70 hover:text-[#c82127] transition-colors text-center cursor-pointer"
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
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans text-[#420002]/70 hover:text-[#c82127] transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Atelier Concierge Link */}
        <div className="relative z-10 mt-8 pt-6 border-t border-[#420002]/10 w-full max-w-lg text-center">
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-sans text-[#420002]/80 hover:text-[#c82127] transition-colors"
          >
            <span className="text-[#c82127]">✦</span> Contact Atelier Concierge
          </Link>
        </div>
      </div>
    </>
  );
}
