import { Link } from "@tanstack/react-router";
import { COMPANY, FILL_IN } from "@/lib/legal-data";
import { Clause, FactTable, Fill, LegalPage } from "./LegalLayout";

const TOC = [
  { id: "p-who", label: "1. Who is responsible" },
  { id: "p-collect", label: "2. What we collect" },
  { id: "p-purpose", label: "3. Why we use it" },
  { id: "p-share", label: "4. Who we share it with" },
  { id: "p-transfer", label: "5. Transfers outside India" },
  { id: "p-retention", label: "6. How long we keep it" },
  { id: "p-security", label: "7. Security" },
  { id: "p-rights", label: "8. Your rights" },
  { id: "p-children", label: "9. Children" },
  { id: "p-cookies", label: "10. Cookies and fonts" },
  { id: "p-changes", label: "11. Changes to this policy" },
  { id: "p-grievance", label: "12. Grievance Officer and contact" },
];

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information GOLDAGRO Global Export collects through this website and in the course of doing business, why we use it, who we share it with, how long we keep it and what rights you have. It follows India's Information Technology Act, 2000 and the Reasonable Security Practices and Sensitive Personal Data or Information Rules, 2011, is prepared for the Digital Personal Data Protection Act, 2023 (whose main duties start in May 2027), and applies the same protections to visitors from the UK and EU."
      toc={TOC}
    >
      <Clause id="p-who" title="1. Who is responsible for your information">
        <FactTable
          rows={[
            ["Business", COMPANY.tradeName],
            ["Proprietor", COMPANY.proprietor],
            ["Address", COMPANY.businessAddress],
            ["Email", COMPANY.email],
            ["Phone / WhatsApp", COMPANY.phone],
          ]}
        />
      </Clause>

      <Clause id="p-collect" title="2. What we collect">
        <h3>Information you enter in the inquiry form</h3>
        <p>
          Full name, company name (optional), business email, phone / WhatsApp number, country,
          PIN / postal code, destination port, product, quantity and your message. This information
          stays on your device. The form does not send it to our servers. It builds a message that
          opens in WhatsApp or Gmail, and we receive it only if you press Send in that app.
        </p>
        <h3>Information you send us directly</h3>
        <p>
          When you contact us by WhatsApp, email or phone we receive your number or email address,
          your name or profile name, and what you tell us. WhatsApp (Meta) and Gmail (Google)
          process that traffic under their own privacy policies.
        </p>
        <h3>Information needed to do business</h3>
        <p>
          If you become a customer or supplier we may also collect business registration and tax
          identifiers, consignee and shipping details, invoices and payment records, and
          identity or address information needed to meet export, customs, tax and sanctions rules.
        </p>
        <h3>Technical information</h3>
        <p>
          Our hosting provider (Netlify) records standard server logs such as IP address, browser
          type, pages requested and the time of the request. We use these to run and secure the
          website. We do not use them to build visitor profiles.
        </p>
      </Clause>

      <Clause id="p-purpose" title="3. Why we use your information">
        <ul>
          <li>
            <strong>To answer your inquiry</strong> and prepare specifications, samples and
            quotations (you asked us to, and it is a step before a contract).
          </li>
          <li>
            <strong>To carry out a sale:</strong> contracts, invoices, packing, shipping, customs
            and payment.
          </li>
          <li>
            <strong>To meet legal duties:</strong> tax, customs and foreign-exchange records,
            sanctions and anti-fraud checks, and responding to lawful requests from authorities.
          </li>
          <li>
            <strong>To keep the website and our business safe,</strong> including preventing fraud
            and abuse (our legitimate interest).
          </li>
        </ul>
        <p>
          We do not sell your personal information and we do not use it for advertising or
          automated decision-making.
        </p>
      </Clause>

      <Clause id="p-share" title="4. Who we share it with">
        <p>Only as needed for the purposes above, with:</p>
        <ul>
          <li>messaging and email providers you choose to use (WhatsApp / Meta, Gmail / Google);</li>
          <li>our website host and technology provider (Netlify);</li>
          <li>
            freight forwarders, customs house agents, shipping lines, inspection agencies and
            insurers handling your shipment;
          </li>
          <li>banks and payment institutions processing payments;</li>
          <li>
            accountants, auditors and legal advisers, who are bound to keep it confidential;
          </li>
          <li>
            government and regulatory authorities (for example customs, GST, DGFT) where the law
            requires it.
          </li>
        </ul>
      </Clause>

      <Clause id="p-transfer" title="5. Transfers outside India">
        <p>
          Because our buyers are overseas and our messaging and hosting providers operate globally,
          your information may be processed outside India. We share it across borders only for a
          transaction you ask us to carry out, with the providers listed above, or where the law
          requires.
        </p>
      </Clause>

      <Clause id="p-retention" title="6. How long we keep it">
        <p>
          Transaction, tax and customs records are kept for as long as the law requires. An
          inquiry that does not lead to an order is kept for up to{" "}
          <Fill value={FILL_IN.enquiryRetentionMonths} label="Months to keep unconverted inquiries" />{" "}
          months, then deleted or anonymised. We may keep information longer where needed to
          handle a dispute or legal claim.
        </p>
      </Clause>

      <Clause id="p-security" title="7. Security">
        <p>
          We use reasonable security practices appropriate to the information we hold: the website
          is served over HTTPS, access to business records is limited to people who need it, and we
          choose service providers with recognised security practices. No system is completely
          secure. If a breach affects your information we will notify you and the authorities as
          the law requires.
        </p>
      </Clause>

      <Clause id="p-rights" title="8. Your rights">
        <p>Subject to applicable law you may:</p>
        <ul>
          <li>ask what personal information we hold about you and get a copy;</li>
          <li>ask us to correct or update information that is inaccurate or incomplete;</li>
          <li>
            ask us to delete your information, or withdraw a consent you gave (this does not affect
            what we did before you withdrew it, or records we must keep by law);
          </li>
          <li>
            if you are in the UK or EU: also ask us to restrict or stop certain processing, receive
            your data in a portable format, and complain to your data protection authority;
          </li>
          <li>nominate another person to exercise your rights in the event of your death or incapacity;</li>
          <li>make a complaint to our Grievance Officer (section 12).</li>
        </ul>
        <p>
          Write to the Grievance Officer. We may ask you to verify your identity first. We aim to
          acknowledge within 7 days and resolve within one month, and in any case within the time
          the law allows.
        </p>
      </Clause>

      <Clause id="p-children" title="9. Children">
        <p>
          This website is for businesses and is not intended for anyone under 18. We do not
          knowingly collect information from children. If you believe a child has sent us
          information, contact us and we will delete it.
        </p>
      </Clause>

      <Clause id="p-cookies" title="10. Cookies, trackers and fonts">
        <p>
          This website does not set cookies and does not currently use analytics or advertising
          trackers. To display its typefaces, your browser loads font files from Google Fonts
          (fonts.googleapis.com and fonts.gstatic.com), which means Google receives your IP address
          and browser details. If we add analytics or other third-party tools we will update this
          policy first.
        </p>
      </Clause>

      <Clause id="p-changes" title="11. Changes to this policy">
        <p>
          We may update this policy. The date at the top shows the latest version. Material changes
          will be highlighted on this page. See also our <Link to="/terms">Terms and Conditions</Link>.
        </p>
      </Clause>

      <Clause id="p-grievance" title="12. Grievance Officer and contact">
        <p>
          In line with Rule 5(9) of the SPDI Rules, 2011, questions, complaints and requests about
          personal information should be sent to our Grievance Officer:
        </p>
        <FactTable
          rows={[
            [
              "Name",
              <Fill
                key="n"
                value={FILL_IN.grievanceOfficerName}
                label="Grievance Officer name"
              />,
            ],
            [
              "Designation",
              <Fill
                key="d"
                value={FILL_IN.grievanceOfficerDesignation}
                label="Grievance Officer designation"
              />,
            ],
            [
              "Email",
              <Fill
                key="e"
                value={FILL_IN.grievanceOfficerEmail}
                label="Grievance Officer email"
              />,
            ],
            [
              "Phone",
              <Fill
                key="p"
                value={FILL_IN.grievanceOfficerPhone}
                label="Grievance Officer phone"
              />,
            ],
            ["Address", COMPANY.businessAddress],
          ]}
        />
      </Clause>
    </LegalPage>
  );
}
