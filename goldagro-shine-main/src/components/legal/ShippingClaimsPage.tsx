import { Link } from "@tanstack/react-router";
import { COMPANY, FILL_IN } from "@/lib/legal-data";
import { Clause, Fill, LegalPage } from "./LegalLayout";

const TOC = [
  { id: "s-shipping", label: "1. Shipping and delivery" },
  { id: "s-docs", label: "2. Documents and customs" },
  { id: "s-insurance", label: "3. Insurance" },
  { id: "s-cancel", label: "4. Cancellation and changes" },
  { id: "s-claims", label: "5. Quality and quantity claims" },
  { id: "s-returns", label: "6. Returns" },
  { id: "s-refunds", label: "7. Refunds" },
  { id: "s-contact", label: "8. How to contact us" },
];

export function ShippingClaimsPage() {
  return (
    <LegalPage
      title="Shipping, Cancellation and Claims Policy"
      intro="This policy explains how goods are shipped, what happens if an order is cancelled, and how to raise a claim. It forms part of our Terms and Conditions (Part B) and applies to every sale unless a signed sales contract says otherwise."
      toc={TOC}
    >
      <Clause id="s-shipping" title="1. Shipping and delivery">
        <ul>
          <li>
            Goods are shipped in containers by sea from {COMPANY.portOfLoading}. Agricultural goods
            that need it are shipped in temperature-managed (reefer) containers.
          </li>
          <li>
            Delivery terms are FOB Mumbai (JNPT) or CIF to a named destination port, as stated in
            your quotation (Incoterms&reg; 2020).
          </li>
          <li>
            The loading time is confirmed in your quotation. Sea transit time depends on the
            destination port, the shipping line and the route. All dates are estimates and are not
            a guarantee.
          </li>
          <li>
            Delays caused by vessel schedules, port congestion, customs, weather or other events
            outside our control are not a breach of contract (see Force majeure in the{" "}
            <Link to="/terms">Terms</Link>).
          </li>
        </ul>
      </Clause>

      <Clause id="s-docs" title="2. Documents and customs">
        <p>
          We complete export clearance in India and send the shipping documents agreed in the
          contract (commercial invoice, packing list, bill of lading, certificate of origin and,
          for agricultural goods, a phytosanitary certificate). The buyer is responsible for
          import clearance, permits, duties and taxes at the destination, and must tell us before
          shipment about any additional document or certificate the importing country requires.
        </p>
      </Clause>

      <Clause id="s-insurance" title="3. Insurance">
        <p>
          Under CIF terms we arrange marine insurance for the buyer&apos;s benefit at the minimum
          cover required by Incoterms 2020, unless a wider cover is agreed in writing. Under FOB
          terms the buyer arranges insurance from the time the goods are on board. We recommend
          insuring all shipments.
        </p>
      </Clause>

      <Clause id="s-cancel" title="4. Cancellation and changes">
        <ul>
          <li>
            Before a proforma invoice or contract is confirmed by both parties, either party may
            withdraw without charge.
          </li>
          <li>
            After confirmation, an order can be cancelled or changed only with our written
            agreement. The buyer must then reimburse the costs we have already incurred for that
            order, such as procurement, grading, packing, container and freight bookings, and port
            and documentation charges.
          </li>
          <li>
            We may cancel an order, with a refund of any advance paid for goods not shipped, if the
            goods become unavailable, or if shipping them would breach a law or sanction.
          </li>
        </ul>
      </Clause>

      <Clause id="s-claims" title="5. Quality and quantity claims">
        <p>To make a claim, the buyer must:</p>
        <ol>
          <li>
            Notify us in writing (email is sufficient) within{" "}
            <Fill
              value={FILL_IN.claimNoticePerishableHours}
              label="Hours to notify a claim on fresh produce"
            />{" "}
            hours after discharge for fresh produce, and within{" "}
            <Fill
              value={FILL_IN.claimNoticeOtherDays}
              label="Days to notify a claim on other goods"
            />{" "}
            days after delivery for other goods.
          </li>
          <li>
            Send supporting evidence: clear photographs or video, the bill of lading and container
            number, and, for a quality or condition claim, a report from an independent surveyor or
            laboratory. For temperature-controlled cargo include the temperature log.
          </li>
          <li>
            Keep the goods, packing and container seals as they are and allow us or our surveyor to
            inspect them. Goods must not be used, sold or disposed of before we have agreed.
          </li>
        </ol>
        <p>
          If the claim is verified, we will, at our choice, replace the affected goods, issue a
          credit note, or refund the value of the affected part. We are not responsible for loss or
          damage that arises after risk has passed to the buyer from handling, storage, transport
          or delay not caused by us, from natural deterioration beyond the shelf life discussed
          with the buyer, or from a failure to follow the claim steps above.
        </p>
      </Clause>

      <Clause id="s-returns" title="6. Returns">
        <p>
          Fresh agricultural goods cannot be returned. Spices and jewellery may be returned only if
          we have agreed in writing, after a verified claim, that they do not match the agreed
          specification. Do not send goods back without our written authorisation and return
          instructions.
        </p>
      </Clause>

      <Clause id="s-refunds" title="7. Refunds">
        <p>
          An accepted refund is paid by bank transfer to the account that made the payment within{" "}
          <Fill value={FILL_IN.refundWorkingDays} label="Working days to pay an accepted refund" />{" "}
          working days of our written acceptance. Bank charges, where applicable, are for the
          account of the party that incurs them.
        </p>
      </Clause>

      <Clause id="s-contact" title="8. How to contact us">
        <p>
          Send claims and cancellation requests to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and quote your proforma invoice
          or contract number. You can also reach us on {COMPANY.phone}.
        </p>
      </Clause>
    </LegalPage>
  );
}
