"use client";

import Link from "next/link";
import Topbar from "@/components/Topbar";
import { courses, programs } from "@/lib/data";
import { useUser } from "@/components/UserProvider";
import { PlayCircle } from "lucide-react";

const barMap: Record<string, string> = {
  gold: "bg-gold",
  teal: "bg-teal",
  rose: "bg-rose",
};
const badgeMap: Record<string, string> = {
  gold: "text-gold border-gold/40 bg-gold/10",
  teal: "text-teal border-teal/40 bg-teal/10",
  rose: "text-rose border-rose/40 bg-rose/10",
};

export default function CoursesPage() {
  const { user } = useUser();
  const program = programs.find((p) => p.name === user?.program);
  const myCourses = program ? courses.filter((c) => program.courseIds.includes(c.id)) : courses;
  const credits = myCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div>
      <Topbar
        title="My Courses"
        subtitle={`${user?.program ?? "Your program"} — ${myCourses.length} courses, ${credits} credit hours`}
      />
      <div className="grid grid-cols-1 gap-5 px-6 py-8 sm:grid-cols-2 lg:grid-cols-2 lg:px-10 xl:grid-cols-3">
        {myCourses.map((c) => (
          <Link
            key={c.id}
            href={`/dashboard/courses/${c.id}`}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-gold/40"
          >
            <div className="flex items-start justify-between">
              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] ${badgeMap[c.color]}`}>
                {c.code}
              </span>
              <span className="text-xs text-text-faint">{c.credits} Cr</span>
            </div>
            <h3 className="mt-4 font-display text-lg leading-snug text-text">{c.title}</h3>
            <p className="mt-1 text-xs text-text-faint">{c.program}</p>
            <p className="mt-1 text-xs text-text-faint">{c.instructor}</p>

            <div className="mt-5 flex items-center gap-2 text-xs text-text-muted">
              <PlayCircle size={14} className="text-text-faint" />
              {c.lectures.length} lectures · {c.handouts.length} handouts
            </div>

            <div className="mt-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                <div className={`h-full rounded-full ${barMap[c.color]}`} style={{ width: `${c.progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-text-faint">{c.progress}% complete</p>
            </div>
          </Link>
        ))}
        {myCourses.length === 0 && (
          <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-text-muted sm:col-span-2 xl:col-span-3">
            No courses assigned to your program yet.
          </p>
        )}
      </div>
    </div>
  );
}
