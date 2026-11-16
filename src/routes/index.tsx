import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { DivisionPage } from "@/components/site/DivisionPage";
import { AGRO } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => buildHead("agro"),
  component: () => <DivisionPage d={AGRO} />,
});
