import { Card, EmptyState, LinkButton, PageHeader, PageShell } from "@/components/ui";
import { Plus } from "lucide-react";

export default function DeductionsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Deductions"
        title="Deductions"
        description="Deduction listing is shown on the dashboard and settlement details."
        action={
          <LinkButton href="/deductions/new">
            <Plus className="size-4" aria-hidden="true" />
            Add Deduction
          </LinkButton>
        }
      />
      <Card className="p-5 sm:p-6">
        <EmptyState
          title="Open Dashboard for Recent Deductions"
          description="The current frontend does not include a standalone deduction fetch. Recent deductions remain available on the dashboard."
          action={<LinkButton href="/dashboard" variant="secondary">Go to Dashboard</LinkButton>}
        />
      </Card>
    </PageShell>
  );
}
