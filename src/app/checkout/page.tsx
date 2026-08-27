"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lock,
  CreditCard,
  Smartphone,
  Building2,
  Package,
  Sparkles,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useHydrated } from "@/hooks/useHydrated";

/* ────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────── */
type Step = "address" | "payment" | "confirm";

type AddressForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

/* ────────────────────────────────────────────────────────
   STEP INDICATOR
──────────────────────────────────────────────────────── */
function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Delivery" },
    { key: "payment", label: "Payment" },
    { key: "confirm", label: "Confirm" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          {/* Step bubble */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold font-sans transition-all duration-300 ${
                i < currentIndex
                  ? "bg-primary text-primary-foreground"
                  : i === currentIndex
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-secondary text-foreground/30 border border-border"
              }`}
            >
              {i < currentIndex ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[9px] uppercase tracking-[0.2em] font-sans ${
                i <= currentIndex ? "text-primary font-semibold" : "text-foreground/30"
              }`}
            >
              {s.label}
            </span>
          </div>
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div
              className={`w-16 md:w-24 h-px mx-2 mb-5 transition-all duration-500 ${
                i < currentIndex ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   ORDER SUMMARY SIDEBAR
──────────────────────────────────────────────────────── */
function OrderSummary({ collapsed = false }: { collapsed?: boolean }) {
  const { items, totalPrice, totalItems } = useCartStore();
  const { format } = useCurrencyStore();
  const [open, setOpen] = useState(!collapsed);
  const hydrated = useHydrated();

  const cartItems = hydrated ? items : [];
  const totalItemCount = hydrated ? totalItems() : 0;
  const priceTotal = hydrated ? totalPrice() : 0;

  const shipping = 0; // Free insured shipping
  const tax = Math.round(priceTotal * 0.03); // 3% GST placeholder

  return (
    <div className="bg-secondary/30 border border-border/60 rounded-2xl overflow-hidden">
      {/* Toggle header on mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 md:cursor-default"
      >
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-primary stroke-[1.4]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-foreground">
            Order Summary
          </span>
          <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-semibold">
            {totalItemCount}
          </span>
        </div>
        <span className="font-display text-lg text-primary md:hidden">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {/* Items list */}
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <div className="px-5 pb-4 space-y-4 border-t border-border/40">
          {cartItems.map((item) => (
            <div
              key={`${item.product.id}-${item.sizePreference}`}
              className="flex gap-3 pt-4"
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-16 rounded-lg overflow-hidden border border-border/50 bg-secondary">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display text-foreground leading-snug truncate">
                  {item.product.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-foreground/50 font-sans mt-0.5">
                  {item.sizePreference}
                </p>
                <p className="text-[10px] text-foreground/40 font-sans">
                  {item.product.status}
                </p>
              </div>
              <span className="text-sm font-sans font-semibold text-foreground flex-shrink-0">
                {hydrated ? format(item.product.price * item.quantity) : `₹${(item.product.price * item.quantity).toLocaleString("en-IN")}`}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-border/40 px-5 py-4 space-y-2.5">
          <div className="flex justify-between text-xs font-sans text-foreground/60">
            <span>Subtotal</span>
            <span>{hydrated ? format(priceTotal) : `₹${priceTotal.toLocaleString("en-IN")}`}</span>
          </div>
          <div className="flex justify-between text-xs font-sans text-foreground/60">
            <span>Insured Shipping</span>
            <span className="text-emerald-500 font-medium">Complimentary</span>
          </div>
          <div className="flex justify-between text-xs font-sans text-foreground/60">
            <span>GST (inclusive)</span>
            <span>{hydrated ? format(tax) : `₹${tax.toLocaleString("en-IN")}`}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border/40">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground">
              Total
            </span>
            <span className="font-display text-xl text-primary">
              {hydrated ? format(priceTotal) : `₹${priceTotal.toLocaleString("en-IN")}`}
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="px-5 pb-5 grid grid-cols-3 gap-2 border-t border-border/40 pt-4">
          {[
            { icon: ShieldCheck, label: "BIS Hallmarked" },
            { icon: Truck, label: "Free Insured" },
            { icon: Sparkles, label: "Velvet Box" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <Icon className="h-4 w-4 text-primary/70 stroke-[1.3]" />
              <span className="text-[9px] uppercase tracking-[0.1em] font-sans text-foreground/50">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   STEP 1 — DELIVERY ADDRESS
──────────────────────────────────────────────────────── */
function AddressStep({
  form,
  onChange,
  onNext,
}: {
  form: AddressForm;
  onChange: (f: AddressForm) => void;
  onNext: () => void;
}) {
  const set = (key: keyof AddressForm, value: string) =>
    onChange({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200";

  const labelClass =
    "block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/60 mb-1.5";

  const INDIAN_STATES = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
    "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
    "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-1">
          Delivery Details
        </h2>
        <p className="text-xs text-foreground/50 font-sans">
          Where shall we send your heirloom piece?
        </p>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-primary border-b border-border/40 pb-2">
          Contact Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name *</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/25 stroke-[1.3]" />
              <input
                type="text"
                required
                placeholder="Ananya"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              type="text"
              required
              placeholder="Sharma"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/25 stroke-[1.3]" />
            <input
              type="email"
              required
              placeholder="ananya@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/25 stroke-[1.3]" />
            <input
              type="tel"
              required
              placeholder="+91 98765 00000"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-primary border-b border-border/40 pb-2">
          Shipping Address
        </p>
        <div>
          <label className={labelClass}>Address Line 1 *</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/25 stroke-[1.3]" />
            <input
              type="text"
              required
              placeholder="Flat / House No., Building, Street"
              value={form.address1}
              onChange={(e) => set("address1", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Address Line 2</label>
          <input
            type="text"
            placeholder="Area, Colony, Landmark (optional)"
            value={form.address2}
            onChange={(e) => set("address2", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>City *</label>
            <input
              type="text"
              required
              placeholder="Jaipur"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>PIN Code *</label>
            <input
              type="text"
              required
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="302001"
              value={form.pincode}
              onChange={(e) => set("pincode", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>State *</label>
            <select
              required
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Select state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input
              type="text"
              value="India"
              readOnly
              className={`${inputClass} text-foreground/50 cursor-not-allowed`}
            />
          </div>
        </div>
      </div>

      {/* Delivery note */}
      <div className="flex items-start gap-3 bg-amber-950/30 border border-amber-500/20 rounded-xl p-4">
        <Truck className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5 stroke-[1.4]" />
        <p className="text-xs text-amber-200/80 font-sans leading-relaxed">
          All Zevar Baksa pieces are dispatched via insured, door-to-door delivery with real-time tracking. Signature confirmation required upon delivery.
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-full bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.3em] font-sans font-semibold flex items-center justify-center gap-2.5 hover:bg-[#5C0A19] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01]"
      >
        Continue to Payment <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

/* ────────────────────────────────────────────────────────
   STEP 2 — PAYMENT
──────────────────────────────────────────────────────── */
function PaymentStep({
  method,
  setMethod,
  onNext,
  onBack,
}: {
  method: PaymentMethod;
  setMethod: (m: PaymentMethod) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { totalPrice } = useCartStore();
  const { format } = useCurrencyStore();

  const methods: {
    key: PaymentMethod;
    icon: React.ElementType;
    label: string;
    desc: string;
    badge?: string;
  }[] = [
    {
      key: "upi",
      icon: Smartphone,
      label: "UPI",
      desc: "Pay instantly via GPay, PhonePe, Paytm or any UPI app",
      badge: "Instant",
    },
    {
      key: "card",
      icon: CreditCard,
      label: "Credit / Debit Card",
      desc: "Visa, Mastercard, RuPay — EMI options available on orders above ₹5,000",
    },
    {
      key: "netbanking",
      icon: Building2,
      label: "Net Banking",
      desc: "All major Indian banks supported",
    },
    {
      key: "cod",
      icon: Package,
      label: "Cash on Delivery",
      desc: "Pay when your piece arrives at your doorstep",
      badge: "Only ₹499 COD charge",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-1">
          Payment Method
        </h2>
        <p className="text-xs text-foreground/50 font-sans">
          All transactions are encrypted and secured by SSL
        </p>
      </div>

      {/* Payment method selector */}
      <div className="space-y-3">
        {methods.map(({ key, icon: Icon, label, desc, badge }) => (
          <button
            key={key}
            onClick={() => setMethod(key)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
              method === key
                ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                : "border-border/60 hover:border-foreground/30 bg-background"
            }`}
          >
            {/* Radio circle */}
            <div
              className={`h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                method === key ? "border-primary" : "border-foreground/20"
              }`}
            >
              {method === key && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </div>

            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Icon className="h-4 w-4 text-primary stroke-[1.4]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-sans font-semibold text-foreground">
                  {label}
                </span>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.15em] font-semibold bg-primary/15 text-primary">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-foreground/50 font-sans mt-0.5 leading-relaxed">
                {desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* UPI input field */}
      {method === "upi" && (
        <div className="animate-fade-in">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/60 mb-1.5">
            UPI ID
          </label>
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      )}

      {/* Card fields */}
      {method === "card" && (
        <div className="space-y-3 animate-fade-in">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/60 mb-1.5">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/60 mb-1.5">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/60 mb-1.5">
                CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center gap-2.5 text-[10px] text-foreground/40 font-sans bg-secondary/40 rounded-xl px-4 py-3">
        <Lock className="h-3.5 w-3.5 text-foreground/30 flex-shrink-0" />
        <span>
          256-bit SSL encryption. Your payment details are never stored on our servers.
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-full border border-border text-foreground/70 text-[11px] uppercase tracking-[0.22em] font-sans font-semibold flex items-center justify-center gap-2 hover:border-foreground/40 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-3.5 rounded-full bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.3em] font-sans font-semibold flex items-center justify-center gap-2.5 hover:bg-[#5C0A19] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Review Order <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   STEP 3 — CONFIRM & PLACE ORDER
──────────────────────────────────────────────────────── */
function ConfirmStep({
  address,
  paymentMethod,
  onBack,
  onPlace,
  placing,
}: {
  address: AddressForm;
  paymentMethod: PaymentMethod;
  onBack: () => void;
  onPlace: () => void;
  placing: boolean;
}) {
  const { items, totalPrice } = useCartStore();
  const { format } = useCurrencyStore();

  const methodLabels: Record<PaymentMethod, string> = {
    upi: "UPI Payment",
    card: "Credit / Debit Card",
    netbanking: "Net Banking",
    cod: "Cash on Delivery",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-1">
          Review & Confirm
        </h2>
        <p className="text-xs text-foreground/50 font-sans">
          Please verify your details before placing the order
        </p>
      </div>

      {/* Delivery summary */}
      <div className="border border-border/60 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-secondary/30 border-b border-border/40">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-foreground/70">
            Delivering To
          </span>
          <button
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.15em] font-sans text-primary hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="px-5 py-4 space-y-1">
          <p className="text-sm font-sans font-semibold text-foreground">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-xs text-foreground/60 font-sans">
            {address.address1}
            {address.address2 && `, ${address.address2}`}
          </p>
          <p className="text-xs text-foreground/60 font-sans">
            {address.city}, {address.state} — {address.pincode}
          </p>
          <p className="text-xs text-foreground/60 font-sans">{address.phone}</p>
          <p className="text-xs text-foreground/60 font-sans">{address.email}</p>
        </div>
      </div>

      {/* Payment summary */}
      <div className="border border-border/60 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-secondary/30 border-b border-border/40">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-foreground/70">
            Payment Method
          </span>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm font-sans font-semibold text-foreground">
            {methodLabels[paymentMethod]}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="border border-border/60 rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 bg-secondary/30 border-b border-border/40">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-foreground/70">
            Order Items
          </span>
        </div>
        <div className="px-5 py-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-md overflow-hidden flex-shrink-0 bg-secondary">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-display text-foreground">
                    {item.product.name}
                  </p>
                  <p className="text-[10px] text-foreground/40 font-sans">
                    Qty {item.quantity} · {item.sizePreference}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold font-sans text-foreground">
                {format(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-border/40 flex justify-between items-center">
          <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground">
            Total Payable
          </span>
          <span className="font-display text-2xl text-primary">
            {format(totalPrice())}
          </span>
        </div>
      </div>

      {/* T&C */}
      <p className="text-[10px] text-foreground/40 font-sans leading-relaxed text-center">
        By placing this order you agree to Zevar Baksa&apos;s{" "}
        <Link href="/about" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/about" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        . All prices are inclusive of applicable taxes.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-full border border-border text-foreground/70 text-[11px] uppercase tracking-[0.22em] font-sans font-semibold flex items-center justify-center gap-2 hover:border-foreground/40 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <button
          onClick={onPlace}
          disabled={placing}
          className="flex-[2] py-4 rounded-full bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.3em] font-sans font-semibold flex items-center justify-center gap-2.5 hover:bg-[#5C0A19] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {placing ? (
            <span className="animate-pulse">Processing…</span>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" /> Place Order
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   SUCCESS STATE
──────────────────────────────────────────────────────── */
function OrderSuccess({ address }: { address: AddressForm }) {
  const orderId = `ZB-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Animated check */}
        <div className="relative mx-auto h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-40" />
          <div className="relative h-24 w-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-primary stroke-[1.2]" />
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans font-semibold mb-2">
            Order Confirmed
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground">
            Thank You, {address.firstName}!
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-secondary/40 border border-border/60 rounded-xl px-5 py-3 justify-center">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-sans text-foreground/70">
            Order ID:{" "}
            <span className="font-semibold text-foreground">{orderId}</span>
          </span>
        </div>

        <p className="text-sm text-foreground/60 font-sans leading-relaxed">
          Your heirloom is now being prepared with the utmost care at our Jaipur atelier. A confirmation has been sent to{" "}
          <span className="text-foreground font-medium">{address.email}</span>.
        </p>

        <div className="grid grid-cols-3 gap-3 border border-border/50 rounded-2xl p-5">
          {[
            { icon: ShieldCheck, label: "Order Secured", sub: "SSL Encrypted" },
            { icon: Truck, label: "Insured Delivery", sub: "Door to door" },
            { icon: Sparkles, label: "Velvet Box", sub: "Included" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon className="h-5 w-5 text-primary stroke-[1.3]" />
              <span className="text-[10px] font-semibold font-sans text-foreground/80">
                {label}
              </span>
              <span className="text-[9px] text-foreground/40 font-sans">{sub}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-sans font-semibold hover:bg-[#5C0A19] transition-all duration-300 shadow-md"
          >
            Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground/70 px-7 py-3.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-sans font-semibold hover:border-foreground/40 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   EMPTY CART STATE
──────────────────────────────────────────────────────── */
function EmptyCartState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="text-center space-y-5 max-w-sm">
        <div className="h-20 w-20 rounded-full bg-secondary/60 flex items-center justify-center mx-auto">
          <Package className="h-9 w-9 text-foreground/20 stroke-[1.2]" />
        </div>
        <h1 className="font-display text-3xl text-foreground">Your box is empty</h1>
        <p className="text-sm text-foreground/50 font-sans">
          Add some heirloom pieces before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-sans font-semibold hover:bg-[#5C0A19] transition-all duration-300 shadow-md"
        >
          Explore Collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   MAIN CHECKOUT PAGE
──────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const hydrated = useHydrated();

  const [step, setStep] = useState<Step>("address");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const [address, setAddress] = useState<AddressForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  // Load Razorpay SDK script once on mount
  useEffect(() => {
    const existing = document.getElementById("razorpay-sdk");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePlaceOrder = useCallback(async () => {
    setPlacing(true);

    const cartItems = items;
    const totalINR = Math.round(
      cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    );
    const orderItems = cartItems.map((i) => ({
      product_id: i.product.id,
      name: i.product.name,
      image: i.product.image,
      price: i.product.price,
      quantity: i.quantity,
      size_preference: i.sizePreference,
    }));

    try {
      // Step 1: Create order on server
      const createRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalINR,
          items: orderItems,
          customerEmail: address.email,
          customerName: `${address.firstName} ${address.lastName}`.trim(),
          customerPhone: address.phone,
          address,
          paymentMethod,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error ?? "Failed to create order");
      }

      const orderData = await createRes.json();

      // COD path — no payment modal needed
      if (paymentMethod === "cod") {
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.order_id,
            razorpay_payment_id: "cod",
            razorpay_signature: "cod",
            customerEmail: address.email,
            customerName: `${address.firstName} ${address.lastName}`.trim(),
            items: orderItems,
            amount: totalINR,
          }),
        });
        clearCart();
        setPlaced(true);
        setPlacing(false);
        return;
      }

      // Placeholder / dev mode — skip real modal, simulate success
      const isPlaceholder = orderData.key?.includes("PLACEHOLDER");
      if (isPlaceholder) {
        console.log("Dev mode: Skipping Razorpay modal — placeholder keys");
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.order_id,
            razorpay_payment_id: `pay_dev_${Date.now()}`,
            razorpay_signature: "dev_placeholder",
            customerEmail: address.email,
            customerName: `${address.firstName} ${address.lastName}`.trim(),
            items: orderItems,
            amount: totalINR,
          }),
        });
        clearCart();
        setPlaced(true);
        setPlacing(false);
        return;
      }

      // Step 2: Open real Razorpay modal
      type RazorpayOptions = {
        key: string;
        amount: number;
        currency: string;
        order_id: string;
        name: string;
        description: string;
        image: string;
        prefill: { name: string; email: string; contact: string };
        theme: { color: string };
        handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
        modal: { ondismiss: () => void };
      };
      type RazorpayClass = new (opts: RazorpayOptions) => { open(): void };
      const RazorpayCtor = (window as unknown as { Razorpay: RazorpayClass }).Razorpay;
      if (!RazorpayCtor) {
        throw new Error("Razorpay SDK not loaded. Please refresh and try again.");
      }

      const rzp = new RazorpayCtor({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.order_id,
        name: "Zevar Baksa Atelier",
        description: `${orderItems.length} heirloom piece${orderItems.length > 1 ? "s" : ""}`,
        image: "/favicon.ico",
        prefill: {
          name: `${address.firstName} ${address.lastName}`.trim(),
          email: address.email,
          contact: address.phone,
        },
        theme: { color: "#6B1225" },
        handler: async (response) => {
          // Step 3: Verify payment server-side
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerEmail: address.email,
              customerName: `${address.firstName} ${address.lastName}`.trim(),
              items: orderItems,
              amount: totalINR,
            }),
          });

          if (verifyRes.ok) {
            clearCart();
            setPlaced(true);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
          setPlacing(false);
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
          },
        },
      });

      rzp.open();
    } catch (err) {
      console.error("[checkout] Error:", err);
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setPlacing(false);
    }
  }, [items, address, paymentMethod, clearCart]);

  // Show success screen
  if (placed) {
    return (
      <Layout>
        <OrderSuccess address={address} />
      </Layout>
    );
  }

  // Show empty cart when hydrated and empty
  if (hydrated && items.length === 0 && !placed) {
    return (
      <Layout>
        <EmptyCartState />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-28 md:pt-36 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">

          {/* Back to cart */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-sans text-foreground/50 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
          </Link>

          {/* Page title */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-sans font-semibold mb-1">
              Secure Checkout
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              Complete Your Order
            </h1>
          </div>

          {/* Step indicator */}
          <StepIndicator step={step} />

          {/* Main layout: form left, summary right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">

            {/* LEFT — Step form */}
            <div className="bg-background border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
              {step === "address" && (
                <AddressStep
                  form={address}
                  onChange={setAddress}
                  onNext={() => setStep("payment")}
                />
              )}
              {step === "payment" && (
                <PaymentStep
                  method={paymentMethod}
                  setMethod={setPaymentMethod}
                  onNext={() => setStep("confirm")}
                  onBack={() => setStep("address")}
                />
              )}
              {step === "confirm" && (
                <ConfirmStep
                  address={address}
                  paymentMethod={paymentMethod}
                  onBack={() => setStep("payment")}
                  onPlace={handlePlaceOrder}
                  placing={placing}
                />
              )}
            </div>

            {/* RIGHT — Order summary (sticky) */}
            <div className="lg:sticky lg:top-32 space-y-4">
              <OrderSummary />

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 py-3 opacity-60">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] font-sans text-foreground/50">
                  <Lock className="h-3 w-3" /> SSL Secured
                </div>
                <div className="h-3 w-px bg-foreground/20" />
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] font-sans text-foreground/50">
                  <ShieldCheck className="h-3 w-3" /> BIS Certified
                </div>
                <div className="h-3 w-px bg-foreground/20" />
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] font-sans text-foreground/50">
                  <Truck className="h-3 w-3" /> Free Shipping
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
