import { Layout } from "@/components/Layout";

export const metadata = {
  title: "Our Story — Zevar Baksa",
  description: "The story of Zevar Baksa — handcrafted jewellery born in Jaipur, crediting artisans by name and giving traditional craft a contemporary edge.",
};

export default function About() {
  return (
    <Layout>
      {/* 1. HERO — Brand Genesis */}
      <section className="pt-40 pb-20 mx-auto max-w-[1100px] px-6 md:px-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-zb-red font-semibold">
          Jaipur, Rajasthan — Brand Story
        </p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-primary">
          Crayons on a bedroom floor. <br />
          <em className="not-italic italic font-normal text-zb-red">A mother’s hand.</em>
        </h1>
        <p className="mt-10 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 leading-relaxed font-sans font-light">
          It started with crayons on a bedroom floor; a girl watching her mother design jewellery, then trying to design her own. That instinct never really left.
          <br /><br />
          <strong className="font-semibold text-primary">Zevar Baksa is where it landed.</strong> <em className="italic">Zevar</em> means jewellery, <em className="italic">Baksa</em> means box — a jewellery box, a nod to everything jewellery can carry, and everything it can mean.
        </p>
      </section>

      {/* Hero Editorial Image */}
      <section className="mx-auto max-w-[1500px] px-6 md:px-12 pb-24">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
          <img src="/images/editorial-1.jpg" alt="Zevar Baksa Jaipur Atelier" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. THE ARTISAN-CREDIT MODEL & JAIPUR ROOTS */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-12 py-16 grid md:grid-cols-2 gap-14 items-center">
        <div className="relative rounded-xl overflow-hidden aspect-square border border-primary/15 shadow-lg">
          <img src="/images/craft.jpg" alt="Karigar shaping meenakari" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-zb-red font-semibold">Craft & Process</p>
          <h2 className="font-display text-4xl md:text-6xl text-primary leading-tight">
            Jaipur runs on the hands of its artisans.
          </h2>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans">
            That’s where we come from. Zevar Baksa exists to give artisans the credit they rarely receive — every piece designed from scratch in-house, shaped in collaboration with the artisan and designer behind it. Their name is carried with the collection, not left behind at the workshop door.
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans">
            We work directly with independent manufacturing units across Jaipur, craftsmen who bring decades of hands-on skill to materials suited for each piece: brass, silver, or gold.
          </p>
        </div>
      </section>

      {/* 3. REINTERPRETATION & INTENTIONAL DESIGN */}
      <section className="bg-zb-maroon text-zb-cream py-28 text-center my-12 relative overflow-hidden">
        <div className="mx-auto max-w-[950px] px-6 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zb-red font-semibold mb-4">
            Our Aim
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-8">
            Reinterpretation with Reason & Purpose.
          </h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-3xl mx-auto font-sans font-light">
            Taking culture, nature, and tradition and giving them a contemporary edge. Every collection, and every metal we choose for it, carries a reason — a purpose, a meaning, nothing picked at random.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left border-t border-zb-cream/20 pt-12">
            <div>
              <h3 className="font-display text-2xl text-zb-red mb-2">English Mark</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Marks our modern collections — refined, minimal, and global in outlook.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-zb-red mb-2">Hindi Mark</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Marks our traditional collections — written in our founder’s mother’s hand, a personal thread stitched into the brand.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-zb-red mb-2">The Submark</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Simply us, distilled in a pill-shaped monogram inspired by physical jewellery boxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER STORY & MOTTO */}
      <section className="mx-auto max-w-[1000px] px-6 md:px-12 py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-zb-red font-semibold mb-3">The Founder</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary mb-6">Tanishka&apos;s Vision</h2>
        <p className="text-lg text-foreground/80 leading-relaxed font-sans max-w-2xl mx-auto mb-12">
          Based in Jaipur, working from the very city where the craft lives, Tanishka built Zevar Baksa around devotion fired into metal — working toward bringing manufacturing fully in-house so every karigar is credited by name.
        </p>

        <div className="p-10 rounded-2xl bg-zb-cream-alt/70 border border-primary/20 max-w-2xl mx-auto shadow-sm">
          <p className="font-display text-2xl md:text-3xl text-primary italic leading-snug">
            &ldquo;Zevar Baksa isn&apos;t made to be waited on. <br className="hidden md:block" />It&apos;s made to be worn.&rdquo;
          </p>
        </div>
      </section>
    </Layout>
  );
}

