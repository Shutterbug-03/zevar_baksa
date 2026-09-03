import { Layout } from "@/components/Layout";

export const metadata = {
  title: "Exchange, Repair & Cancellation Policy — Zevar Baksa",
  description: "Our policies for exchanges, repairs, and order cancellations.",
};

export default function ExchangePolicy() {
  return (
    <Layout>
      <section className="pt-32 pb-24 mx-auto max-w-[800px] px-6 md:px-12 text-left font-sans text-foreground/80 font-light leading-relaxed">
        
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zb-red font-semibold mb-4">
            Last updated: [DATE]
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight">
            Exchange, Repair & Cancellation Policy
          </h1>
        </div>

        <div className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">1. Handcrafted Nature of Our Products</h2>
            <p>
              All Zevar Baksa pieces are handcrafted by Indian artisans. As a result, minor irregularities in finish, stone placement, or texture may occur — these are a natural part of the handmade process and add to each piece's individuality rather than indicating a defect. Colors may also appear slightly different on-screen compared to the physical product due to lighting and display settings.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">2. Our General Policy</h2>
            <p>
              We do not offer refunds as a default once an order is placed. Depending on the material of your piece and the nature of the issue, we offer exchange or a credit note (redeemable only on <a href="https://www.zevarbaksa.com" className="text-zb-red hover:underline">www.zevarbaksa.com</a>) under the conditions below.
            </p>
            <p>
              In specific cases — such as silver or gold jewelry arriving broken — whether a refund, exchange, or credit note is the right resolution will be discussed directly with you on a case-by-case basis (see Section 3.2).
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl text-primary">3. Exchange & Credit Note Eligibility by Material</h2>
            
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.1 Brass Jewelry</h3>
              <p>For brass pieces, we accept exchange or credit note requests for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Size or fit issues (customer bears pickup and re-shipping charges — see Section 7);</li>
                <li>Product received damaged, broken, or defective;</li>
                <li>Wrong item delivered;</li>
                <li>Missing parts.</li>
              </ul>
              <p>
                General preference-based requests — for example, simply not liking the piece once received — are not eligible for exchange or credit note.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.2 Silver & Gold Jewelry</h3>
              <p>For silver and gold pieces, exchange or credit note is offered only for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The product being received broken or damaged;</li>
                <li>The wrong item being delivered.</li>
              </ul>
              <p>
                Preference-based requests (size, "didn't like it," etc.) are not eligible for exchange on silver or gold jewelry.
              </p>
              <p>
                If a silver or gold piece arrives broken, we will discuss with you directly whether the appropriate resolution is a refund, an exchange, or a credit note, based on the specifics of the issue. Please reach out to us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a> with photos or video of the damage so we can assess the best path forward.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">4. Exchange Window</h2>
            <p>
              All exchange and credit note requests must be raised within 7 days of delivery. Requests made after this window will not be entertained.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">5. Made-to-Order Items</h2>
            <p>
              Made-to-order pieces (15–20 day production time) are crafted specifically for you and are handled differently from ready-stock items. If you experience an issue with a made-to-order piece — in any material — please reach out to us directly at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a> so we can discuss the appropriate resolution for your specific case.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">6. Conditions That Apply to All Exchanges</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>A product can be exchanged only once per order.</li>
              <li>The product must be unused and unopened, in its original packaging, to be eligible. Used or opened items sent for exchange will be returned without processing.</li>
              <li>We do not offer discounts on exchange orders or credit notes — exchanges are processed at original prices.</li>
              <li>Sale and discounted items are not eligible for exchange or credit note.</li>
              <li>International orders are not currently eligible for exchange, as we ship domestically only at this time. This will be revisited once international shipping is introduced.</li>
              <li>Exchange shipments may take longer than standard delivery timelines.</li>
              <li>A credit note, once approved, covers only the product value — shipping charges are non-refundable, and the credit note is redeemable only on <a href="https://www.zevarbaksa.com" className="text-zb-red hover:underline">www.zevarbaksa.com</a>.</li>
              <li>We reserve the right to accept or reject any exchange or repair request at our sole discretion.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">7. Exchange Charges</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>For size or fit-related exchanges on brass jewelry, a pickup and re-shipping fee of ₹[X] (domestic) applies and is borne by the customer.</li>
              <li>For defect-related exchanges (damaged, broken, wrong item, or missing parts) on any material, no exchange fee is charged — the cost is borne by us.</li>
              <li>For silver/gold items arriving broken, any applicable charges (if the resolution is an exchange or credit note rather than a refund) will be confirmed as part of the direct discussion described in Section 3.2.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">8. Repair Policy (Silver & Gold Jewelry Only)</h2>
            <p>
              We offer a repair service for silver and gold jewelry that is accidentally damaged after delivery.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Repairs requested within [X] [days/months] of delivery are free of charge, though a pickup and re-shipping fee of ₹[X] applies.</li>
              <li>Repairs requested after this window are subject to a pickup and re-shipping fee of ₹[X], plus repair charges based on actual assessment. Charges will be communicated after our team evaluates photos or video of the damage.</li>
              <li>Repair requests can only be raised within [X] months of delivery; requests after this period cannot be accommodated.</li>
              <li>Repairs are subject to the design of the individual piece — our team will confirm whether a specific damage is repairable once you raise a request.</li>
            </ul>
            <p className="mt-4 font-medium text-primary">Brass jewelry is not eligible for repair.</p>
            <p>
              If a brass piece is received broken or becomes defective, it should instead be raised as an exchange or credit note request under Section 3.1.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">9. Lost Shipments</h2>
            <p>
              If your shipment is lost in transit, we will offer a replacement or credit note after verifying the matter with our courier partner. This process may take up to 7 business days depending on the courier's response time.
            </p>
            <p>
              If a shipment is marked "delivered" but not received, please contact us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a> within 24 hours of the delivery update so we can begin an investigation promptly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">10. Steps to Raise an Exchange or Repair Request</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>For exchange or credit note: Email us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a> within 7 days of delivery with your order number and a photo/video of the issue (for damage/defect claims).</li>
              <li>For repair (silver/gold only): Email us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a> with your order number and photos or video of the damage.</li>
              <li>Our team will review your request and confirm whether it is approved, and communicate any applicable charges.</li>
              <li>The product must be securely packed in its original packaging and shipped to our address below.</li>
              <li>Pickup, reverse-pickup, and re-shipping charges (where applicable per Sections 7 and 8) are borne by the customer, except where waived under this policy.</li>
              <li>Once received, the item will undergo a quality check before the exchange or repair is processed and re-shipped.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">11. What Is Not Eligible for Exchange, Credit Note, or Repair</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Sale or promotional/discounted items;</li>
              <li>General preference-based requests on brass jewelry ("didn't like it");</li>
              <li>Preference-based requests on silver or gold jewelry (size, "didn't like it");</li>
              <li>Used, worn, or opened products;</li>
              <li>Minor color or design variations arising from the handcrafted nature of our products or screen display differences;</li>
              <li>International orders (for now).</li>
            </ul>
            <p className="mt-4">
              Made-to-order items are handled on a case-by-case basis — see Section 5.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">12. Order Cancellations</h2>
            <p>
              Cancellation terms for orders already placed are set out in our Terms and Conditions (Section 11) — in brief: ready-stock item cancellations are accepted only before shipment, and made-to-order cancellations are subject to a partial deduction once production has begun.
            </p>
          </div>

          <div className="space-y-4 border-t border-primary/10 pt-10 mt-12">
            <h2 className="font-display text-2xl text-primary">13. Contact & Shipping Address</h2>
            <p>
              For any exchange, repair, or cancellation queries, reach out to us at:
            </p>
            <address className="not-italic space-y-1 mt-4 text-sm bg-muted/40 p-6 rounded-lg border border-primary/10">
              <strong className="block text-primary font-serif-brand text-lg mb-2">ZevarBaksa LLP</strong>
              <span className="block">B-21, Bhan Nagar, Queens Road</span>
              <span className="block">Vaishali Nagar, Jaipur</span>
              <span className="block">Rajasthan, 302021</span>
              <div className="mt-4">
                <span className="block">Email: <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a></span>
                <span className="block text-primary/60 text-xs mt-1">WhatsApp: [to be added]</span>
              </div>
            </address>
          </div>

        </div>
      </section>
    </Layout>
  );
}
