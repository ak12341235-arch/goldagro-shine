import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/legal-data";
import { Clause, FactTable, LegalPage } from "./LegalLayout";

const TOC = [
  { id: "a-about", label: "A1. Who we are" },
  { id: "a-users", label: "A2. Who this website is for" },
  { id: "a-info", label: "A3. Information and no offer" },
  { id: "a-inquiries", label: "A4. Inquiries" },
  { id: "a-use", label: "A5. Acceptable use" },
  { id: "a-ip", label: "A6. Intellectual property" },
  { id: "a-third", label: "A7. Third-party services" },
  { id: "a-docs", label: "A8. Registration documents" },
  { id: "a-liability", label: "A9. Disclaimers and liability" },
  { id: "a-fraud", label: "A10. Protect yourself from fraud" },
  { id: "b-quotes", label: "B1. Quotations and contracts" },
  { id: "b-prices", label: "B2. Prices and currency" },
  { id: "b-incoterms", label: "B3. Delivery terms (Incoterms)" },
  { id: "b-payment", label: "B4. Payment" },
  { id: "b-quality", label: "B5. Specifications, samples, quality" },
  { id: "b-inspection", label: "B6. Packing and inspection" },
  { id: "b-documents", label: "B7. Export documents" },
  { id: "b-shipment", label: "B8. Shipment" },
  { id: "b-risk", label: "B9. Risk and title" },
  { id: "b-claims", label: "B10. Claims, cancellation, returns" },
  { id: "b-fm", label: "B11. Force majeure" },
  { id: "b-compliance", label: "B12. Compliance and sanctions" },
  { id: "b-liability", label: "B13. Limitation of liability" },
  { id: "c-law", label: "C1. Governing law and disputes" },
  { id: "c-general", label: "C2. General" },
  { id: "c-contact", label: "C3. Contact" },
];

export function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="These terms cover (A) how you may use this website, (B) the terms on which GOLDAGRO Global Export sells goods to business buyers, and (C) the law that applies. By using this website or sending us an inquiry you accept Part A. Part B applies to a sale once a quotation or proforma invoice has been accepted, unless a signed sales contract says otherwise."
      toc={TOC}
    >
      <h2 className="mt-0">Part A. Website terms</h2>

      <Clause id="a-about" title="A1. Who we are">
        <p>
          This website is operated by {COMPANY.tradeName}, a {COMPANY.constitution.toLowerCase()}{" "}
          owned by {COMPANY.proprietor}. Full registration details are on the{" "}
          <Link to="/legal-notice">Legal Notice</Link> page.
        </p>
        <FactTable
          rows={[
            ["Trade name", COMPANY.tradeName],
            ["Proprietor", COMPANY.proprietor],
            ["GSTIN", COMPANY.gstin],
            ["Importer-Exporter Code (IEC)", COMPANY.iec],
            ["Business address", COMPANY.businessAddress],
            ["Email", COMPANY.email],
            ["Phone / WhatsApp", COMPANY.phone],
          ]}
        />
      </Clause>

      <Clause id="a-users" title="A2. Who this website is for">
        <p>
          This website is for business buyers (B2B). It is not directed at consumers. You must be at
          least 18 years old and able to enter into a binding contract on behalf of your business.
        </p>
      </Clause>

      <Clause id="a-info" title="A3. Information on this website; no offer">
        <p>
          Product names, images, grades, origins, packing, minimum order quantities, HS codes and
          other details are indicative. Product images are for illustration only. Nothing on this
          website is an offer capable of acceptance. It is an invitation to make an inquiry.
          Specifications, availability and prices are confirmed in a written quotation and proforma
          invoice for each lot or design.
        </p>
      </Clause>

      <Clause id="a-inquiries" title="A4. Inquiries">
        <p>
          The inquiry form does not send your details to our servers. It prepares a message on your
          device that opens in WhatsApp or Gmail, and the message reaches us only when you press
          Send in that app. Please give accurate and complete information. We may decline any
          inquiry. Sending an inquiry does not create a contract. See our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> for how we handle the information you
          send.
        </p>
      </Clause>

      <Clause id="a-use" title="A5. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>use the website for any unlawful, fraudulent or misleading purpose;</li>
          <li>impersonate GOLDAGRO or any person, or misrepresent your business;</li>
          <li>
            attempt to gain unauthorised access to the website, its hosting or other users, or
            interfere with its operation (including by automated scanning that degrades service);
          </li>
          <li>
            copy the website at scale, or republish its content, in a way that competes with us or
            misleads others.
          </li>
        </ul>
      </Clause>

      <Clause id="a-ip" title="A6. Intellectual property">
        <p>
          The text, logo, photographs, design and layout of this website belong to, or are used with
          permission by, {COMPANY.tradeName}. You may view and print pages to evaluate a purchase.
          You may not copy, republish, sell or otherwise use them commercially, or use our name or
          logo, without our prior written consent. Third-party names and marks (for example
          WhatsApp, Gmail, FIEO, DGFT) belong to their owners and are used only to identify them.
        </p>
      </Clause>

      <Clause id="a-third" title="A7. Third-party services and links">
        <p>
          This website uses or links to services we do not control: WhatsApp (Meta), Gmail (Google),
          Google Fonts, and our hosting provider (Netlify). Their own terms and privacy policies
          apply when you use them. We are not responsible for their content or availability.
        </p>
      </Clause>

      <Clause id="a-docs" title="A8. Registration documents shown on this website">
        <ul>
          <li>
            Copies of our GST, IEC, RCMC and other documents are shown so buyers can carry out due
            diligence. Some personal details may be removed from the public copies.
          </li>
          <li>
            Always confirm a registration with the issuing authority (see the{" "}
            <Link to="/legal-notice">Legal Notice</Link> page). Registrations expire or change; the
            authority&apos;s record prevails over any copy here.
          </li>
          <li>
            You may not copy, alter or reuse these documents for any purpose other than verifying
            our business. We will supply a verified copy on request.
          </li>
        </ul>
      </Clause>

      <Clause id="a-liability" title="A9. Disclaimers and limitation of liability (website)">
        <p>
          The website is provided &quot;as is&quot;. We try to keep it accurate and available but
          do not promise that it will be error-free or uninterrupted. To the extent permitted by
          law, we are not liable for any indirect or consequential loss arising from your use of
          the website. Nothing in these terms excludes liability that cannot be excluded by law,
          including liability for fraud. See also the <Link to="/disclaimer">Disclaimer</Link>.
        </p>
      </Clause>

      <Clause id="a-fraud" title="A10. Protect yourself from fraud">
        <p>
          Business email compromise and fake exporter scams are common in international trade.
          Please:
        </p>
        <ul>
          <li>
            deal only through the email address and WhatsApp / phone number published on this
            website;
          </li>
          <li>
            before you make a first payment, confirm our bank details by speaking to us on the
            phone number published here. Do not rely on bank details that arrive only by email or
            chat from an unknown sender or a different email domain;
          </li>
          <li>
            treat any change of bank account, or any message from a different number or email
            domain claiming to be us, as suspicious, and tell us immediately.
          </li>
        </ul>
      </Clause>

      <h2 className="mt-16">Part B. Terms of sale (export of goods)</h2>

      <Clause id="b-quotes" title="B1. Quotations and contracts">
        <p>
          A quotation is an invitation to deal and is valid only for the period stated in it. A
          contract for the sale of goods is formed only when both parties have confirmed a proforma
          invoice or sales contract in writing (email is sufficient) and, where the payment terms
          require an advance, the advance has been received. The accepted proforma invoice or
          contract, together with these terms and our{" "}
          <Link to="/shipping-and-claims">Shipping, Cancellation and Claims Policy</Link>, is the
          entire agreement for that sale. If they conflict, the signed contract prevails.
        </p>
      </Clause>

      <Clause id="b-prices" title="B2. Prices and currency">
        <p>
          Prices are quoted in the currency and per unit stated in the quotation. Unless the
          quotation says otherwise, prices do not include: destination port and handling charges,
          import duties and taxes, bank charges outside India, insurance (under FOB), or
          independent inspection requested by the buyer.
        </p>
      </Clause>

      <Clause id="b-incoterms" title="B3. Delivery terms (Incoterms)">
        <p>
          We sell on FOB Mumbai (JNPT) or CIF (named destination port) terms as stated in the
          quotation, interpreted under Incoterms&reg; 2020 published by the International Chamber of
          Commerce. The port of loading is {COMPANY.portOfLoading}.
        </p>
      </Clause>

      <Clause id="b-payment" title="B4. Payment">
        <p>
          Payment is by telegraphic transfer (T/T), normally an advance with the balance against
          documents, or by letter of credit (L/C) at sight, as stated in the proforma invoice.
        </p>
        <ul>
          <li>
            A letter of credit should be irrevocable, issued or confirmed by a bank acceptable to
            us, and consistent with the contract. All bank charges outside India are for the
            buyer&apos;s account.
          </li>
          <li>Payments must be made in full, without set-off or deduction, by the due date.</li>
          <li>
            We may delay shipment, or withhold shipping documents, until payment due has been
            received.
          </li>
        </ul>
      </Clause>

      <Clause id="b-quality" title="B5. Specifications, samples and quality">
        <p>
          The specification for a sale is the one stated in the accepted proforma invoice or
          contract. Agricultural goods are natural products: appearance, size and moisture vary by
          season and lot, and trade-customary tolerances apply. Samples are sent by courier at the
          buyer&apos;s cost. A sample shows the quality we offer, but is not a guarantee that the
          bulk shipment will be identical unless we have agreed this in writing.
        </p>
      </Clause>

      <Clause id="b-inspection" title="B6. Packing and inspection">
        <p>
          Goods are packed as agreed in the contract. The buyer may appoint an independent
          inspection agency, at the buyer&apos;s cost, to inspect before loading. The inspection
          report issued at loading is the basis for deciding the quality and quantity of the goods
          at loading.
        </p>
      </Clause>

      <Clause id="b-documents" title="B7. Export documents">
        <p>
          We provide the commercial invoice, packing list, bill of lading and certificate of origin
          and, for agricultural goods, a phytosanitary certificate issued per shipment. Lab reports
          are available on request. The buyer must tell us in advance about any other document,
          certificate, test, labelling or marking that the importing country requires.
        </p>
      </Clause>

      <Clause id="b-shipment" title="B8. Shipment">
        <p>
          Loading and shipment dates are estimates that depend on product availability, container
          and vessel space, port and customs processing, weather and other factors outside our
          control. Partial shipments and transhipment are permitted unless the contract says
          otherwise.
        </p>
      </Clause>

      <Clause id="b-risk" title="B9. Risk and title">
        <p>
          Risk passes to the buyer as set out in the agreed Incoterm: under FOB, when the goods are
          on board the vessel at the port of loading; under CIF, also when the goods are on board at
          the port of loading, and we then procure marine insurance for the buyer&apos;s benefit at
          the minimum cover required by Incoterms 2020 (Institute Cargo Clauses (C)) unless a wider
          cover is agreed in writing. Title to the goods passes to the buyer when we have received
          full payment.
        </p>
      </Clause>

      <Clause id="b-claims" title="B10. Claims, cancellation and returns">
        <p>
          Quality and quantity claims, cancellation of orders and returns are governed by our{" "}
          <Link to="/shipping-and-claims">Shipping, Cancellation and Claims Policy</Link>, which
          forms part of these terms.
        </p>
      </Clause>

      <Clause id="b-fm" title="B11. Force majeure">
        <p>
          Neither party is liable for delay or failure to perform caused by events beyond its
          reasonable control, including natural disasters, crop failure or adverse weather, fire,
          epidemic, war, strikes, port or vessel disruption, government action, export or import
          restrictions and sanctions. The affected party must notify the other promptly. If the
          event continues for more than 60 days, either party may cancel the undelivered part of
          the order by written notice, and amounts already paid for goods not shipped will be
          refunded after deducting costs we have already incurred for that order.
        </p>
      </Clause>

      <Clause id="b-compliance" title="B12. Compliance, sanctions and destination rules">
        <ul>
          <li>
            The buyer confirms that it will not use or resell the goods in breach of Indian or
            applicable international export-control, sanctions or anti-corruption laws, and that it
            is not a sanctioned person. We may refuse or suspend any transaction that would breach
            these laws.
          </li>
          <li>
            The buyer is responsible for import licences, permits, duties and taxes and for
            compliance with the laws of the destination country, including food-safety, labelling
            and plant-health rules for agricultural goods and product-safety or restricted-substance
            rules for jewellery.
          </li>
        </ul>
      </Clause>

      <Clause id="b-liability" title="B13. Limitation of liability (sales)">
        <p>
          To the extent permitted by law, our total liability arising out of a sale is limited to
          the invoice value of the goods affected, and we are not liable for loss of profit,
          business, or goodwill or for any indirect or consequential loss. Nothing excludes
          liability that cannot be excluded by law, including liability for fraud.
        </p>
      </Clause>

      <h2 className="mt-16">Part C. Law and general terms</h2>

      <Clause id="c-law" title="C1. Governing law and disputes">
        <p>
          These terms and every sale are governed by the laws of India. The parties will first try
          to resolve any dispute by good-faith negotiation for 30 days after one party gives the
          other written notice of it. If the dispute is not resolved, the courts at{" "}
          {COMPANY.jurisdiction} have exclusive jurisdiction, unless the signed sales contract
          provides for arbitration (for example under the Arbitration and Conciliation Act, 1996),
          in which case the contract names the seat and rules.
        </p>
      </Clause>

      <Clause id="c-general" title="C2. General">
        <ul>
          <li>
            We may update these terms from time to time. The version dated at the top of this page
            applies to your use of the website. A sale is governed by the terms in force when the
            proforma invoice or contract was accepted.
          </li>
          <li>
            If any part of these terms is found unenforceable, the rest remains in effect. A delay
            in enforcing a right is not a waiver of it.
          </li>
          <li>
            Neither party may assign its rights under a sale without the other&apos;s written
            consent. No one other than the parties has any right to enforce these terms.
          </li>
          <li>
            Notices may be given by email to the addresses used in the transaction. The English
            version of these terms prevails over any translation.
          </li>
        </ul>
      </Clause>

      <Clause id="c-contact" title="C3. Contact">
        <p>
          Questions about these terms: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or{" "}
          {COMPANY.phone}. {COMPANY.businessAddress}.
        </p>
      </Clause>
    </LegalPage>
  );
}
