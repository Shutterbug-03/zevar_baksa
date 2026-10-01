"use client";

import { useState } from "react";
import Script from "next/script";
import { ChevronDown, Send, CheckCircle2 } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What materials do you use in your jewellery?",
    answer:
      "We craft in gold, silver, and brass, depending on the collection. Each product page tells you exactly what a piece is made of, so check the Collection Page for details.",
  },
  {
    id: "faq-2",
    question: "Is your jewellery hypoallergenic / safe for sensitive skin?",
    answer:
      "Yes, all our jewellery is hypoallergenic and safe for sensitive skin. Gold and silver are naturally so, and our brass pieces carry high-quality gold and silver plating and an e-coating that's hypoallergenic as well. If you have particularly sensitive skin, we recommend checking the details section on each product page for the specific plating used.",
  },
  {
    id: "faq-3",
    question: "How do I care for my jewellery?",
    answer:
      "Keep pieces dry, avoid contact with perfume and sweat, and store them in your Zevar Baksa box or pouch away from direct sunlight. All our metals carry the highest-quality plating we can offer. That said, silver jewellery will naturally oxidise over time. This is normal and part of how silver ages.",
  },
  {
    id: "faq-4",
    question: "Do you restock sold-out pieces?",
    answer:
      "Our collections are released in limited runs, so once a piece sells out, it typically won't be restocked. If you'd like something similar, see our custom orders FAQ below.",
  },
  {
    id: "faq-5",
    question: "Do you take custom orders?",
    answer:
      "Yes. If you love one of our pieces, we can customise it to a certain extent, for example the length of a chain or pearl necklace, or the size of the piece. For a completely custom piece in silver or gold, write to us and we'll happily talk it through. All customised pieces are made to order.",
  },
  {
    id: "faq-6",
    question: "Do you ship internationally?",
    answer: "Right now we ship within India only.",
  },
  {
    id: "faq-7",
    question: "How long does an order take to ship?",
    answer:
      "Ready-to-ship pieces are dispatched within 5–7 business days, after they pass quality control. Made-to-order pieces, including customised ones, take 20–30 days to be ready for dispatch. We'll share the exact timeline with you once your order is placed.",
  },
  {
    id: "faq-8",
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns or exchanges only if a piece arrives defective or damaged, has incorrect plating, or isn't the item you ordered. Full details are on our Return & Exchange page.",
  },
  {
    id: "faq-9",
    question: "How do I know my ring/bangle size?",
    answer:
      "Most of our rings and bangles are resizable. For pieces that aren't, you'll find a sizing chart on the product page.",
  },
  {
    id: "faq-10",
    question: "Are the artisans/designers behind each piece credited?",
    answer:
      "Yes. Every piece is designed in-house, then brought to life in collaboration with individual manufacturing units in Jaipur, and credited as part of the collection. We're working toward bringing manufacturing fully in-house, where our own karigar team will be credited by name for their work on every piece.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", query: "" });
    }, 4000);
  };

  return (
    <section className="relative w-full bg-[#fffaee] pt-10 sm:pt-14 pb-20 sm:pb-24 md:pb-28 overflow-hidden font-sans flex flex-col justify-center">
      
      <Script id="structured-data-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }) }} />

      <div className="relative z-20 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-16 w-full">
        
        {/* Section Header — Compact Luxury Lockup */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
              Atelier Guidance & Care
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-[2.6rem] text-[#420002] font-normal leading-tight">
            Have Questions? We&apos;ve Got Answers.
          </h2>

          {/* Delicate Ornamental Line */}
          <div className="flex items-center justify-center gap-2.5 my-2.5 sm:my-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c82127]/60" />
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#420002] via-[#c82127] to-[#420002] rounded-full" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c82127]/60" />
          </div>
        </div>

        {/* 2-Column Split: FAQs Left, Sticky Concierge Box Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Compact Accordions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 font-sans">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden bg-[#fffaee] ${
                    isOpen
                      ? "border-[#c82127] shadow-md"
                      : "border-[#420002]/15 hover:border-[#c82127]/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left focus:outline-none group font-sans cursor-pointer"
                  >
                    <span className="font-sans text-[13.5px] sm:text-[15px] font-medium text-[#420002] pr-3 leading-snug group-hover:text-[#c82127] transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 h-7 w-7 rounded-full border border-[#420002]/20 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-[#c82127] text-[#fffaee] rotate-180 border-[#c82127]" : "bg-transparent text-[#420002]"
                    }`}>
                      <ChevronDown className="h-3.5 w-3.5 stroke-[1.5]" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100 pb-4 px-4 sm:px-5" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-[12.5px] sm:text-[13.5px] text-[#420002]/80 font-sans leading-relaxed border-t border-[#420002]/10 pt-3 font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Direct Query Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#420002]/15 bg-[#420002] p-5 sm:p-7 flex flex-col justify-between shadow-lg text-[#fffaee]">
              
              <div>
                <h3 className="font-display text-xl sm:text-2xl text-[#fffaee]">
                  Ask Our Karigars
                </h3>
                <p className="mt-1 text-xs text-[#fffaee]/80 font-sans leading-relaxed font-light">
                  Have a bespoke requirement or sizing question? Send your query directly to our Jaipur office.
                </p>

                {submitted ? (
                  <div className="my-6 p-4 rounded-xl bg-[#c82127]/25 border border-[#c82127] flex items-center gap-3 text-[#fffaee]">
                    <CheckCircle2 className="h-5 w-5 text-[#fffaee] flex-shrink-0" />
                    <p className="text-xs font-sans font-medium">
                      Query received! An atelier specialist will get back within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4 space-y-3 font-sans">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-[#fffaee]/20 bg-[#fffaee]/10 px-3.5 py-2.5 text-xs text-[#fffaee] placeholder-[#fffaee]/60 focus:border-[#c82127] focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-[#fffaee]/20 bg-[#fffaee]/10 px-3.5 py-2.5 text-xs text-[#fffaee] placeholder-[#fffaee]/60 focus:border-[#c82127] focus:outline-none transition-colors"
                    />
                    <textarea
                      rows={3}
                      placeholder="Ask about materials, sizing, hallmarking, custom bridal..."
                      required
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      className="w-full rounded-lg border border-[#fffaee]/20 bg-[#fffaee]/10 px-3.5 py-2.5 text-xs text-[#fffaee] placeholder-[#fffaee]/60 focus:border-[#c82127] focus:outline-none transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c82127] text-[#fffaee] py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#a5181d] transition-colors shadow-md active:scale-98 cursor-pointer"
                    >
                      <span>Send Direct Query</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Concierge Contact Links */}
              <div className="mt-5 pt-4 border-t border-[#fffaee]/15 flex items-center justify-between text-[11px] font-sans text-[#fffaee]/80">
                <span>Contact us at:</span>
                <a
                  href="mailto:info@zevarbaksa.com"
                  className="font-medium text-[#fffaee] hover:underline underline-offset-2"
                >
                  info@zevarbaksa.com
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
