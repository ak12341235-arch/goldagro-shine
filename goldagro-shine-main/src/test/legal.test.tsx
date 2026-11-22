import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DisclaimerPage } from "@/components/legal/DisclaimerPage";
import { LegalNoticePage } from "@/components/legal/LegalNoticePage";
import { PrivacyPage } from "@/components/legal/PrivacyPage";
import { ShippingClaimsPage } from "@/components/legal/ShippingClaimsPage";
import { TermsPage } from "@/components/legal/TermsPage";
import { COMPANY, FILL_IN } from "@/lib/legal-data";
import { GST, SITE_URL, getFaq } from "@/lib/site-data";

afterEach(cleanup);

const PAGES: [string, () => JSX.Element][] = [
  ["/terms", TermsPage],
  ["/privacy-policy", PrivacyPage],
  ["/shipping-and-claims", ShippingClaimsPage],
  ["/disclaimer", DisclaimerPage],
  ["/legal-notice", LegalNoticePage],
];

// A small router of its own: these tests check the legal pages, not the app's HTML shell.
function renderAt(path: string) {
  const root = createRootRoute({ component: Outlet });
  const home = createRoute({ getParentRoute: () => root, path: "/", component: () => null });
  const legal = PAGES.map(([p, component]) =>
    createRoute({ getParentRoute: () => root, path: p, component }),
  );
  const router = createRouter({
    routeTree: root.addChildren([home, ...legal]),
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(<RouterProvider router={router} />);
}

describe("legal pages", () => {
  it.each(PAGES.map(([p]) => [p]))("renders %s with a heading", async (path) => {
    renderAt(path as string);
    expect(await screen.findByRole("heading", { level: 1 })).toBeTruthy();
  });

  it("shows blank fill-in lines on the Legal Notice for empty FILL_IN fields", async () => {
    renderAt("/legal-notice");
    await screen.findByRole("heading", { level: 1 });
    expect(document.querySelectorAll("[data-legal-blank]").length).toBeGreaterThan(0);
  });
});

describe("legal data", () => {
  it("takes identity details from the website data", () => {
    expect(COMPANY.gstin).toBe(GST);
    expect(COMPANY.iec).not.toBe("");
    expect(COMPANY.proprietor).not.toBe("");
    expect(COMPANY.rcmcNumber).toContain("RCMC/FIEO");
  });

  it("keeps the grievance contact pre-filled from the website", () => {
    expect(FILL_IN.grievanceOfficerEmail).not.toBe("");
  });
});

describe("site data", () => {
  it("has a canonical https site url without a trailing slash", () => {
    expect(SITE_URL).toMatch(/^https:\/\/[^/]+$/);
  });

  it("does not mention phytosanitary certificates in the jewellery FAQ", () => {
    const text = getFaq("jewel")
      .map((f) => `${f.question} ${f.answer}`)
      .join(" ");
    expect(text.toLowerCase()).not.toContain("phytosanitary");
    expect(getFaq("agro").some((f) => /phytosanitary/i.test(f.answer))).toBe(true);
  });
});
