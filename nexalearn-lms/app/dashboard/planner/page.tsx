import Topbar from "@/components/Topbar";
import { courses, assignments } from "@/lib/data";
import { CalendarClock, Sparkles } from "lucide-react";

const plan = [
  { day: "Monday", blocks: [{ time: "7:00 – 8:00 PM", course: "CS-401", task: "Watch: Arrays & basic data structures" }] },
  { day: "Tuesday", blocks: [{ time: "7:00 – 7:45 PM", course: "BBA-205", task: "Assignment 1 — Consumer Behaviour draft" }] },
  { day: "Wednesday", blocks: [{ time: "6:30 – 7:30 PM", course: "ENG-210", task: "Thesis statement revision" }] },
  { day: "Thursday", blocks: [
    { time: "7:00 – 7:40 PM", course: "CS-401", task: "Assignment 2 — Loops & Functions" },
    { time: "7:45 – 8:15 PM", course: "EDU-305", task: "Review: Inclusive teaching practices" },
  ] },
  { day: "Friday", blocks: [{ time: "7:00 – 8:00 PM", course: "BBA-205", task: "Watch: The marketing mix — 4 Ps" }] },
  { day: "Saturday", blocks: [{ time: "10:00 – 11:00 AM", course: "CS-401", task: "Practice quiz — Loops & Functions" }] },
  { day: "Sunday", blocks: [{ time: "—", course: "—", task: "Rest day / catch-up buffer" }] },
];

export default function PlannerPage() {
  const pending = assignments.filter((a) => a.status === "pending");
  return (
    <div>
      <Topbar title="AI Study Planner" subtitle="A weekly schedule generated from your course load and upcoming deadlines" />
      <div className="px-6 py-8 lg:px-10">
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-teal/25 bg-teal/5 p-5">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-teal" />
          <p className="text-sm text-text-muted">
            Built around {pending.length} pending assignments and {courses.length} active courses —
            heavier sessions are placed before the nearest deadlines, with a lighter Sunday for review.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {plan.map((d) => (
            <div key={d.day} className="rounded-2xl border border-border bg-surface p-5">
              <div className="mb-3 flex items-center gap-2 text-text">
                <CalendarClock size={15} className="text-gold" />
                <h3 className="font-display text-base">{d.day}</h3>
              </div>
              <div className="space-y-3">
                {d.blocks.map((b, i) => (
                  <div key={i} className="rounded-lg bg-surface-2 px-3 py-2.5">
                    <p className="text-xs text-text-faint">{b.time}{b.course !== "—" ? ` · ${b.course}` : ""}</p>
                    <p className="mt-1 text-sm text-text-muted">{b.task}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
