"use client";

import Link from "next/link";
import Topbar from "@/components/Topbar";
import { courses, assignments, announcements, programs } from "@/lib/data";
import { useUser } from "@/components/UserProvider";
import { BookOpen, ClipboardList, GraduationCap, ArrowUpRight, Megaphone } from "lucide-react";

const colorMap: Record<string, string> = {
  gold: "text-gold",
  teal: "text-teal",
  rose: "text-rose",
};
const barMap: Record<string, string> = {
  gold: "bg-gold",
  teal: "bg-teal",
  rose: "bg-rose",
};

export default function DashboardOverview() {
  const { user } = useUser();
  const program = programs.find((p) => p.name === user?.program);
  const myCourses = program ? courses.filter((c) => program.courseIds.includes(c.id)) : courses;
  const pending = assignments.filter((a) => a.status === "pending");
  const inProgress = [...myCourses].sort((a, b) => a.progress - b.progress)[0] ?? myCourses[0];

  return (
    <div>
      <Topbar
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "Student"}`}
        subtitle={`${user?.program ?? ""} · ${user?.rollNo ?? ""}`}
      />

      <div className="px-6 py-8 lg:px-10">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <BookOpen size={18} strokeWidth={1.75} className="text-gold" />
            <p className="mt-4 font-display text-3xl text-text">{myCourses.length}</p>
            <p className="mt-1 text-sm text-text-muted">Active courses this semester</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <ClipboardList size={18} strokeWidth={1.75} className="text-teal" />
            <p className="mt-4 font-display text-3xl text-text">{pending.length}</p>
            <p className="mt-1 text-sm text-text-muted">Assignments awaiting submission</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <GraduationCap size={18} strokeWidth={1.75} className="text-rose" />
            <p className="mt-4 font-display text-3xl text-text">—</p>
            <p className="mt-1 text-sm text-text-muted">GPA (available after first semester)</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Continue learning */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl text-text">Your courses this semester</h2>
              <Link href="/dashboard/courses" className="text-xs text-text-muted hover:text-text">
                All courses →
              </Link>
            </div>
            <div className="space-y-3">
              {myCourses.map((c) => (
                <Link
                  key={c.id}
                  href={`/dashboard/courses/${c.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-gold/40"
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 font-display ${colorMap[c.color]}`}>
                    {c.code.split("-")[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-text">{c.title}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                      <div
                        className={`h-full rounded-full ${barMap[c.color]}`}
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-text-faint">{c.progress}%</span>
                </Link>
              ))}
              {myCourses.length === 0 && (
                <p className="rounded-2xl border border-border bg-surface p-5 text-sm text-text-muted">
                  No courses assigned to your program yet — check back once the semester timetable is published.
                </p>
              )}
            </div>
          </div>

          {/* Side column */}
          <div className="space-y-6">
            {inProgress && (
              <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/10 to-transparent p-6">
                <p className="text-xs text-gold">Pick up next</p>
                <h3 className="mt-2 font-display text-lg text-text">{inProgress.title}</h3>
                <p className="mt-1 text-xs text-text-faint">{inProgress.lectures.find((l) => !l.done)?.title}</p>
                <Link
                  href={`/dashboard/courses/${inProgress.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-soft"
                >
                  Resume lecture <ArrowUpRight size={14} />
                </Link>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-text">
                <Megaphone size={16} strokeWidth={1.75} className="text-teal" />
                <h3 className="font-display text-lg">Announcements</h3>
              </div>
              <ul className="mt-4 space-y-4">
                {announcements.map((a) => (
                  <li key={a.id} className="text-sm">
                    <p className="text-text-muted leading-snug">{a.title}</p>
                    <p className="mt-1 text-xs text-text-faint">{a.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
