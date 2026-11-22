import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "@/components/legal/TermsPage";
import { buildLegalHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => buildLegalHead("terms"),
  component: TermsPage,
});
