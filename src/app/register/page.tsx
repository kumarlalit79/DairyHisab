import { Card, LinkButton, PageHeader, PageShell } from "@/components/ui";
import React from 'react'

const RegisterPage = () => {
  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Account"
        title="Register"
        description="Registration UI is not connected yet. Existing authentication behavior has been left untouched."
      />
      <Card className="p-6">
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          Use the login page to access DairyHisab with an existing account.
        </p>
        <div className="mt-6">
          <LinkButton href="/login">Go to Login</LinkButton>
        </div>
      </Card>
    </PageShell>
  )
}

export default RegisterPage
