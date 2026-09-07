import Link from "next/link";
import { Landmark, Clock, Wallet, Layers, ArrowRight } from "lucide-react";
import { programs } from "@/lib/data";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
            <Landmark size={17} strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg text-text">Nexalearn</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="text-sm text-text-muted hover:text-text transition-colors">
            Student Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-soft transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-12 pt-8 text-center lg:px-8">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-muted">
          About the university
        </p>
        <h1 className="font-display text-3xl text-text sm:text-4xl">Nexalearn University</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-text-muted">
          Nexalearn University is a distance-learning institution offering accredited-style degree
          programs online, built for students who are working, at home, or far from a physical campus.
          Every program combines recorded video lectures, downloadable course material, and an AI study
          assistant grounded in the course content — so support is available whenever a student needs it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <h2 className="mb-6 font-display text-2xl text-text">Degree programs currently offered</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {programs.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-surface p-6">
              <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.65rem] text-gold">
                {p.level}
              </span>
              <h3 className="mt-4 font-display text-xl text-text">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-5 text-xs text-text-faint">
                <span className="flex items-center gap-1.5"><Clock size={13} /> {p.duration} · {p.semesters} semesters</span>
                <span className="flex items-center gap-1.5"><Wallet size={13} /> {p.feePerSemester} / semester</span>
                <span className="flex items-center gap-1.5"><Layers size={13} /> {p.courseIds.length} courses this term</span>
              </div>

              <Link
                href="/signup"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-soft transition-colors"
              >
                Apply to this program <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-text-faint">
          <p>Nexalearn University — concept demo, built for evaluation purposes.</p>
          <Link href="/" className="hover:text-text-muted transition-colors">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
}
