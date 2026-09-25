import { Layout } from "@/components/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story — Zevar Baksa",
  description: "Handcrafted jewellery born in Jaipur. Story first, credited artisans, limited runs, and living craft traditions.",
};

const philosophy = [
  {
    title: "Story first, not trend first",
    text: "Every collection starts from an idea, a place, or a craft worth exploring, never a trend report.",
  },
  {
    title: "Named, not anonymous",
    text: "Designers, and team members who shape a collection are credited publicly. Recognition isn't an afterthought here, it's part of how the brand works.",
  },
  {
    title: "Limited, not mass",
    text: "We release in collections, not constant inventory. Each one earns its place before it goes out, so every piece finds someone who actually wants it.",
  },
  {
    title: "Jaipur is the source, not the backdrop",
    text: "The city's architecture, colour, and living craft traditions run directly through the design language. It's not a setting we photograph in, it's where the ideas come from.",
  },
  {
    title: "Kept, not just bought",
    text: "The name says it plainly: Baksa means box, the place where precious things are kept and returned to. That's the relationship we want with every piece, not a transaction, a keepsake.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* 1. HERO — Brand Story Editorial */}
      <section className="pt-36 sm:pt-44 pb-16 mx-auto max-w-[1300px] px-6 sm:px-10 md:px-16">

        {/* Two-column editorial: heading left | text right */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 border-t border-[#420002]/15 pt-10 sm:pt-12">

          {/* Left — sticky heading */}
          <div className="md:w-[280px] lg:w-[320px] shrink-0">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.18] text-[#c82127] tracking-normal md:sticky md:top-28">
              BRAND STORY
            </h1>
          </div>

          {/* Right — flowing paragraphs */}
          <div className="flex-1 space-y-5 sm:space-y-6 text-sm sm:text-[15px] text-[#420002]/85 font-sans font-light leading-[1.75]">
            <p>
              It started with crayons on a bedroom floor; a girl watching her mother design jewellery, then trying to design her own. That instinct never really left.
            </p>
            <p>
              Zevar Baksa is where it landed. Zevar means jewellery, Baksa means box; a jewellery box, a nod to everything jewellery can carry, and everything it can mean.
            </p>
            <p>
              Jaipur runs on the hands of its artisans, and that&apos;s where we come from. Zevar Baksa exists to give them the credit they rarely receive; every piece designed from scratch, shaped in collaboration with the artisan and designer behind it, their name carried with the collection, not left behind at the workshop door.
            </p>
            <p>
              Our aim is reinterpretation; taking culture, nature, and tradition and giving them a contemporary edge. Every collection, and every metal we choose for it, carries a reason; a purpose, a meaning, nothing picked at random.
            </p>
            <p>
              That same intention runs through our logos. English marks our modern collections, Hindi marks the traditional ones; written in our founder&apos;s mother&apos;s hand, a personal thread stitched into the brand; and a submark that&apos;s simply us, distilled.
            </p>
            <p>
              Zevar Baksa isn&apos;t made to be waited on. It&apos;s made to be worn.
            </p>
          </div>

        </div>
      </section>

      {/* 2. VISUAL ARCHIVE BENTO (3 Top, 2 Wide Bottom — Alternating Model, Earrings, & Necklace) */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 pb-16 sm:pb-20">
        <div className="space-y-3.5 sm:space-y-4">
          {/* Top Layer — 3 Images: Model -> Earrings -> Necklace */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* 1. Model Shot (Unused) */}
            <div className="group relative aspect-[4/3.8] overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-7.jpg" 
                alt="Model in Starlight Heritage Haar" 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* 2. Earrings Shot */}
            <div className="group relative aspect-[4/3.8] overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07871.JPG" 
                alt="Handcrafted Meenakari Chandbali Earrings" 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* 3. Necklace Shot (Unused) */}
            <div className="group relative aspect-[4/3.8] overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-1.jpg" 
                alt="Meena Bagh Royal Choker Kiln-Fired Enamel Detail" 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>

          {/* Bottom Layer — 2 Wide Images: Model -> Bridal Necklace Suite */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {/* 4. Model Shot (Unused) */}
            <div className="group relative aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07741.JPG" 
                alt="Jaipur Royal Heirloom Jewellery Model Shoot" 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* 5. Necklace Close-Up Shot (Unused) */}
            <div className="group relative aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07817.JPG" 
                alt="Grand Devotion Bridal Neckpiece Close-Up Shoot" 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY — Editorial Manifesto List */}
      <section className="py-28 border-t border-[#420002]/10 mx-auto max-w-[1300px] px-6 sm:px-10 md:px-16">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="md:col-span-4 md:sticky md:top-32 self-start space-y-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#c82127] font-semibold">
              01 / Core Principles
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#420002] leading-tight">
              The commitments behind every piece.
            </h2>
            <p className="text-sm text-[#420002]/70 font-sans font-light leading-relaxed pt-2">
              We operate on intention rather than volume, creating jewellery that carries enduring cultural and emotional weight.
            </p>
          </div>

          <div className="md:col-span-8 divide-y divide-[#420002]/10">
            {philosophy.map((item, idx) => (
              <div key={item.title} className={`py-10 ${idx === 0 ? "pt-0" : ""}`}>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-[11px] font-sans text-[#c82127] font-medium tracking-widest">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#420002]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-[#420002]/80 font-sans font-light leading-relaxed pl-8 max-w-2xl">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CRAFT & PROCESS — Narrative Spread */}
      <section className="py-28 bg-[#fffdf7] border-y border-[#420002]/10">
        <div className="mx-auto max-w-[1300px] px-6 sm:px-10 md:px-16">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#c82127] font-semibold mb-3">
                  02 / Craft &amp; Process
                </p>
                <h2 className="font-display text-4xl sm:text-6xl text-[#420002] leading-[1.05]">
                  Every piece starts on paper, never off a wholesaler&apos;s rack.
                </h2>
              </div>

              <div className="space-y-6 text-base text-[#420002]/85 font-sans font-light leading-relaxed">
                <p>
                  Every piece starts on paper, designed in-house by our own team, not picked off a wholesaler&apos;s rack. Once a design is finalised, it moves to independent manufacturing units across Jaipur, artisans and karigars who bring decades of hands-on skill to each piece, working in materials suited to the collection: brass, silver, or gold.
                </p>
                <p>
                  Some pieces pass through multiple hands before they&apos;re finished, a designer, a goldsmith, an enamellist, a polisher, each adding what the last could not. Nothing is rushed. A collection like <strong className="font-serif italic font-normal text-[#420002]">Meena Bagh</strong>, for instance, involves enamel fired onto metal at close to 750°C, a process that simply cannot be shortcut.
                </p>
                <p>
                  This is also why our pieces are made in limited runs. We&apos;re not manufacturing at scale, we&apos;re working directly with independent artisans who put real time into every piece, and we&apos;d rather stay small and intentional than compromise that.
                </p>
                <p className="text-[#c82127] font-medium pt-2">
                  We&apos;re also working toward bringing manufacturing in-house over time, so that the artisans behind our pieces can be credited by name, not just by workshop.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-7">
                <div className="aspect-[3/4] overflow-hidden rounded-sm">
                  <img 
                    src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/craft.jpg" 
                    alt="Master artisan firing enamel in Jaipur" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>
              <div className="col-span-5 space-y-4">
                <div className="aspect-square overflow-hidden rounded-sm">
                  <img 
                    src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/about-editorial.jpg" 
                    alt="Detail of finished heirloom jewellery" 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="p-6 bg-[#fffaee] border border-[#420002]/10 text-center">
                  <p className="font-display text-3xl text-[#c82127] font-light">750°C</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#420002]/70 mt-1 font-sans">
                    Hand-Fired Enamel
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ARTISAN MODEL & WHERE WE ARE BASED — Contrast Monolith */}
      <section className="bg-[#c82127] text-[#fffaee] py-28">
        <div className="mx-auto max-w-[1300px] px-6 sm:px-10 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Column A: The Model */}
            <div className="space-y-6">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#fffaee]/75 font-medium">
                03 / The Model
              </p>
              <h2 className="font-display text-3xl sm:text-5xl leading-tight">
                The Artisan-Credit Model
              </h2>
              <p className="text-base sm:text-lg text-[#fffaee]/90 font-sans font-light leading-relaxed">
                Every piece is designed in-house, then brought to life in collaboration with individual manufacturing units in Jaipur. We&apos;re working toward bringing manufacturing fully in-house, where our own karigar team will be credited by name for their work on every collection.
              </p>
            </div>

            {/* Column B: Where We're Based */}
            <div className="space-y-6 md:border-l md:border-[#fffaee]/20 md:pl-16">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#fffaee]/75 font-medium">
                04 / Provenance
              </p>
              <h2 className="font-display text-3xl sm:text-5xl leading-tight">
                Where We&apos;re Based
              </h2>
              <p className="text-base sm:text-lg text-[#fffaee]/90 font-sans font-light leading-relaxed">
                Our founder is from Jaipur. So are our artisans, our manufacturers, and Zevar Baksa itself, we&apos;re based here, working from the same city the craft comes from, not sourcing it from a distance.
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#fffaee]/70 pt-4 font-sans">
                Atelier Residence · Vaishali Nagar, Jaipur
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VISUAL IDENTITY — Curated Marks Archive */}
      <section className="py-28 mx-auto max-w-[1300px] px-6 sm:px-10 md:px-16">
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#c82127] font-semibold mb-3">
            05 / Visual Identity
          </p>
          <h2 className="font-display text-4xl sm:text-6xl text-[#420002] leading-tight mb-6">
            Logos &amp; Visual Identity Note
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-[#420002]/85 font-light leading-relaxed">
            Zevar Baksa carries three marks, each with its own role rather than one being a &ldquo;backup&rdquo; of another.
          </p>
        </div>

        {/* The 3 Marks Columns */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 border-t border-[#420002]/15 pt-16">
          
          {/* Mark 1: English Wordmark */}
          <div className="space-y-6">
            <div className="h-36 flex items-center justify-center border-b border-[#420002]/10 pb-6">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/logos/primary-logo.png" 
                alt="Zevar Baksa English Wordmark" 
                className="max-h-12 w-auto object-contain" 
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c82127] font-medium mb-1.5">
                Contemporary Collections
              </p>
              <h3 className="font-display text-2xl text-[#420002] mb-3">
                English Wordmark
              </h3>
              <p className="text-sm text-[#420002]/75 font-sans font-light leading-relaxed">
                Used for contemporary collections and everyday brand touchpoints, product pages, packaging for modern pieces, digital ads, and anywhere the brand needs to read cleanly to a broader audience.
              </p>
            </div>
          </div>

          {/* Mark 2: Submark (ZB Monogram) */}
          <div className="space-y-6">
            <div className="h-36 flex items-center justify-center border-b border-[#420002]/10 pb-6">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/logos/submark.png" 
                alt="Zevar Baksa Submark" 
                className="max-h-16 w-auto object-contain" 
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c82127] font-medium mb-1.5">
                Compact Mark
              </p>
              <h3 className="font-display text-2xl text-[#420002] mb-3">
                Submark (ZB Monogram)
              </h3>
              <p className="text-sm text-[#420002]/75 font-sans font-light leading-relaxed">
                The compact mark, built for small-format placements where a full wordmark won&apos;t sit well: favicon, social profile photo, jewellery tags, embossed pouches, and anywhere space is tight.
              </p>
            </div>
          </div>

          {/* Mark 3: Hindi Wordmark */}
          <div className="space-y-6">
            <div className="h-36 flex items-center justify-center border-b border-[#420002]/10 pb-6">
              <img 
                src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/logos/secondary-logo-hindi.png" 
                alt="ज़ेवर बक्सा Hindi Wordmark" 
                className="max-h-16 w-auto object-contain" 
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c82127] font-medium mb-1.5">
                Heritage Collections
              </p>
              <h3 className="font-display text-2xl text-[#420002] mb-3">
                Hindi Wordmark (ज़ेवर बक्सा)
              </h3>
              <p className="text-sm text-[#420002]/75 font-sans font-light leading-relaxed">
                Reserved for traditional and heritage-rooted collections. Written in Tanishka&apos;s mother&apos;s handwriting, it carries a personal, generational thread that the English mark doesn&apos;t, so it&apos;s used deliberately, not interchangeably with the English wordmark.
              </p>
            </div>
          </div>

        </div>

        {/* Usage notes rendered as refined editorial footnotes */}
        <div className="mt-20 pt-10 border-t border-[#420002]/15">
          <p className="text-xs uppercase tracking-[0.25em] text-[#420002]/60 font-sans mb-6">
            Usage Notes for the Website
          </p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-xs text-[#420002]/75 font-sans font-light leading-relaxed">
            <p>
              • All three marks are red on cream by default (#C82127 on #FFFAEE), matching the brand&apos;s core palette.
            </p>
            <p>
              • Keep clear space around each mark at least equal to the height of the &ldquo;Z&rdquo; or &ldquo;ज़&rdquo; so nothing crowds it.
            </p>
            <p>
              • Don&apos;t recolor, stretch, or rotate any of the three, if a dark-background or reversed (cream-on-red) version is needed for a specific placement, that should be a deliberate export, not a live CSS filter.
            </p>
            <p>
              • The Hindi and English wordmarks are not translations of each other in function, don&apos;t swap one in for the other based on convenience, the choice signals contemporary vs. traditional collection.
            </p>
          </div>
        </div>

      </section>

      {/* 7. REFINED EDITORIAL OUTRO */}
      <section className="py-24 text-center border-t border-[#420002]/10 bg-[#fffdf7]">
        <div className="mx-auto max-w-[800px] px-6">
          <p className="font-serif italic text-3xl sm:text-4xl text-[#420002] font-light mb-6">
            &ldquo;A little box of memories, worn close to the heart.&rdquo;
          </p>
          <div className="h-px w-16 bg-[#c82127]/40 mx-auto mb-8" />
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-semibold text-[#c82127] hover:text-[#420002] transition-colors group"
          >
            <span>Explore The Collections</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
