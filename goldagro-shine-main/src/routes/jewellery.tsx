import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { DivisionPage } from "@/components/site/DivisionPage";
import { JEWEL } from "@/lib/site-data";

export const Route = createFileRoute("/jewellery")({
  head: () => buildHead("jewel"),
  component: () => <DivisionPage d={JEWEL} />,
});
