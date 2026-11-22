import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/legal/PrivacyPage";
import { buildLegalHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => buildLegalHead("privacy"),
  component: PrivacyPage,
});
