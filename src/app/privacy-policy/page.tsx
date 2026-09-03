import { Layout } from "@/components/Layout";

export const metadata = {
  title: "Privacy Policy — Zevar Baksa",
  description: "How we collect, use, and protect your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="pt-32 pb-24 mx-auto max-w-[800px] px-6 md:px-12 text-left font-sans text-foreground/80 font-light leading-relaxed">
        
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zb-red font-semibold mb-4">
            Last updated: [DATE]
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-12">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">1. Introduction</h2>
            <p>
              ZevarBaksa LLP (“we,” “us,” “our,” or “Zevar Baksa”) respects your privacy and is committed to protecting the personal data you share with us when you visit or use www.zevarbaksa.com (“Site”).
            </p>
            <p>
              This Privacy Policy explains what personal data we collect, how we use it, who we share it with, and the choices and rights available to you. It is published in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (“DPDP Act”).
            </p>
            <p>
              By using the Site, you agree to the collection and use of information in accordance with this Privacy Policy. We may update this policy from time to time; the “Last updated” date above reflects the most recent revision, and material changes will be notified via a prominent notice on the Site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">2. Who We Are</h2>
            <p>
              ZevarBaksa LLP, a limited liability partnership registered in India, with its registered office at B-21, Bhan Nagar, Queens Road, Vaishali Nagar, Jaipur, Rajasthan, 302021, is the entity responsible for processing your personal data as described in this policy (“Data Fiduciary” under the DPDP Act).
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl text-primary">3. Information We Collect</h2>
            
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.1 Information You Provide Directly</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contact information (name, email address, phone number, delivery and billing address);</li>
                <li>Account credentials (username and password, if you create an account);</li>
                <li>Order and transaction details (products purchased, order history, payment confirmation — see Section 3.3 on payments);</li>
                <li>Customer service correspondence (queries, complaints, feedback);</li>
                <li>Content you submit voluntarily (e.g. reviews, photos tagged to us on social media).</li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.2 Information Collected Automatically</h3>
              <p>
                When you visit the Site, we automatically collect certain information via cookies and similar technologies, including your IP address, browser type, device information, pages visited, time and date of visit, and referring URLs. See Section 5 (Cookies and Analytics) for details.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.3 Payment Information</h3>
              <p>
                Payments on the Site are processed exclusively through Razorpay, our third-party payment gateway. We do not collect or store your full card, UPI, or net-banking credentials on our own servers — these are handled directly by Razorpay in accordance with its own security standards and privacy policy, which we encourage you to review separately.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.4 Account and Social Login</h3>
              <p>
                If you choose to create an account on the Site, you may sign up using your email address or via third-party social login (e.g. Google). If you use social login, we receive basic profile information (such as your name and email address) from that provider, as permitted by your settings with that provider.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">3.5 Information We Do Not Knowingly Collect</h3>
              <p>
                Our Site is not directed at children under 18. We do not knowingly collect personal data from anyone under 18 without verifiable parental consent, in line with the DPDP Act's requirements for processing children's data. If you believe a child has provided us with personal data, please contact us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a> so we can take appropriate action.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">4. How We Use Your Information</h2>
            <p>We use the personal data we collect to:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Process and fulfil your orders, including made-to-order and ready-stock items;</li>
              <li>Create and manage your account;</li>
              <li>Communicate with you about your orders, account, and customer service queries;</li>
              <li>Send you promotional and marketing communications — including new collection launches, offers, and updates — via email, SMS, and WhatsApp, where you have not opted out;</li>
              <li>Run and measure advertising, including retargeting ads on platforms such as Instagram, Facebook, and Google, to show you products relevant to your browsing on our Site;</li>
              <li>Analyze and improve the Site's performance and your experience, using Google Analytics (see Section 5);</li>
              <li>Detect, prevent, and investigate fraud or unlawful activity;</li>
              <li>Comply with applicable legal and regulatory requirements.</li>
            </ul>
            <p>
              Where required under the DPDP Act, we will seek your consent before processing your personal data for a specified purpose, and you may withdraw that consent at any time (see Section 8).
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl text-primary">5. Cookies, Analytics, and Retargeting</h2>
            
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-primary/80 font-medium">5.1 Cookies</h3>
              <p>
                We use cookies and similar tracking technologies (web beacons, pixels) to operate the Site, remember your preferences, and understand how visitors use the Site. You can control or disable cookies through your browser settings, though some features of the Site may not function properly without them.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">5.2 Google Analytics</h3>
              <p>
                We use Google Analytics to understand how visitors interact with our Site — such as pages visited, time spent, and navigation patterns — so we can improve the Site's content and performance. Google Analytics collects information through cookies and similar technologies. You can learn more about how Google collects and processes this data at Google's own privacy policy, and you may opt out of Google Analytics tracking using the Google Analytics Opt-out Browser Add-on.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">5.3 Retargeting and Interest-Based Advertising</h3>
              <p>
                We work with third-party advertising platforms (including Meta/Instagram/Facebook and Google Ads) to show you ads for our products based on your visits to our Site. These platforms may use cookies and similar technologies to recognize your browser or device across websites. We do not control the privacy practices of these third-party platforms and encourage you to review their respective privacy policies.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl text-primary/80 font-medium">5.4 Do Not Track</h3>
              <p>
                Our Site is not currently designed to respond to “Do Not Track” browser signals, as there is no common industry standard for how such signals should be interpreted.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">6. How We Share Your Information</h2>
            <p>We do not sell your personal data. We may share it only in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Service providers acting on our behalf</strong>, strictly to perform functions for us — this includes Razorpay (payments), courier/logistics partners (order delivery), and Google (analytics). These providers are only permitted to use your data to perform the specific service requested and not for their own independent purposes.</li>
              <li><strong>Legal and safety reasons</strong> — where required by law, court order, or government request, or where we believe disclosure is necessary to protect our rights, prevent fraud, or protect the safety of any person.</li>
              <li><strong>Business transfers</strong> — if ZevarBaksa LLP is involved in a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction, subject to confidentiality protections.</li>
            </ul>
            <p>
              We do not share customer data with our artisan or manufacturing partners. Customer personal data is used only for order fulfilment and communication purposes within the company and stays internal to ZevarBaksa LLP and the limited service providers listed above.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">7. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes described in this policy, including to provide our services, comply with legal and tax obligations, resolve disputes, and enforce our agreements. When data is no longer needed for these purposes, we take steps to delete or anonymize it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">8. Your Rights</h2>
            <p>Under the DPDP Act and other applicable law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>Access the personal data we hold about you;</li>
              <li>Correct or update inaccurate or incomplete data;</li>
              <li>Withdraw consent you previously gave for a specific processing purpose, at any time;</li>
              <li>Request erasure of your personal data, subject to our legal obligations to retain certain records;</li>
              <li>Nominate another individual to exercise your rights on your behalf in the event of your death or incapacity, as provided under the DPDP Act;</li>
              <li>Opt out of promotional emails, SMS, or WhatsApp messages at any time by contacting us or using the unsubscribe option in the communication itself;</li>
              <li>Grievance redressal — raise a complaint about how we handle your personal data (see Section 11).</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a>. We will respond within a reasonable timeframe as required by applicable law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">9. Data Security</h2>
            <p>
              We maintain reasonable administrative, technical, and physical safeguards designed to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">10. Data Transfers</h2>
            <p>
              Some of our service providers (such as Google Analytics and advertising platforms) may process data outside India. Where this occurs, we take reasonable steps to ensure your data continues to be protected consistently with this Privacy Policy and applicable law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">11. Grievance Officer</h2>
            <p>
              In accordance with the Information Technology Act, 2000 and the DPDP Act, if you have any grievance regarding the processing of your personal data, please contact:
            </p>
            <address className="not-italic space-y-1 mt-4 text-sm bg-muted/40 p-6 rounded-lg border border-primary/10">
              <strong className="block text-primary font-serif-brand text-lg mb-2">Grievance Officer</strong>
              <span className="block font-medium">ZevarBaksa LLP</span>
              <span className="block">B-21, Bhan Nagar, Queens Road</span>
              <span className="block">Vaishali Nagar, Jaipur</span>
              <span className="block">Rajasthan, 302021</span>
              <div className="mt-4">
                <span className="block">Email: <a href="mailto:info@zevarbaksa.com" className="text-zb-red hover:underline">info@zevarbaksa.com</a></span>
                <span className="block text-primary/60 text-xs mt-1">WhatsApp: [to be added]</span>
              </div>
            </address>
            <p className="text-xs text-primary/60 italic">
              (Note: under the DPDP Act, you should name a specific individual as Grievance Officer — e.g. "Kanishk Deora, Grievance Officer" — once decided.)
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">12. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites or services not operated by us. We are not responsible for the privacy practices or content of such third-party sites. We encourage you to review their privacy policies before providing any personal data.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-primary">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the revised policy on this page with an updated "Last updated" date, and for significant changes, we will provide additional notice where appropriate.
            </p>
          </div>

          <div className="space-y-4 border-t border-primary/10 pt-10 mt-12">
            <h2 className="font-display text-2xl text-primary">14. Contact Us</h2>
            <p>
              If you have questions, comments, or requests regarding this Privacy Policy or your personal data, please contact us at:
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
