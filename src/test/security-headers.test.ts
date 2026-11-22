import { describe, expect, it } from "vitest";

import { CONTENT_SECURITY_POLICY, withSecurityHeaders } from "@/lib/security-headers";

const html = () =>
  new Response("<html></html>", {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
const get = new Request("https://example.com/");

describe("withSecurityHeaders", () => {
  it("adds the security headers and a CSP to HTML responses", () => {
    const res = withSecurityHeaders(html(), get);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("strict-transport-security")).toContain("max-age=");
    expect(res.headers.get("content-security-policy")).toBe(CONTENT_SECURITY_POLICY);
  });

  it("keeps the body, status and content type", async () => {
    const res = withSecurityHeaders(html(), get);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(await res.text()).toBe("<html></html>");
  });

  it("locks down framing, plugins, base tag and form targets", () => {
    for (const d of [
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "default-src 'self'",
    ]) {
      expect(CONTENT_SECURITY_POLICY).toContain(d);
    }
  });

  it("does not let a response's own header be overridden", () => {
    const res = withSecurityHeaders(
      new Response("x", { headers: { "x-frame-options": "DENY" } }),
      get,
    );
    expect(res.headers.get("x-frame-options")).toBe("DENY");
  });

  it("allows CDN caching only for successful GET HTML", () => {
    expect(withSecurityHeaders(html(), get).headers.get("netlify-cdn-cache-control")).toContain(
      "s-maxage",
    );
    const post = new Request("https://example.com/", { method: "POST" });
    expect(withSecurityHeaders(html(), post).headers.get("netlify-cdn-cache-control")).toBeNull();
    const error = new Response("oops", {
      status: 500,
      headers: { "content-type": "text/html" },
    });
    expect(withSecurityHeaders(error, get).headers.get("netlify-cdn-cache-control")).toBeNull();
  });
});
