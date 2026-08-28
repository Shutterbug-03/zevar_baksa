import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#1A0307] text-[#FAF7F2] overflow-hidden font-sans">
      {/* Authentic Red Damask Background Pattern matching Section 2 */}
      <img
        src="/images/about-bg.jpg"
        alt="Zevar Baksa Royal Heritage Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
      />
      {/* Subtle Warm Vignette matching Section 2 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/50 pointer-events-none" />
      
      {/* Seamless Top Blend Gradient from Newsletter */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#1A0307] via-[#1A0307]/70 to-transparent pointer-events-none z-10" />

      <div className="relative z-20 mx-auto max-w-[1500px] px-6 md:px-16 py-14 sm:py-20">
        
        {/* Main Footer Content Grid */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          
          {/* Brand Identity & Hindi Secondary Logo Lockup */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-amber-300">✦</span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-amber-300 font-semibold">
                  EST. 2026 • JAIPUR PINK CITY
                </span>
                <span className="text-[10px] text-amber-300">✦</span>
              </div>

              <div className="inline-block relative">
                <img
                  src="/logos/secondary-logo-hindi.png"
                  alt="ज़ेवर बक्सा"
                  className="h-24 md:h-32 w-auto brightness-0 invert drop-shadow-[0_4px_30px_rgba(252,211,77,0.5)] opacity-95"
                />
              </div>

              <p className="mt-6 max-w-md font-serif-brand text-2xl md:text-3xl leading-snug italic text-amber-200 drop-shadow-md font-light">
                “A little box of memories, worn close to the heart.”
              </p>

              <div className="flex items-center gap-2.5 my-4">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/80" />
                <div className="h-[2.5px] w-14 bg-gradient-to-r from-[#7A1D2E] via-amber-300 to-[#7A1D2E] rounded-full shadow-[0_0_8px_rgba(252,211,77,0.4)]" />
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/80" />
              </div>

              <p className="text-xs text-[#FAF7F2]/80 font-sans font-light leading-relaxed max-w-md">
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
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300 flex items-center gap-1.5 drop-shadow-sm pb-2 border-b border-amber-300/20">
              <span>✦</span> Connect
            </h4>
            
            {/* Handcrafted Circular Social Badges */}
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
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-amber-300/40 bg-[#2B050B]/90 text-amber-300 backdrop-blur-md shadow-md transition-all duration-300 hover:border-amber-300 hover:bg-amber-300 hover:text-[#1A0307] hover:shadow-[0_0_20px_rgba(252,211,77,0.5)] hover:-translate-y-1 active:scale-95 cursor-pointer"
                >
                  <Icon className="h-4 w-4 stroke-[1.5]" />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-amber-300/15">
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">Atelier Residence</p>
              <p className="mt-1.5 text-xs text-amber-100/85 leading-relaxed font-light">
                Johri Bazar, Old Pink City<br />
                Jaipur, Rajasthan 302003, India
              </p>
              
              <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">Concierge Desk</p>
              <a
                href="mailto:hello@zevarbaksa.com"
                className="mt-1 block text-xs text-amber-200 hover:text-amber-100 transition-colors font-medium hover:underline underline-offset-4"
              >
                hello@zevarbaksa.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar — Gold Hallmarking Details & Copyright */}
        <div className="mt-14 pt-6 border-t border-amber-300/20 flex flex-col sm:flex-row gap-4 justify-between items-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-amber-200/80">
          <span>© {new Date().getFullYear()} Zevar Baksa. All Heirlooms Reserved.</span>
          <span className="text-amber-300 font-semibold flex items-center gap-2">
            <span>✦</span> Handcrafted with Reverence in Jaipur <span>✦</span>
          </span>
        </div>

      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300 flex items-center gap-1.5 drop-shadow-sm pb-2 border-b border-amber-300/20">
        <span>✦</span> {title}
      </h4>
      <ul className="mt-5 space-y-3 font-sans">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.to}
              className="text-xs sm:text-[13px] text-[#FAF7F2]/80 hover:text-amber-200 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1.5"
            >
              <span className="text-[8px] text-amber-300/60">✦</span>
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
