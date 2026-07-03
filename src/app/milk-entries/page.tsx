import { Card, EmptyState, LinkButton, PageHeader, PageShell } from "@/components/ui";
import { Plus } from "lucide-react";

export default function MilkEntriesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Milk"
        title="Milk Entries"
        description="Milk entry listing is shown on the dashboard and settlement details."
        action={
          <LinkButton href="/milk-entries/new">
            <Plus className="size-4" aria-hidden="true" />
            Add Milk Entry
          </LinkButton>
        }
      />
      <Card className="p-5 sm:p-6">
        <EmptyState
          title="Open Dashboard for Recent Entries"
          description="The current frontend does not include a standalone milk entry fetch. Recent entries remain available on the dashboard."
          action={<LinkButton href="/dashboard" variant="secondary">Go to Dashboard</LinkButton>}
        />
      </Card>
    </PageShell>
  );
}
