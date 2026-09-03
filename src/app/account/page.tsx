"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Package,
  LogOut,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { supabaseAnon, type Order } from "@/lib/supabase";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Redirect if not authenticated (middleware handles this, but belt + suspenders)
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  // Fetch orders for this customer
  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabaseAnon
          .from("orders")
          .select("*")
          .eq("customer_email", email)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setOrders(data as Order[]);
        }
      } catch {
        // Supabase might be placeholder — show empty state gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.primaryEmailAddress?.emailAddress]);

  if (!isLoaded) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? "";
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-28 md:pt-36 pb-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-sans font-semibold mb-2">
                Your Atelier
              </p>
              <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[0.95]">
                Account
              </h1>
            </div>
            {/* Avatar */}
            <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-2">
              <span className="font-display text-xl text-primary">{initials}</span>
            </div>
          </div>

          {/* ── Account info ───────────────────────────────────────── */}
          <div className="bg-secondary/30 border border-border/60 rounded-2xl p-6 mb-10 flex items-center gap-5">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-primary stroke-[1.3]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-sans mb-1">
                Signed in as
              </p>
              <p className="text-sm font-sans text-foreground truncate">{email}</p>
            </div>
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 text-[10px] uppercase tracking-[0.2em] font-sans text-foreground/50 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>

          {/* ── Orders ─────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-sans font-semibold">
                Order History
              </p>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-foreground/30 font-sans">
                <Package className="h-3.5 w-3.5" />
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center py-16 gap-3">
                <div className="h-7 w-7 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <p className="text-xs text-foreground/30 font-sans">Loading orders...</p>
              </div>
            )}

            {/* Empty state */}
            {!loading && orders.length === 0 && (
              <div className="flex flex-col items-center py-20 gap-5 text-center bg-secondary/20 rounded-2xl border border-border/40">
                <div className="h-16 w-16 rounded-full bg-secondary/60 flex items-center justify-center">
                  <ShoppingBag className="h-7 w-7 text-foreground/20 stroke-[1.2]" />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/40 font-sans">
                    No orders yet
                  </p>
                  <p className="text-sm text-foreground/40 font-sans max-w-[240px]">
                    Your heirloom pieces will appear here after your first purchase.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="mt-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-[#5C0A19] transition-all duration-300 shadow-md"
                >
                  Explore Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {/* Orders list */}
            {!loading && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order) => {
                  const isExpanded = expandedOrder === order.id;
                  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
                    paid: { label: "Paid", color: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30", icon: CheckCircle2 },
                    pending: { label: "Pending", color: "text-amber-400 bg-amber-950/60 border-amber-500/30", icon: Clock },
                    cod_pending: { label: "COD — Awaiting Delivery", color: "text-amber-400 bg-amber-950/60 border-amber-500/30", icon: Clock },
                    failed: { label: "Failed", color: "text-red-400 bg-red-950/60 border-red-500/30", icon: AlertCircle },
                  };
                  const s = statusConfig[order.status] ?? statusConfig.pending;
                  const StatusIcon = s.icon;
                  const shortId = order.razorpay_order_id?.replace("order_", "").slice(0, 12).toUpperCase() ?? order.id.slice(0, 8).toUpperCase();
                  const items = Array.isArray(order.items) ? order.items : [];
                  const amountINR = Math.round(order.amount / 100);

                  return (
                    <div
                      key={order.id}
                      className="bg-background border border-border/60 rounded-2xl overflow-hidden"
                    >
                      {/* Order header */}
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-secondary/20 transition-colors"
                      >
                        <Sparkles className="h-4 w-4 text-primary/50 flex-shrink-0 stroke-[1.3]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-display text-foreground">
                            #ZB-{shortId}
                          </p>
                          <p className="text-[10px] text-foreground/40 font-sans mt-0.5">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                            {" · "}
                            {items.length} piece{items.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] uppercase tracking-[0.15em] font-sans font-semibold flex-shrink-0 ${s.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {s.label}
                        </span>
                        <p className="font-display text-lg text-primary flex-shrink-0 ml-2">
                          ₹{amountINR.toLocaleString("en-IN")}
                        </p>
                        {isExpanded
                          ? <ChevronUp className="h-4 w-4 text-foreground/30 flex-shrink-0" />
                          : <ChevronDown className="h-4 w-4 text-foreground/30 flex-shrink-0" />
                        }
                      </button>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-border/40 pt-5 space-y-4">
                          {/* Items */}
                          {items.length > 0 && (
                            <div className="space-y-3">
                              {items.map((item: { name?: string; size_preference?: string; quantity?: number; price?: number }, i: number) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                  <div>
                                    <p className="font-display text-foreground">{item.name}</p>
                                    <p className="text-[10px] text-foreground/40 font-sans uppercase tracking-[0.1em] mt-0.5">
                                      {item.size_preference ?? "Standard"} · Qty {item.quantity ?? 1}
                                    </p>
                                  </div>
                                  <p className="font-sans font-semibold text-foreground/80">
                                    ₹{((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString("en-IN")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Payment method */}
                          <div className="pt-4 border-t border-border/30 flex justify-between text-[11px] font-sans uppercase tracking-[0.15em]">
                            <span className="text-foreground/40">Payment Method</span>
                            <span className="text-foreground/60 capitalize">{order.payment_method}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
