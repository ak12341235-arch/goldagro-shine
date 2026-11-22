import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/legal-data";
import { Clause, LegalPage } from "./LegalLayout";

const TOC = [
  { id: "d-info", label: "1. Accuracy of information" },
  { id: "d-images", label: "2. Product images" },
  { id: "d-agro", label: "3. Agricultural products" },
  { id: "d-jewel", label: "4. Imitation jewellery" },
  { id: "d-import", label: "5. Import regulations" },
  { id: "d-advice", label: "6. No advice" },
  { id: "d-third", label: "7. Third-party names and links" },
  { id: "d-docs", label: "8. Registrations and certificates" },
];

export function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="Please read this disclaimer together with our Terms and Conditions. It explains the limits of the information on this website."
      toc={TOC}
    >
      <Clause id="d-info" title="1. Accuracy of information">
        <p>
          We take care to keep this website accurate, but product details, specifications, packing,
          minimum order quantities, origins and HS codes are indicative and can change with season,
          supply and regulation. They are confirmed in a written quotation and proforma invoice for
          each lot or design. Nothing on the website is an offer, a guarantee or a promise of
          supply.
        </p>
      </Clause>

      <Clause id="d-images" title="2. Product images">
        <p>
          Images are for illustration only. The goods supplied may differ in colour, size, shape and
          finish from the pictures shown.
        </p>
      </Clause>

      <Clause id="d-agro" title="3. Agricultural products">
        <p>
          Spices, fruits and vegetables are natural products. Appearance, size, moisture, aroma,
          colour and pungency vary by crop, season and lot, and fresh produce is perishable.
          Quality and condition are judged against the specification agreed for the shipment, within
          trade-customary tolerances.
        </p>
      </Clause>

      <Clause id="d-jewel" title="4. Imitation jewellery">
        <p>
          Our jewellery is imitation (fashion) jewellery. It is not gold, silver or other precious
          metal and is not hallmarked unless we say so in writing. Materials, plating and finish
          vary by design and are confirmed in the quotation. Colour of plating may change with wear,
          moisture and contact with perfumes and chemicals. If you need test reports for your
          market (for example for nickel, lead or cadmium content), tell us before you order.
        </p>
      </Clause>

      <Clause id="d-import" title="5. Import and destination rules">
        <p>
          Rules for importing food, plants and jewellery differ by country and change often,
          including plant-health, residue, labelling and product-safety requirements. The buyer is
          responsible for checking and meeting the rules of the destination country before
          ordering.
        </p>
      </Clause>

      <Clause id="d-advice" title="6. No professional advice">
        <p>
          Information on this website is general business information. It is not legal, tax,
          customs or financial advice. Take advice suitable to your own situation.
        </p>
      </Clause>

      <Clause id="d-third" title="7. Third-party names and links">
        <p>
          Names such as WhatsApp, Gmail, FIEO and DGFT belong to their owners and are shown only to
          identify them. Their mention does not mean they endorse us. We are not responsible for
          the content of external websites we link to.
        </p>
      </Clause>

      <Clause id="d-docs" title="8. Registrations and certificates">
        <p>
          We display our GST, IEC and RCMC registrations and a training certificate so buyers can
          check who they are dealing with. A registration shows that a business is registered with
          the authority named on it. It is not a guarantee of any product&apos;s quality. The scope
          of each registration is stated on the document itself, for example our FIEO RCMC covers{" "}
          {COMPANY.rcmcGoods.toLowerCase()}. See the <Link to="/legal-notice">Legal Notice</Link>{" "}
          for details and links to verify them.
        </p>
      </Clause>
    </LegalPage>
  );
}
