import { Card, LinkButton, PageHeader, PageShell } from "@/components/ui";

export default function EditDeductionPage() {
  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Deduction"
        title="Edit Deduction"
        description="Editing behavior has not been wired in this frontend route yet."
      />
      <Card className="p-6">
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          Existing deduction creation and dashboard flows are unchanged.
        </p>
        <div className="mt-6">
          <LinkButton href="/dashboard" variant="secondary">Back to Dashboard</LinkButton>
        </div>
      </Card>
    </PageShell>
  );
}
