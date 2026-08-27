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
    question: "What precious metals & enamel craft do you use?",
    answer:
      "We craft exclusively in solid 925 sterling silver, 22K gold vermeil, and solid brass with authentic Jaipur Meenakari enamel fired at 750°C. All pieces are BIS hallmarked.",
  },
  {
    id: "faq-2",
    question: "Is your jewellery hypoallergenic & sensitive-skin safe?",
    answer:
      "Yes — 100% nickel-free and hypoallergenic. Our precious metal alloys and gold vermeil coatings ensure comfortable daily wear.",
  },
  {
    id: "faq-3",
    question: "How do I care for my heirloom pieces?",
    answer:
      "Keep dry and store in your Zevar Baksa velvet box away from direct perfumes. A complimentary microfibre polishing cloth is included with every order.",
  },
  {
    id: "faq-4",
    question: "Do you restock sold-out editions?",
    answer:
      "Our pieces are released in limited Jaipur karigar runs. Once an edition is claimed, it is retired to preserve collector rarity.",
  },
  {
    id: "faq-5",
    question: "What are your delivery timelines across India?",
    answer:
      "Insured express courier delivers within 3–7 business days nationwide. Real-time SMS and WhatsApp tracking are provided upon dispatch.",
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
    <section className="relative w-full bg-[#1A0307] py-16 sm:py-20 md:py-24 overflow-hidden font-sans flex flex-col justify-center">
      {/* Image 2 Background (/images/about-bg.jpg) */}
      <img
        src="/images/about-bg.jpg"
        alt="Zevar Baksa Guidance Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
      />
      {/* Warm Ambient Shading */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/50 pointer-events-none" />
      
      {/* Seamless Top & Bottom Blend Gradients */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#1A0307] via-[#1A0307]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#1A0307]/70 to-[#1A0307] pointer-events-none z-10" />

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
            <span className="text-[10px] text-amber-300">✦</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-300 font-semibold font-sans">
              Atelier Guidance & Care
            </span>
            <span className="text-[10px] text-amber-300">✦</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-[2.6rem] text-[#FAF7F2] font-normal leading-tight drop-shadow-md">
            Have Questions? We&apos;ve Got Answers.
          </h2>

          {/* Delicate Gold Ornamental Line */}
          <div className="flex items-center justify-center gap-2.5 my-2.5 sm:my-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/70" />
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#7A1D2E] via-amber-300 to-[#7A1D2E] rounded-full shadow-[0_0_8px_rgba(252,211,77,0.4)]" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/70" />
          </div>
        </div>

        {/* 2-Column Equal-Height Split: FAQs Left, Concierge Box Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Compact Accordions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-2.5 font-sans">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-amber-300/50 bg-[#2B050B]/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                      : "border-amber-300/20 hover:border-amber-300/40 bg-[#1F0408]/60 backdrop-blur-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left focus:outline-none group font-sans cursor-pointer"
                  >
                    <span className="font-sans text-[13.5px] sm:text-[15px] font-medium text-[#FAF7F2] pr-3 leading-snug group-hover:text-amber-200 transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 h-7 w-7 rounded-full border border-amber-300/30 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-amber-300 text-[#2D0D12] rotate-180" : "bg-transparent text-amber-200/80"
                    }`}>
                      <ChevronDown className="h-3.5 w-3.5 stroke-[1.5]" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-48 opacity-100 pb-4 px-4 sm:px-5" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-[12.5px] sm:text-[13.5px] text-[#FAF7F2]/80 font-sans leading-relaxed border-t border-amber-300/15 pt-3 font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Equal-Height Luxury Concierge Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col font-sans">
            <div className="relative flex flex-col justify-between h-full rounded-2xl bg-[#240409]/90 border border-amber-300/35 p-6 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden font-sans">
              
              {/* Subtle Decorative Gold Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1.5 font-sans">
                  <span className="text-[10px] text-amber-300">✦</span>
                  <span className="text-[9.5px] uppercase tracking-[0.25em] font-sans font-semibold text-amber-300">
                    Atelier Concierge Inquiry
                  </span>
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl text-[#FAF7F2] leading-snug mb-1">
                  Can&apos;t find your answer?
                </h3>
                <p className="text-xs text-[#FAF7F2]/75 font-sans mb-5 font-light">
                  Send your question directly to our Jaipur atelier concierges. We respond promptly.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center font-sans">
                    <CheckCircle2 className="h-10 w-10 text-amber-300 mb-2 stroke-[1.3]" />
                    <h4 className="font-display text-lg text-[#FAF7F2]">Inquiry Sent Successfully</h4>
                    <p className="text-xs text-[#FAF7F2]/75 font-sans mt-1">
                      Our atelier team will get back to you shortly via email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-sans">
                    <div>
                      <label className="block text-[9.5px] uppercase tracking-[0.2em] font-sans text-amber-200/90 mb-1 font-medium">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharani Ananya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-amber-300/25 rounded-lg px-3.5 py-2 text-[13px] text-[#FAF7F2] placeholder:text-[#FAF7F2]/30 outline-none focus:border-amber-300 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase tracking-[0.2em] font-sans text-amber-200/90 mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-amber-300/25 rounded-lg px-3.5 py-2 text-[13px] text-[#FAF7F2] placeholder:text-[#FAF7F2]/30 outline-none focus:border-amber-300 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase tracking-[0.2em] font-sans text-amber-200/90 mb-1 font-medium">
                        Your Query
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Ask about sizing, delivery, or custom gemstone options..."
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        className="w-full bg-black/40 border border-amber-300/25 rounded-lg px-3.5 py-2 text-[13px] text-[#FAF7F2] placeholder:text-[#FAF7F2]/30 outline-none focus:border-amber-300 transition-colors font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/40 bg-[#3B0710] py-2.5 px-5 text-[10px] uppercase tracking-[0.22em] font-sans font-semibold text-[#FAF7F2] shadow-lg transition-all duration-300 hover:border-amber-300 hover:bg-[#520A16] hover:shadow-[0_0_20px_rgba(252,211,77,0.3)] active:scale-95 cursor-pointer"
                    >
                      <span>Submit Query</span>
                      <Send className="h-3 w-3 text-amber-300" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
