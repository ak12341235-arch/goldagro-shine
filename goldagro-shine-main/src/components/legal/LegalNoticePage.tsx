import { Link } from "@tanstack/react-router";
import { COMPANY, FILL_IN, VERIFY_LINKS } from "@/lib/legal-data";
import { Clause, FactTable, Fill, LegalPage } from "./LegalLayout";

const TOC = [
  { id: "n-business", label: "1. Business details" },
  { id: "n-registrations", label: "2. Government registrations" },
  { id: "n-verify", label: "3. Verify our registrations" },
  { id: "n-grievance", label: "4. Grievance Officer" },
  { id: "n-policies", label: "5. Policies" },
];

export function LegalNoticePage() {
  return (
    <LegalPage
      title="Legal Notice and Registrations"
      intro="The legal identity of the business behind this website, the Indian government registrations it holds, and where you can check them yourself."
      toc={TOC}
    >
      <Clause id="n-business" title="1. Business details">
        <FactTable
          rows={[
            ["Trade name", COMPANY.tradeName],
            ["Constitution", COMPANY.constitution],
            ["Proprietor", COMPANY.proprietor],
            ["Registered address (as on GST, IEC and RCMC certificates)", COMPANY.registeredAddress],
            ["Business and correspondence address", COMPANY.businessAddress],
            ["Port of loading", COMPANY.portOfLoading],
            ["Email", <a key="m" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>],
            ["Phone / WhatsApp", COMPANY.phone],
          ]}
        />
      </Clause>

      <Clause id="n-registrations" title="2. Government registrations">
        <FactTable
          rows={[
            ["GSTIN (GST registration)", COMPANY.gstin],
            ["Importer-Exporter Code (IEC, DGFT) and PAN", COMPANY.iec],
            [
              "RCMC (FIEO) number",
              `${COMPANY.rcmcNumber}, valid up to ${COMPANY.rcmcValidUpto}. Registered as merchant exporter of: ${COMPANY.rcmcGoods}.`,
            ],
            [
              "Spices Board certificate of registration as exporter of spices (CRES)",
              <Fill key="sb" value={FILL_IN.spicesBoardCres} label="Spices Board CRES number" />,
            ],
            [
              "APEDA RCMC (fresh fruits and vegetables)",
              <Fill key="ap" value={FILL_IN.apedaRcmc} label="APEDA RCMC number" />,
            ],
            [
              "FSSAI licence / registration",
              <Fill key="fs" value={FILL_IN.fssai} label="FSSAI number" />,
            ],
            [
              "Udyam (MSME) registration",
              <Fill key="ud" value={FILL_IN.udyam} label="Udyam registration number" />,
            ],
            [
              "Shops and Establishment registration (Maharashtra)",
              <Fill key="se" value={FILL_IN.shopsEstablishment} label="Shops and Establishment no." />,
            ],
            [
              "Authorised Dealer (AD) code, bank registered with customs",
              <Fill key="ad" value={FILL_IN.adCode} label="AD code" />,
            ],
            [
              "GST Letter of Undertaking (LUT) ARN, for exports",
              <Fill key="lut" value={FILL_IN.lutArn} label="LUT ARN" />,
            ],
          ]}
        />
        <p>
          Copies of the GST, IEC and RCMC certificates are available under Corporate Credentials on
          the home page. Each registration applies only to the scope stated on the certificate.
        </p>
      </Clause>

      <Clause id="n-verify" title="3. Verify our registrations">
        <p>
          Do not rely only on a copy. Confirm our GSTIN, IEC and RCMC with the issuing authority:
        </p>
        <ul>
          {VERIFY_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          We will also send a verified copy of any document on request. Before a first payment,
          confirm our bank details with us by phone (see <Link to="/terms">Terms, A10</Link>).
        </p>
      </Clause>

      <Clause id="n-grievance" title="4. Grievance Officer">
        <FactTable
          rows={[
            [
              "Name",
              <Fill key="n" value={FILL_IN.grievanceOfficerName} label="Grievance Officer name" />,
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
              <Fill key="e" value={FILL_IN.grievanceOfficerEmail} label="Grievance Officer email" />,
            ],
            [
              "Phone",
              <Fill key="p" value={FILL_IN.grievanceOfficerPhone} label="Grievance Officer phone" />,
            ],
          ]}
        />
        <p>
          For complaints about personal information or this website. See the{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </Clause>

      <Clause id="n-policies" title="5. Policies">
        <ul>
          <li>
            <Link to="/terms">Terms and Conditions</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/shipping-and-claims">Shipping, Cancellation and Claims Policy</Link>
          </li>
          <li>
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
        </ul>
      </Clause>
    </LegalPage>
  );
}
