import { Layout } from "@/components/Layout";
import { siteConfig } from "@/data/siteConfig";

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
            LAST UPDATED: [DATE]
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight">
            Exchange, Repair & Cancellation Policy
          </h1>
        </div>

        <div className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">1. Handcrafted Nature of Our Products</h2>
            <p>
              All Zevar Baksa pieces are handcrafted by Indian artisans. As a result, minor irregularities in finish, stone placement, or texture may occur. These are a natural part of the handmade process and add to each piece&apos;s individuality rather than indicating a defect. Colours may also appear slightly different on-screen compared to the physical product due to lighting and display settings.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">2. Our General Policy</h2>
            <p>
              We do not offer refunds as a default once an order is placed. Depending on the material of your piece and the nature of the issue, we offer an exchange or a credit note (redeemable only on <a href="https://www.zevarbaksa.com" className="text-zb-red hover:underline font-medium">www.zevarbaksa.com</a>) under the conditions below.
            </p>
            <p>
              In specific cases, such as silver or gold jewellery arriving broken, whether a refund, exchange, or credit note is the right resolution will be discussed directly with you on a case-by-case basis (see Section 3.2).
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl text-primary">3. Exchange & Credit Note Eligibility by Material</h2>
            
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.1 Brass Jewellery</h3>
              <p>For brass pieces, we accept exchange or credit note requests for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Size or fit issues (customer bears pickup and re-shipping charges; see Section 7)</li>
                <li>Product received damaged, broken, or defective</li>
                <li>Incorrect plating</li>
                <li>Wrong item delivered</li>
                <li>Missing parts</li>
              </ul>
              <p>
                General preference-based requests, for example simply not liking the piece once received, are not eligible for exchange or credit note.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.2 Silver & Gold Jewellery</h3>
              <p>For silver and gold pieces, exchange or credit note is offered only for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The product being received broken or damaged</li>
                <li>Incorrect plating</li>
                <li>The wrong item being delivered</li>
              </ul>
              <p>
                Preference-based requests (size, &ldquo;didn&apos;t like it,&rdquo; etc.) are not eligible for exchange on silver or gold jewellery.
              </p>
              <p>
                If a silver or gold piece arrives broken, we will discuss with you directly whether the appropriate resolution is a refund, an exchange, or a credit note, based on the specifics of the issue. Please reach out to us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline font-medium">info@zevarbaksa.com</a> with photos or video of the damage so we can assess the best path forward.
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
            <h2 className="font-display text-2xl text-primary">5. Made-to-Order and Customised Items</h2>
            <p>
              Made-to-order pieces, including customised pieces, take 20–30 days to be ready for dispatch. They are crafted specifically for you and are handled differently from ready-stock items. If you experience an issue with a made-to-order or customised piece, in any material, please reach out to us directly at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline font-medium">info@zevarbaksa.com</a> so we can discuss the appropriate resolution for your specific case.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">6. Conditions That Apply to All Exchanges</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>A product can be exchanged only once per order.</li>
              <li>The product must be unused and unworn, and returned in its original packaging with all tags and inclusions, to be eligible. Used or worn items sent for exchange will be returned without processing.</li>
              <li>We do not offer discounts on exchange orders or credit notes. Exchanges are processed at original prices.</li>
              <li>Sale and discounted items are not eligible for exchange or credit note.</li>
              <li>Exchange shipments may take longer than standard delivery timelines.</li>
              <li>A credit note, once approved, covers only the product value. Shipping charges are non-refundable, and the credit note is redeemable only on <a href="https://www.zevarbaksa.com" className="text-zb-red hover:underline font-medium">www.zevarbaksa.com</a>.</li>
              <li>We reserve the right to accept or reject any exchange or repair request at our sole discretion.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">7. Exchange Charges</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>For size or fit-related exchanges on brass jewellery, a pickup and re-shipping fee applies and is borne by the customer.</li>
              <li>For defect-related exchanges (damaged, broken, incorrect plating, wrong item, or missing parts) on any material, no exchange fee is charged. The cost is borne by us.</li>
              <li>For silver or gold items arriving broken, any applicable charges (if the resolution is an exchange or credit note rather than a refund) will be confirmed as part of the direct discussion described in Section 3.2.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">8. Repair Policy (Silver & Gold Jewellery Only)</h2>
            <p>
              We offer a repair service for silver and gold jewellery that is accidentally damaged after delivery.
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Repairs requested within 1 month of delivery are free of charge, though a pickup and re-shipping fee applies.</li>
              <li>Repairs requested after this window are subject to a pickup and re-shipping fee, plus repair charges based on actual assessment. Charges will be communicated after our team evaluates photos or video of the damage.</li>
              <li>Repair requests can only be raised within 3 months of delivery. Requests after this period cannot be accommodated.</li>
              <li>Repairs are subject to the design of the individual piece. Our team will confirm whether a specific damage is repairable once you raise a request.</li>
              <li>Brass jewellery is not eligible for repair. If a brass piece is received broken or defective, it should instead be raised as an exchange or credit note request under Section 3.1.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">9. Lost Shipments</h2>
            <p>
              If your shipment is lost in transit, we will offer a replacement or credit note after verifying the matter with our courier partner. This process may take up to 7 business days depending on the courier&apos;s response time.
            </p>
            <p>
              If a shipment is marked &ldquo;delivered&rdquo; but not received, please contact us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline font-medium">info@zevarbaksa.com</a> within 24 hours of the delivery update so we can begin an investigation promptly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">10. Steps to Raise an Exchange or Repair Request</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>For an exchange or credit note: Email us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline font-medium">info@zevarbaksa.com</a> within 7 days of delivery with your order number and a photo or video of the issue (for damage or defect claims).</li>
              <li>For a repair (silver and gold only): Email us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline font-medium">info@zevarbaksa.com</a> with your order number and photos or video of the damage.</li>
              <li>Review: Our team will review your request, confirm whether it is approved, and communicate any applicable charges.</li>
              <li>Return: The product must be securely packed in its original packaging and shipped to our address below.</li>
              <li>Charges: Pickup, reverse-pickup, and re-shipping charges (where applicable under Sections 7 and 8) are borne by the customer, except where waived under this policy.</li>
              <li>Processing: Once received, the item will undergo a quality check before the exchange or repair is processed and re-shipped.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">11. What Is Not Eligible for Exchange, Credit Note, or Repair</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Sale or promotional/discounted items</li>
              <li>General preference-based requests on brass jewellery (&ldquo;didn&apos;t like it&rdquo;)</li>
              <li>Preference-based requests on silver or gold jewellery (size, &ldquo;didn&apos;t like it&rdquo;)</li>
              <li>Used or worn products</li>
              <li>Minor colour or design variations arising from the handcrafted nature of our products or screen display differences</li>
              <li>Made-to-order and customised items are handled on a case-by-case basis (see Section 5)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">12. Order Cancellations</h2>
            <p>
              Cancellation terms for orders already placed are set out in our Terms and Conditions (Section 11). In brief, ready-stock item cancellations are accepted only before shipment, and made-to-order cancellations are subject to a partial deduction once production has begun.
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
