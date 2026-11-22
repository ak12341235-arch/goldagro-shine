import { createFileRoute } from "@tanstack/react-router";
import { ShippingClaimsPage } from "@/components/legal/ShippingClaimsPage";
import { buildLegalHead } from "@/lib/seo";

export const Route = createFileRoute("/shipping-and-claims")({
  head: () => buildLegalHead("shipping"),
  component: ShippingClaimsPage,
});
