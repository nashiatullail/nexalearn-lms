"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Landmark, ArrowRight } from "lucide-react";
import { signIn } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = signIn(email.trim(), password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
            <Landmark size={17} strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg text-text">Nexalearn</span>
        </Link>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <h1 className="font-display text-2xl text-text">Welcome back</h1>
          <p className="mt-1.5 text-sm text-text-muted">Sign in to continue to your campus.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-text-faint">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint outline-none focus:border-gold/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-text-faint">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint outline-none focus:border-gold/40"
              />
            </div>

            {error && <p className="text-sm text-rose">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink hover:bg-gold-soft transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text-faint">
            New to Nexalearn?{" "}
            <Link href="/signup" className="text-gold hover:text-gold-soft">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
