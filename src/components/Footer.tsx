import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#c82127] text-[#fffaee] overflow-hidden font-sans border-t border-[#c82127]">
      <div className="relative z-20 mx-auto max-w-[1500px] px-6 sm:px-10 md:px-16 py-14 sm:py-20">
        
        {/* Main Footer Content Grid */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          
          {/* Brand Identity & Secondary Hindi Logo Lockup */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-[#fffaee]/80">✦</span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#fffaee]/90 font-semibold">
                  EST. 2026 • JAIPUR PINK CITY
                </span>
                <span className="text-[10px] text-[#fffaee]/80">✦</span>
              </div>

              {/* Hindi Secondary Logo */}
              <div className="inline-block my-2">
                <img
                  src="/logos/secondary-logo-hindi.png"
                  alt="ज़ेवर बक्सा"
                  className="h-20 sm:h-24 md:h-28 w-auto brightness-0 invert drop-shadow-md"
                />
              </div>

              <p className="mt-3 max-w-md font-serif-brand text-xl sm:text-2xl leading-snug italic text-[#fffaee] font-light">
                “A little box of memories, worn close to the heart.”
              </p>

              <div className="w-14 h-[1.5px] bg-[#fffaee]/40 my-4" />

              <p className="text-xs text-[#fffaee]/85 font-sans font-light leading-relaxed max-w-md">
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
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#fffaee] flex items-center gap-1.5 pb-2 border-b border-[#fffaee]/20">
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
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-[#fffaee]/40 text-[#fffaee] transition-all duration-300 hover:bg-[#fffaee] hover:text-[#c82127] active:scale-95 cursor-pointer shadow-sm"
                >
                  <Icon className="h-4 w-4 stroke-[1.5]" />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#fffaee]/20">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#fffaee]/90 font-semibold">Atelier Residence</p>
              <p className="mt-1.5 text-xs text-[#fffaee]/85 leading-relaxed font-light">
                Johri Bazar, Old Pink City<br />
                Jaipur, Rajasthan 302003, India
              </p>
              
              <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#fffaee]/90 font-semibold">Concierge Desk</p>
              <a
                href="mailto:hello@zevarbaksa.com"
                className="mt-1 block text-xs text-[#fffaee] hover:underline underline-offset-4 transition-colors font-medium"
              >
                hello@zevarbaksa.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar — Hallmarking Details & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#fffaee]/20 flex flex-col sm:flex-row gap-4 justify-between items-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#fffaee]/75">
          <span>© {new Date().getFullYear()} Zevar Baksa. All Rights Reserved.</span>
          <span className="text-[#fffaee] flex items-center gap-2">
            <span>✦</span> Handcrafted in Jaipur <span>✦</span>
          </span>
        </div>

      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#fffaee] flex items-center gap-1.5 pb-2 border-b border-[#fffaee]/20">
        <span>✦</span> {title}
      </h4>
      <ul className="mt-5 space-y-3 font-sans">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.to}
              className="text-xs sm:text-[13px] text-[#fffaee]/85 hover:text-[#fffaee] hover:underline underline-offset-4 transition-all duration-300 inline-flex items-center gap-1.5"
            >
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
