import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#420002] text-[#fffaee] overflow-hidden font-sans border-t border-[#420002]">
      <div className="relative z-20 mx-auto max-w-[1500px] px-6 sm:px-10 md:px-16 py-14 sm:py-20">
        
        {/* Main Footer Content Grid */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          
          {/* Brand Identity & Primary Wordmark Lockup */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-[#c82127]">✦</span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#c82127] font-semibold">
                  EST. 2026 • JAIPUR PINK CITY
                </span>
                <span className="text-[10px] text-[#c82127]">✦</span>
              </div>

              <div className="inline-block">
                <span className="font-serif-brand text-3xl sm:text-4xl text-[#fffaee] tracking-tight block">
                  Zevar Baksa
                </span>
              </div>

              <p className="mt-4 max-w-md font-serif-brand text-xl sm:text-2xl leading-snug italic text-[#fffaee]/90 font-light">
                “A little box of memories, worn close to the heart.”
              </p>

              <div className="w-12 h-[2px] bg-[#c82127] my-4" />

              <p className="text-xs text-[#fffaee]/75 font-sans font-light leading-relaxed max-w-md">
                Every Zevar Baksa heirloom is born in the historic lanes of Johri Bazar, shaped by master karigars preserving royal Meenakari enamel craft.
              </p>
            </div>
          </div>

          {/* Column 1: Explore Archive */}
          <FooterCol
            title="Explore Archive"
            links={[
              { label: "All Jewellery", to: "/shop" },
              { label: "Mina Bagh Collection", to: "/collection/mina-bagh" },
              { label: "Celestial Heritage", to: "/collection/celestial-heritage" },
              { label: "New Releases", to: "/shop" },
              { label: "Bridal Trousseau", to: "/shop" },
              { label: "Our Jaipur Atelier", to: "/about" },
            ]}
          />

          {/* Column 2: Atelier Care & Support */}
          <FooterCol
            title="Atelier Care"
            links={[
              { label: "Jewellery Care & Storage", to: "/about" },
              { label: "Insured Express Delivery", to: "/about" },
              { label: "Returns & Lifetime Guarantee", to: "/about" },
              { label: "Hallmarking Certifications", to: "/about" },
              { label: "Bespoke Size Assistance", to: "/contact" },
            ]}
          />

          {/* Column 3: Royal Residence & Socials */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c82127] flex items-center gap-1.5 pb-2 border-b border-[#fffaee]/10">
              <span>✦</span> Connect
            </h4>
            
            {/* Minimal Circular Social Badges */}
            <div className="mt-5 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-[#fffaee]/20 text-[#fffaee] transition-all duration-300 hover:border-[#c82127] hover:bg-[#c82127] hover:text-[#fffaee] active:scale-95 cursor-pointer"
                >
                  <Icon className="h-4 w-4 stroke-[1.5]" />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#fffaee]/10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c82127] font-semibold">Atelier Residence</p>
              <p className="mt-1.5 text-xs text-[#fffaee]/80 leading-relaxed font-light">
                Johri Bazar, Old Pink City<br />
                Jaipur, Rajasthan 302003, India
              </p>
              
              <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#c82127] font-semibold">Concierge Desk</p>
              <a
                href="mailto:hello@zevarbaksa.com"
                className="mt-1 block text-xs text-[#fffaee]/90 hover:text-[#c82127] transition-colors font-medium"
              >
                hello@zevarbaksa.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar — Hallmarking Details & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#fffaee]/10 flex flex-col sm:flex-row gap-4 justify-between items-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#fffaee]/60">
          <span>© {new Date().getFullYear()} Zevar Baksa. All Rights Reserved.</span>
          <span className="text-[#fffaee]/80 flex items-center gap-2">
            <span className="text-[#c82127]">✦</span> Handcrafted in Jaipur <span className="text-[#c82127]">✦</span>
          </span>
        </div>

      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c82127] flex items-center gap-1.5 pb-2 border-b border-[#fffaee]/10">
        <span>✦</span> {title}
      </h4>
      <ul className="mt-5 space-y-3 font-sans">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.to}
              className="text-xs sm:text-[13px] text-[#fffaee]/80 hover:text-[#c82127] transition-all duration-300 inline-flex items-center gap-1.5"
            >
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
