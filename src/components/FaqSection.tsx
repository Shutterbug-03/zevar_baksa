"use client";

import { useState } from "react";
import { ChevronDown, Send, CheckCircle2 } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How quickly can I receive my handcrafted heirloom order?",
    answer:
      "Each piece of Zevar Baksa jewellery is meticulously handcrafted by master artisans in Jaipur. Ready-to-ship collections are dispatched within 2–4 business days with insured express shipping. Bespoke and bridal orders typically take 3–4 weeks from initial design approval.",
  },
  {
    id: "faq-2",
    question: "What materials and gemstones are used in Zevar Baksa pieces?",
    answer:
      "We strictly source certified 18k and 22k hallmarked gold, natural uncut diamonds (Polki), fine Kundan, and ethically sourced precious gemstones including Zambian emeralds, Burmese rubies, and South Sea pearls.",
  },
  {
    id: "faq-3",
    question: "How do I care for and maintain my Kundan & Gold jewellery?",
    answer:
      "Store each piece in its original velvet box away from moisture, perfumes, and direct heat. Clean gently with a soft dry cloth. We offer complimentary lifetime professional inspection and re-polishing at our Jaipur atelier.",
  },
  {
    id: "faq-4",
    question: "Do you offer bespoke consultations and custom sizing?",
    answer:
      "Yes, our master designers offer one-on-one virtual or in-person bridal and heirloom consultations. We customize sizing, gemstone choices, and personalized engravings to match your vision.",
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
    <section className="w-full bg-background py-24 md:py-32 overflow-hidden font-sans">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zb-red font-semibold font-sans mb-3">
            Assistance & Guidance
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal leading-tight">
            Have Questions? We&apos;ve Got Answers.
          </h2>
          <p className="mt-3 text-[14px] text-foreground/70 font-sans leading-relaxed">
            Everything you need to know about our heirloom craftsmanship, shipping, and bespoke services.
          </p>
        </div>

        {/* 2-Column Split: FAQs Left, Query Box Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 font-sans">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-lg transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-primary/40 bg-zb-cream-alt/70 shadow-sm"
                      : "border-foreground/10 hover:border-foreground/25 bg-background"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group font-sans"
                  >
                    <span className="font-sans text-base md:text-lg font-medium text-primary pr-4 leading-snug group-hover:text-zb-red transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full border border-foreground/15 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-transparent text-foreground/60"
                    }`}>
                      <ChevronDown className="h-4 w-4 stroke-[1.5]" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-60 opacity-100 pb-6 px-6" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-[14px] text-foreground/80 font-sans leading-relaxed border-t border-foreground/8 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sleek Luxury Query Box (5 cols) */}
          <div className="lg:col-span-5 font-sans">
            <div className="relative rounded-2xl bg-secondary/80 border border-primary/20 p-8 md:p-10 shadow-lg backdrop-blur-sm overflow-hidden font-sans">
              
              {/* Subtle Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2 font-sans">
                  <span className="h-2 w-2 rounded-full bg-zb-red animate-pulse" />
                  <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-zb-red">
                    Direct Inquiry
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl md:text-3xl text-primary leading-snug mb-2 font-normal">
                  Can&apos;t find your answer?
                </h3>
                <p className="text-[13px] text-foreground/70 font-sans mb-8">
                  Send your question directly to our atelier concierges. We respond within 2 hours.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center fade-up font-sans">
                    <CheckCircle2 className="h-12 w-12 text-zb-red mb-3 stroke-[1.3]" />
                    <h4 className="font-serif text-xl text-primary">Inquiry Sent Successfully</h4>
                    <p className="text-[13px] text-foreground/75 font-sans mt-1">
                      Our atelier team will get back to you shortly via email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-sans text-foreground/80 mb-1.5 font-medium">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharani Ananya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/40 outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-sans text-foreground/80 mb-1.5 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/40 outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-sans text-foreground/80 mb-1.5 font-medium">
                        Your Query
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Ask about custom sizing, delivery timelines, or gemstone options..."
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/40 outline-none focus:border-primary transition-colors font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-3.5 px-6 rounded-md text-[11px] uppercase tracking-[0.2em] font-sans font-semibold hover:bg-zb-red transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Submit Query</span>
                      <Send className="h-3.5 w-3.5" />
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
