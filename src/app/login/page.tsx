"use client"
import { Alert, Button, Card, Field, PageShell, inputClassName } from '@/components/ui'
import { useAuthStore } from '@/store/authStore'
import { LockKeyhole, LogIn, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'

const LoginPage = () => {

  const router = useRouter()

  const {login, loading} = useAuthStore()

  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setError("")
    const success = await login({
      mobile, password
    })

    if(success) {
      router.push("/dashboard")
    } else {
      setError("Invalid mobile number or password.")
    }
  }

  return (
    <PageShell className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <div className="mb-8">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
            <LogIn className="size-5" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-[var(--text)]">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Sign in to continue managing your dairy ledger.
          </p>
        </div>

        {error ? (
          <div className="mb-5">
            <Alert title="Login failed">{error}</Alert>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Mobile Number">
            <div className="relative">
              <Phone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className={`${inputClassName} pl-11`}
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                disabled={loading}
                autoComplete="tel"
              />
            </div>
          </Field>

          <Field label="Password">
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className={`${inputClassName} pl-11`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
          </Field>

          <Button type="submit" loading={loading} disabled={loading} className="w-full mt-2">
            {loading ? "Logging in" : "Login"}
          </Button>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[var(--primary)] hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </Card>
    </PageShell>
  )
}

export default LoginPage
