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
    <section className="relative w-full bg-[#fffaee] py-16 sm:py-24 overflow-hidden font-sans border-b border-[#420002]/10">
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

      <div className="relative z-20 mx-auto max-w-[1500px] px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#c82127] font-semibold font-sans">
              Atelier Guidance & Care
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#420002] font-normal leading-tight">
            Frequently Asked Questions
          </h2>

          <div className="w-12 h-[2px] bg-[#c82127] mx-auto mt-3" />
        </div>

        {/* 2-Column Split: FAQs Left, Concierge Box Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: FAQs Accordions */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3 font-sans">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#c82127] bg-[#ffffff] shadow-sm"
                      : "border-[#420002]/15 bg-[#fffaee] hover:border-[#420002]/30"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none group font-sans cursor-pointer"
                  >
                    <span className="font-sans text-[14px] sm:text-[15px] font-medium text-[#420002] pr-3 leading-snug group-hover:text-[#c82127] transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 h-7 w-7 rounded-full border border-[#420002]/20 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-[#c82127] text-[#fffaee] border-[#c82127] rotate-180" : "text-[#420002]/70"
                    }`}>
                      <ChevronDown className="h-3.5 w-3.5 stroke-[1.5]" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-48 opacity-100 pb-5 px-5" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-[13px] sm:text-[14px] text-[#420002]/75 font-sans leading-relaxed border-t border-[#420002]/10 pt-3.5 font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Minimal Concierge Box */}
          <div className="lg:col-span-5 flex flex-col font-sans">
            <div className="relative flex flex-col justify-between h-full rounded-2xl bg-[#ffffff] border border-[#420002]/15 p-6 sm:p-8 shadow-sm overflow-hidden font-sans">
              
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-2 font-sans">
                  <span className="text-[10px] text-[#c82127]">✦</span>
                  <span className="text-[9.5px] uppercase tracking-[0.25em] font-sans font-semibold text-[#c82127]">
                    Atelier Concierge
                  </span>
                </div>
                
                <h3 className="font-display text-2xl text-[#420002] leading-snug mb-2">
                  Have a specific inquiry?
                </h3>
                <p className="text-xs text-[#420002]/70 font-sans mb-6 font-light">
                  Send your question directly to our Jaipur atelier concierge. We respond promptly.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center font-sans">
                    <CheckCircle2 className="h-10 w-10 text-[#c82127] mb-2 stroke-[1.5]" />
                    <h4 className="font-display text-xl text-[#420002]">Inquiry Sent Successfully</h4>
                    <p className="text-xs text-[#420002]/70 font-sans mt-1">
                      Our atelier team will get back to you shortly via email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 font-sans">
                    <div>
                      <label className="block text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#420002]/80 mb-1 font-medium">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl bg-[#fffaee] border border-[#420002]/15 px-3.5 py-2.5 text-xs text-[#420002] placeholder:text-[#420002]/40 outline-none focus:border-[#c82127] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#420002]/80 mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl bg-[#fffaee] border border-[#420002]/15 px-3.5 py-2.5 text-xs text-[#420002] placeholder:text-[#420002]/40 outline-none focus:border-[#c82127] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#420002]/80 mb-1 font-medium">
                        Your Query
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Ask about resizing, bespoke commissions, or delivery..."
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        className="w-full rounded-xl bg-[#fffaee] border border-[#420002]/15 px-3.5 py-2.5 text-xs text-[#420002] placeholder:text-[#420002]/40 outline-none focus:border-[#c82127] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#c82127] text-[#fffaee] py-3 text-[10px] font-semibold uppercase tracking-[0.22em] shadow-sm transition-all duration-300 hover:bg-[#a5181d] cursor-pointer mt-1"
                    >
                      <span>Send to Atelier</span>
                      <Send className="h-3 w-3" />
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
