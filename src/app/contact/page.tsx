"use client";

import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <section className="pt-40 pb-16 mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-[11px] uppercase tracking-[0.32em] text-primary">Say hello</p>
        <h1 className="mt-6 font-display text-6xl md:text-9xl leading-[0.9]">
          Come see us <em className="not-italic italic">in person.</em>
        </h1>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-12 pb-24 grid md:grid-cols-2 gap-14">
        <div className="space-y-10">
          <ContactRow icon={<MapPin />} label="Atelier" value={"Shop 45, Johri Bazar\nJaipur, Rajasthan\n302003, India"} />
          <ContactRow icon={<Phone />} label="Call us" value="+91 98111 22334" />
          <ContactRow icon={<Mail />} label="Write" value="hello@zevarbaksa.com" />
          <ContactRow icon={<Instagram />} label="Follow" value="@zevarbaksa" />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <Field label="Name" name="name" />
          <Field label="Email" name="email" type="email" />
          <Field label="Interested in" name="topic" placeholder="Bridal · Bespoke · Ready to Ship" />
          <div>
            <label className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Message</label>
            <textarea rows={5} className="mt-2 w-full bg-transparent border-b border-input py-3 outline-none focus:border-primary transition resize-none" />
          </div>
          <button className="bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-crimson-deep transition">
            Send Enquiry
          </button>
        </form>
      </section>
    </Layout>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-5 border-t border-border pt-6">
      <div className="text-primary [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[1.4]">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
        <p className="mt-2 font-display text-2xl whitespace-pre-line leading-tight">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} className="mt-2 w-full bg-transparent border-b border-input py-3 outline-none focus:border-primary transition" />
    </div>
  );
}
