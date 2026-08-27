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
  { label: "Mina Bagh Collection", to: "/collection/mina-bagh", isCollections: true },
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
  const isDarkHeroPage = pathname === "/" || pathname?.startsWith("/collection");

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

      // Scrolled past top
      setScrolled(currentScrollY > 20);

      // Hide when scrolling DOWN (past 70px), reveal when scrolling UP
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

  const isLightHeader = !isDarkHeroPage && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
          !visible && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          menuOpen
            ? "bg-[#100204]/95 backdrop-blur-2xl border-b border-amber-300/15 text-[#FAF7F2]"
            : scrolled
            ? "bg-[#140205]/85 backdrop-blur-xl border-b border-amber-300/20 text-[#FAF7F2] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : isDarkHeroPage
            ? "bg-transparent text-[#FAF7F2]"
            : "bg-background/90 backdrop-blur-md border-b border-border/60 text-foreground"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center h-[4.8rem] md:h-[5.4rem] px-5 sm:px-8 md:px-14 justify-between">

          {/* Left: Royal Hamburger Button */}
          <div className="flex-1 flex justify-start items-center">
            {menuOpen ? (
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-center h-10 w-10 rounded-full border border-amber-300/40 bg-[#2B050B]/60 text-amber-200 hover:border-amber-300 hover:bg-[#450A14] transition-all duration-300 active:scale-95 shadow-md"
              >
                <X className="h-4 w-4 stroke-[1.5] transition-transform duration-300 group-hover:rotate-90" />
              </button>
            ) : (
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="group flex flex-col justify-center items-start gap-1.5 h-10 w-10 active:scale-95 transition-transform cursor-pointer"
              >
                <span className="w-5 h-[1.5px] bg-amber-200 group-hover:w-7 group-hover:bg-amber-300 transition-all duration-300 shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                <span className="w-7 h-[1.5px] bg-amber-200 group-hover:w-5 group-hover:bg-amber-300 transition-all duration-300 shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
                <span className="w-4 h-[1.5px] bg-amber-200 group-hover:w-7 group-hover:bg-amber-300 transition-all duration-300 shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
              </button>
            )}
          </div>

          {/* Center: Monogram Submark Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex justify-center items-center group py-1"
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/logos/submark.png"
                alt="Zevar Baksa Monogram"
                className="h-10 md:h-12 w-auto transition-all duration-500 group-hover:scale-105 brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
            </div>
          </Link>

          {/* Right: Currency, Search, Wishlist & Cart */}
          <div className="flex-1 flex justify-end items-center gap-2.5 sm:gap-4 md:gap-5 text-[#FAF7F2]">

            {/* Currency Picker */}
            <div className="relative group/currency hidden sm:flex items-center">
              <button
                className="flex items-center gap-1.5 border border-amber-300/30 hover:border-amber-300 bg-[#2B050B]/60 text-amber-200 px-3 py-1.5 text-[10px] tracking-[0.12em] font-sans font-medium transition-all duration-300 rounded-full shadow-sm backdrop-blur-md"
              >
                <span className="text-[12px]">{hydrated ? FLAGS[currency] : "🇮🇳"}</span>
                <span>{hydrated ? currency : "INR"}</span>
                <ChevronDown className="h-3 w-3 stroke-[1.5] transition-transform duration-300 group-hover/currency:rotate-180" />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover/currency:opacity-100 group-hover/currency:pointer-events-auto transition-all duration-300 z-10">
                <div className="bg-[#1F0408] border border-amber-300/30 text-amber-100 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-1.5 text-[10px] tracking-[0.1em] min-w-[100px] font-sans rounded-xl overflow-hidden backdrop-blur-xl">
                  {ALL_CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c as Currency)}
                      className={`w-full text-left px-3.5 py-1.5 hover:bg-[#3B0710] hover:text-amber-200 transition-colors flex items-center gap-2 ${hydrated && currency === c ? "text-amber-300 font-semibold bg-[#3B0710]/50" : ""}`}
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
              className="p-2 rounded-full text-amber-200/90 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 relative cursor-pointer active:scale-95"
            >
              <Search className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="p-2 rounded-full text-amber-200/90 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 relative active:scale-95"
            >
              <Heart className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[1.5]" />
              {hydrated && wishlistCount() > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-[#2D0D12] text-[9px] flex items-center justify-center font-bold shadow-md animate-pulse">
                  {wishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              aria-label="Cart"
              onClick={openCart}
              className="p-2 rounded-full text-amber-200/90 hover:text-amber-300 hover:bg-amber-300/10 transition-all duration-300 relative cursor-pointer active:scale-95"
            >
              <ShoppingBag className="h-4 w-4 sm:h-[18px] sm:w-[18px] stroke-[1.5]" />
              {hydrated && totalItems() > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-[#2D0D12] text-[9px] flex items-center justify-center font-bold shadow-md animate-pulse">
                  {totalItems()}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* FULL SCREEN LUXURY OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#100204]/98 backdrop-blur-2xl flex flex-col justify-between items-center overflow-y-auto px-6 pt-28 pb-12 transition-all duration-700 ease-in-out font-sans ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Subtle Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3B0710]/40 via-transparent to-transparent pointer-events-none" />

        {/* Main centered navigation list */}
        <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-7 w-full max-w-xl text-center font-sans mt-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-amber-300">✦</span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-amber-300/90 font-medium font-sans">
              Zevar Baksa • Jaipur
            </span>
            <span className="text-[10px] text-amber-300">✦</span>
          </div>

          {mainLinks.map((link) => {
            if (link.isCollections) {
              return (
                <div key={link.label} className="w-full flex flex-col items-center">
                  <button
                    onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                    className="group flex items-center justify-center gap-2 font-display text-2xl sm:text-3xl uppercase tracking-[0.2em] text-[#FAF7F2] hover:text-amber-200 transition-colors py-1 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-5 w-5 stroke-[1.5] transition-transform duration-300 ${
                        collectionsExpanded ? "rotate-180 text-amber-300" : "text-amber-200/50"
                      }`}
                    />
                  </button>
                  {collectionsExpanded && (
                    <div className="mt-2 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-1">
                      {collections.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/collection/${c.slug}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setCollectionsExpanded(false);
                          }}
                          className="font-display text-lg sm:text-xl uppercase tracking-[0.2em] text-amber-300 hover:text-amber-100 transition-colors py-1"
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
                className="font-display text-2xl sm:text-3xl uppercase tracking-[0.2em] text-[#FAF7F2] hover:text-amber-200 transition-colors py-1"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Ornamental Gold Line Divider */}
        <div className="relative z-10 flex items-center gap-2.5 my-6 sm:my-8">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/70" />
          <div className="h-1.5 w-1.5 rotate-45 border border-amber-300/80 bg-amber-300/30" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/70" />
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
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans text-[#FAF7F2]/70 hover:text-amber-200 transition-colors text-center cursor-pointer"
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
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans text-[#FAF7F2]/70 hover:text-amber-200 transition-colors text-center cursor-pointer"
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
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans text-[#FAF7F2]/70 hover:text-amber-200 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Atelier Concierge Link */}
        <div className="relative z-10 mt-8 pt-6 border-t border-amber-300/15 w-full max-w-lg text-center">
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-sans text-amber-200/80 hover:text-amber-200 transition-colors"
          >
            <span className="text-amber-300">✦</span> Contact Atelier Concierge
          </Link>
        </div>
      </div>
    </>
  );
}
