import { createFileRoute } from "@tanstack/react-router";
import { CRMLayout } from "@/components/layout/crm-layout";

export const Route = createFileRoute("/crm/__root")({
  component: CRMLayout,
});
