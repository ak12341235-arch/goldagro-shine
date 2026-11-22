import { createFileRoute } from "@tanstack/react-router";
import { DisclaimerPage } from "@/components/legal/DisclaimerPage";
import { buildLegalHead } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () => buildLegalHead("disclaimer"),
  component: DisclaimerPage,
});
