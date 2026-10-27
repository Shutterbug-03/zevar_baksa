import { Layout } from "@/components/Layout";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Shipping Policy — Zevar Baksa",
  description: "Shipping and dispatch information for Zevar Baksa orders.",
};

export default function ShippingPolicy() {
  return (
    <Layout>
      <section className="pt-32 pb-24 mx-auto max-w-[800px] px-6 md:px-12 text-left font-sans text-foreground/80 font-light leading-relaxed">
        
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zb-red font-semibold mb-4">
            [DATE] — Updated Policy
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight">
            Shipping Policy
          </h1>
        </div>

        <div className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">1. Where We Ship</h2>
            <p>
              At this time, ZevarBaksa LLP ships within India only. International shipping is not currently available but is planned for the future; this page will be updated once it launches.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">2. Shipping Charges</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Free shipping on all prepaid orders above ₹15,000.</li>
              <li>For orders below this amount, a shipping fee applies, calculated at checkout.</li>
              <li>All prices listed on the Site are inclusive of applicable GST.</li>
              <li>Since we currently accept online payment only (via Razorpay), all orders are prepaid; Cash on Delivery is not available.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">3. Order Processing and Dispatch</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Every piece goes through a quality control check before it leaves us.</li>
              <li>Ready-stock items are dispatched within 5–7 business days of order confirmation, once they have passed quality control.</li>
              <li>Made-to-order items, including customised pieces, are handcrafted specifically for you and take 20–30 days to be ready for dispatch, depending on the complexity of the design. We will share the exact timeline for your piece once your order is placed.</li>
              <li>You will receive an email confirmation as soon as your order is placed, and another notification once your order has been dispatched, along with tracking information.</li>
              <li>We work with reputable, reliable courier partners to deliver your order safely. Delivery timelines after dispatch will vary depending on your location and will be visible via the tracking details shared with you.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">4. Delivery</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Deliveries are made on business days, excluding public holidays.</li>
              <li>Please ensure your phone number and email address are correct and up to date at checkout, so our courier partner can reach you if needed.</li>
              <li>If a package cannot be delivered due to the recipient being unavailable, a re-delivery attempt will be made; repeated failed attempts may result in additional charges, which will be communicated to you.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">5. Address Changes</h2>
            <p>
              Requests to change the delivery address can only be accommodated if the order has not yet been dispatched. Once an order has been shipped, we are unable to modify the delivery address. Please contact us as soon as possible at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline font-medium">info@zevarbaksa.com</a> if you need to update your address.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">6. Tracking Your Order</h2>
            <p>
              Once your order is dispatched, you will receive an email with your tracking details. While we make every effort to ensure timely delivery, we are not responsible for delays caused by natural disasters, courier disruptions, or other circumstances beyond our reasonable control.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">7. Remote Areas</h2>
            <p>
              If your delivery pin code falls within a remote or difficult-to-service area, delivery timelines and shipping charges may vary. We will inform you if this applies to your order.
            </p>
          </div>

          <div className="space-y-4 border-t border-primary/10 pt-10 mt-12">
            <h2 className="font-display text-2xl text-primary">8. Contact Us</h2>
            <p>
              For any questions or assistance regarding shipping or dispatch, please reach out to us at:
            </p>
            <address className="not-italic space-y-1 mt-4 text-sm bg-muted/40 p-6 rounded-lg border border-primary/10">
              <strong className="block text-primary font-serif-brand text-lg mb-2">ZevarBaksa LLP</strong>
              <span className="block">B-21, Bhan Nagar, Queens Road</span>
              <span className="block">Vaishali Nagar, Jaipur</span>
              <span className="block">Rajasthan – 302021</span>
              <div className="mt-4">
                <span className="block">Email: <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a></span>
                {siteConfig.phone && <span className="block">Phone: {siteConfig.phone}</span>}
                {siteConfig.whatsapp && <span className="block">WhatsApp: +{siteConfig.whatsapp}</span>}
              </div>
            </address>
          </div>

        </div>
      </section>
    </Layout>
  );
}
