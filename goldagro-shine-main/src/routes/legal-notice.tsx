import { createFileRoute } from "@tanstack/react-router";
import { LegalNoticePage } from "@/components/legal/LegalNoticePage";
import { buildLegalHead } from "@/lib/seo";

export const Route = createFileRoute("/legal-notice")({
  head: () => buildLegalHead("notice"),
  component: LegalNoticePage,
});
