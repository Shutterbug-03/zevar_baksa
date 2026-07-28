import { Layout } from "@/components/Layout";

export const metadata = {
  title: "Our Story — Zevar Baksa",
  description: "The story of Zevar Baksa — a house of handcrafted heirloom jewellery, honouring traditional Indian karigari with a modern eye.",
};

export default function About() {
  return (
    <Layout>
      <section className="pt-40 pb-20 mx-auto max-w-[1200px] px-6 md:px-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-primary">Our Story</p>
        <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9]">
          A little box <br />
          <em className="not-italic italic">of memories.</em>
        </h1>
        <p className="mt-10 max-w-2xl mx-auto text-lg text-foreground/75 leading-relaxed">
          Zevar Baksa began at a grandmother's dressing table — a battered
          velvet box holding polki chokers older than the country itself.
          We build for that same box: pieces that outlive trends and
          become somebody's inheritance.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-24">
        <div className="aspect-[16/9] overflow-hidden">
          <img src="/images/editorial-1.jpg" alt="Bridal editorial" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 md:px-12 py-20 grid md:grid-cols-2 gap-14 items-center">
        <img src="/images/craft.jpg" alt="Craft" className="w-full aspect-square object-cover" />
        <div className="space-y-6">
          <h2 className="font-display text-5xl md:text-6xl">Karigari, honoured.</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Every piece is crafted by karigars in Jaipur and Old Delhi who
            have been shaping gold for four, sometimes five generations.
            We pay them fairly, credit them proudly, and give them the
            time a hand-set piece truly needs.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            The result is jewellery that carries fingerprints, not machine marks.
          </p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="mx-auto max-w-[900px] px-6">
          <p className="text-[11px] uppercase tracking-[0.32em] opacity-70">Studio Values</p>
          <div className="mt-10 grid md:grid-cols-3 gap-10 text-left">
            {[
              { t: "Slow", d: "Six to eight weeks per piece. We don't rush the karigar's hand." },
              { t: "Sourced", d: "Ethically mined gold and stones, traceable to origin." },
              { t: "Signed", d: "Every piece carries our maker's mark and a certificate." },
            ].map((v) => (
              <div key={v.t}>
                <h3 className="font-display text-4xl">{v.t}.</h3>
                <p className="mt-4 opacity-85 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
