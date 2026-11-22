import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { COMPANY, FILL_IN, LEGAL_PAGES } from "@/lib/legal-data";
import { GST, SITE_URL, getFaq } from "@/lib/site-data";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(<RouterProvider router={router} />);
}

describe("legal pages", () => {
  it.each(LEGAL_PAGES.map((p) => [p.path, p.label]))("renders %s", async (path) => {
    const { container } = renderAt(path as string);
    await waitFor(() => expect(container.querySelector("h1")).not.toBeNull());
  });

  it("shows a blank fill-in line for every empty FILL_IN field on the Legal Notice", async () => {
    const { container } = renderAt("/legal-notice");
    await waitFor(() => expect(container.querySelector("h1")).not.toBeNull());
    expect(container.querySelectorAll("[data-legal-blank]").length).toBeGreaterThan(0);
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
