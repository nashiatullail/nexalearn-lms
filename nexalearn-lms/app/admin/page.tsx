import Topbar from "@/components/Topbar";
import { courses } from "@/lib/data";
import { Users, BookOpen, TrendingDown, GraduationCap } from "lucide-react";

const atRisk = [
  { name: "Bilal Raza", course: "CS-401", reason: "2 missed assignments, no login in 6 days" },
  { name: "Sana Malik", course: "ENG-210", reason: "Course progress stuck at 12% for 2 weeks" },
  { name: "Ahmed Khan", course: "BBA-205", reason: "Failed last quiz attempt (2/10)" },
];

export default function AdminAnalytics() {
  return (
    <div>
      <Topbar title="Institution Analytics" subtitle="A live view across every program and course" />
      <div className="px-6 py-8 lg:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <Users size={18} className="text-gold" />
            <p className="mt-4 font-display text-3xl text-text">1,284</p>
            <p className="mt-1 text-sm text-text-muted">Enrolled students</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <BookOpen size={18} className="text-teal" />
            <p className="mt-4 font-display text-3xl text-text">{courses.length}</p>
            <p className="mt-1 text-sm text-text-muted">Active courses</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <GraduationCap size={18} className="text-rose" />
            <p className="mt-4 font-display text-3xl text-text">82%</p>
            <p className="mt-1 text-sm text-text-muted">Avg. course completion</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <TrendingDown size={18} className="text-rose" />
            <p className="mt-4 font-display text-3xl text-text">{atRisk.length}</p>
            <p className="mt-1 text-sm text-text-muted">Students flagged at-risk</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="mb-4 font-display text-xl text-text">Completion by course</h2>
            <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
              {courses.map((c) => (
                <div key={c.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-text">{c.code} — {c.title}</span>
                    <span className="text-text-faint">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full rounded-full bg-teal" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl text-text">AI-flagged, at-risk students</h2>
            <div className="space-y-3">
              {atRisk.map((s) => (
                <div key={s.name} className="rounded-2xl border border-rose/25 bg-rose/5 p-4">
                  <p className="text-sm text-text">{s.name} <span className="text-text-faint">— {s.course}</span></p>
                  <p className="mt-1 text-xs text-text-muted">{s.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
