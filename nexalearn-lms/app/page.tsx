import Link from "next/link";
import {
  Landmark,
  PlayCircle,
  MessageCircleQuestion,
  Video,
  ArrowUpRight,
  Sparkles,
  UploadCloud,
  Trophy,
  MessagesSquare,
  CalendarClock,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { programs } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
            <Landmark size={17} strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg text-text">Nexalearn</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-text-muted md:flex">
          <Link href="/programs" className="hover:text-text transition-colors">Programs</Link>
          <a href="#features" className="hover:text-text transition-colors">Features</a>
          <a href="#assistant" className="hover:text-text transition-colors">AI Assistant</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:inline-flex rounded-full border border-border px-4 py-2 text-sm text-text-muted hover:text-text transition-colors"
          >
            Admin Panel
          </Link>
          <Link
            href="/signin"
            className="hidden sm:inline-flex text-sm text-text-muted hover:text-text transition-colors"
          >
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

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-16">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-muted">
            <Sparkles size={13} strokeWidth={1.75} className="text-teal" />
            An AI-native learning management system
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.08] text-text sm:text-[3.2rem]">
            The campus that
            <br />
            studies <em className="not-italic text-gold">with you.</em>
          </h1>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-text-muted">
            Video lectures, handouts, assignments and results in one calm
            place — plus an AI tutor grounded in your own course documents,
            auto-generated quizzes, and a full admin panel behind it all.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold-soft transition-colors"
            >
              Apply now
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
            <Link
              href="/programs"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              See degree programs
            </Link>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-7">
            <div>
              <dt className="font-display text-2xl text-text">40+</dt>
              <dd className="mt-1 text-xs text-text-faint">Programs offered</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-text">1.2L</dt>
              <dd className="mt-1 text-xs text-text-faint">Students enrolled</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-text">24/7</dt>
              <dd className="mt-1 text-xs text-text-faint">AI tutor availability</dd>
            </div>
          </dl>
        </div>

        {/* Seal / emblem visual */}
        <div className="relative mx-auto flex h-[380px] w-[380px] items-center justify-center">
          <div className="seal-ring absolute inset-0 rounded-full" />
          <div className="absolute inset-8 rounded-full border border-dashed border-border" />
          <div className="flex h-56 w-56 flex-col items-center justify-center rounded-full border border-gold/30 bg-surface text-center shadow-[0_0_60px_-15px_rgba(227,178,60,0.35)]">
            <Landmark size={30} strokeWidth={1.4} className="text-gold" />
            <p className="mt-3 font-display text-sm tracking-wide text-text">NEXALEARN</p>
            <p className="mt-1 text-[0.65rem] text-text-faint">AI · CAMPUS</p>
          </div>
          <div className="absolute -right-2 top-8 rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-lg animate-rise" style={{ animationDelay: "200ms" }}>
            <p className="text-[0.65rem] text-text-faint">Course progress</p>
            <p className="font-display text-lg text-teal">68%</p>
          </div>
          <div className="absolute -left-4 bottom-10 rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-lg animate-rise" style={{ animationDelay: "350ms" }}>
            <p className="text-[0.65rem] text-text-faint">Result card</p>
            <p className="font-display text-lg text-gold">Grade A</p>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="mb-10 max-w-xl">
            <p className="text-xs uppercase tracking-wider text-teal">Everything in one campus</p>
            <h2 className="mt-2 font-display text-3xl text-text">
              Built like a real institution — not just a video library.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-4 lg:rounded-2xl lg:border lg:border-border">
            {[
              { icon: Video, title: "Video lectures", body: "Embed lectures straight from YouTube or any hosted link — no special player to build or maintain." },
              { icon: UploadCloud, title: "AI tutor, on your documents", body: "Upload handouts and slides; the assistant answers only from them, citing the exact source." },
              { icon: Sparkles, title: "AI quiz generator", body: "Turn any lecture or handout into a graded quiz in seconds, with a weak-areas report after." },
              { icon: ShieldCheck, title: "Full admin panel", body: "Course builder, student management, result upload, fee tracking and live analytics." },
              { icon: Trophy, title: "Badges & leaderboards", body: "Streaks, completion badges and class rankings keep distance learners motivated." },
              { icon: MessagesSquare, title: "Course discussion forums", body: "Students ask, peers and the AI both answer — nothing gets lost in a WhatsApp group." },
              { icon: CalendarClock, title: "AI study planner", body: "A personalised weekly schedule generated from deadlines and course load." },
              { icon: Languages, title: "Offline-ready & multilingual", body: "Downloadable lectures for low-connectivity areas, with an English / Urdu interface toggle." },
            ].map((f) => (
              <div key={f.title} className="bg-ink p-6">
                <f.icon size={19} strokeWidth={1.6} className="text-gold" />
                <h3 className="mt-3.5 font-display text-base text-text">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section id="programs" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-teal">Degree programs</p>
            <h2 className="mt-2 font-display text-3xl text-text">Currently open for admission</h2>
          </div>
          <Link href="/programs" className="text-sm text-text-muted hover:text-text transition-colors">
            View all programs →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <Link
              key={p.id}
              href="/programs"
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-gold/40"
            >
              <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.65rem] text-gold">
                {p.level}
              </span>
              <h3 className="mt-4 font-display text-lg leading-snug text-text">{p.name}</h3>
              <p className="mt-1 text-xs text-text-faint">{p.duration} · {p.semesters} semesters</p>
              <p className="mt-4 text-xs text-text-muted">{p.feePerSemester} / semester</p>
            </Link>
          ))}
        </div>
      </section>

      {/* AI assistant callout */}
      <section id="assistant" className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-border bg-surface p-8 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs text-teal">
              <MessageCircleQuestion size={13} strokeWidth={1.75} />
              AI Study Assistant
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-text">
              Ask your course a question. It answers back.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Instructors upload handouts, slide decks and past papers — the
              assistant reads them and answers only from that material, citing
              the exact document and page. A study partner for the night
              before a paper, not a generic chatbot.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-ink p-5">
            <div className="flex items-center gap-2 border-b border-border pb-3 text-xs text-text-faint">
              <PlayCircle size={14} className="text-gold" />
              CS-401 · Introduction to Programming
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-surface-2 px-3.5 py-2.5 text-text">
                What&apos;s the difference between a for-loop and a while-loop?
              </div>
              <div className="max-w-[90%] rounded-xl rounded-tl-sm border border-border bg-surface px-3.5 py-2.5 text-text-muted">
                From Unit 2 of your handout: a for-loop is used when the number
                of repetitions is known in advance, while a while-loop repeats
                as long as a condition stays true...
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-text-faint">
          <p>Nexalearn AI Campus — concept demo, built for evaluation purposes.</p>
          <p>Prototype interface · not affiliated with any university</p>
        </div>
      </footer>
    </div>
  );
}
