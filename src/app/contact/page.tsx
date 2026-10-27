"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Instagram, MessageCircle, UserCheck } from "lucide-react";
import { siteConfig, whatsappLink } from "@/data/siteConfig";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not send your message.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Could not send your message.");
      setStatus("error");
    }
  };

  const officer = siteConfig.grievanceOfficer;

  return (
    <Layout>
      <section className="pt-40 pb-16 mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-[11px] uppercase tracking-[0.32em] text-primary">Say hello</p>
        <h1 className="mt-6 font-display text-6xl md:text-9xl leading-[0.9]">
          Contact <em className="not-italic italic">us.</em>
        </h1>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-12 pb-24 grid md:grid-cols-2 gap-14">
        <div className="space-y-10">
          <ContactRow icon={<MapPin />} label="Address" value={"B-21, Bhan Nagar, Queens Road\nVaishali Nagar, Jaipur\nRajasthan 302021, India"} />
          {siteConfig.phone && (
            <ContactRow icon={<Phone />} label="Call us" value={siteConfig.phone} href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} />
          )}
          {siteConfig.whatsapp && (
            <ContactRow icon={<MessageCircle />} label="WhatsApp" value={`+${siteConfig.whatsapp}`} href={whatsappLink()} />
          )}
          <ContactRow icon={<Mail />} label="Write" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <ContactRow icon={<Instagram />} label="Follow" value="@zevarbaksa" />
          {officer.name && (
            <ContactRow
              icon={<UserCheck />}
              label="Grievance Officer"
              value={`${officer.name}\n${officer.designation}, ZevarBaksa LLP\nB-21, Bhan Nagar, Queens Road, Jaipur 302021\n${officer.email}`}
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Question/query" name="topic" placeholder="Custom · Ready to ship · etc" />
          <div>
            <label htmlFor="message" className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Message</label>
            <textarea id="message" name="message" required rows={5} maxLength={5000} className="mt-2 w-full bg-transparent border-b border-input py-3 outline-none focus:border-primary transition resize-none" />
          </div>
          {/* Honeypot — hidden from people, filled by bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <button
            disabled={status === "sending"}
            className="bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-crimson-deep transition disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Enquiry"}
          </button>
          {status === "sent" && (
            <p role="status" className="text-sm text-primary">Thank you — we have received your enquiry and will reply by email shortly.</p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-500">{errorMsg}</p>
          )}
        </form>
      </section>
    </Layout>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-5 border-t border-border pt-6">
      <div className="text-primary [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[1.4]">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="mt-2 block font-display text-2xl whitespace-pre-line leading-tight hover:text-primary transition-colors">{value}</a>
        ) : (
          <p className="mt-2 font-display text-2xl whitespace-pre-line leading-tight">{value}</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} className="mt-2 w-full bg-transparent border-b border-input py-3 outline-none focus:border-primary transition" />
    </div>
  );
}
