import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <img
              src="/logos/secondary-logo-hindi.png"
              alt="ज़ेवर बक्सा"
              className="h-24 md:h-32 w-auto brightness-0 invert opacity-95"
            />
            <p className="mt-8 max-w-md font-serif-brand text-2xl leading-snug italic opacity-90">
              A little box of memories, worn close to the heart.
            </p>
          </div>

          <FooterCol title="Explore" links={[
            { label: "Shop All", to: "/shop" },
            { label: "Collections", to: "/shop" },
            { label: "About", to: "/about" },
            { label: "Retail Store", to: "/contact" },
          ]} />
          <FooterCol title="Support" links={[
            { label: "Jewellery Care", to: "/about" },
            { label: "Shipping Policy", to: "/about" },
            { label: "Returns & Exchange", to: "/about" },
            { label: "Contact Us", to: "/contact" },
          ]} />
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.28em] opacity-80">Connect</h4>
            <div className="mt-5 flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition"><Instagram className="h-5 w-5" strokeWidth={1.2} /></a>
              <a href="#" aria-label="Facebook" className="hover:opacity-70 transition"><Facebook className="h-5 w-5" strokeWidth={1.2} /></a>
              <a href="#" aria-label="YouTube" className="hover:opacity-70 transition"><Youtube className="h-5 w-5" strokeWidth={1.2} /></a>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] opacity-70">Atelier</p>
            <p className="mt-2 text-sm opacity-90 leading-relaxed">
              Johri Bazar<br />
              Jaipur, Rajasthan, India
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] opacity-70">Say hello</p>
            <a href="mailto:hello@zevarbaksa.com" className="mt-2 block text-sm opacity-90 hover:opacity-100">
              hello@zevarbaksa.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/25 flex flex-wrap gap-4 justify-between items-center text-[11px] uppercase tracking-[0.24em] opacity-80">
          <span>© {new Date().getFullYear()} Zevar Baksa</span>
          <span>Handcrafted with reverence · Made in India</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs uppercase tracking-[0.28em] opacity-80">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.to} className="text-sm opacity-90 hover:opacity-100 hover:underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
