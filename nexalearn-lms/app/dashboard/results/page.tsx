"use client";

import Topbar from "@/components/Topbar";
import CertificateButton from "@/components/CertificateButton";
import { results } from "@/lib/data";
import { useUser } from "@/components/UserProvider";

export default function ResultsPage() {
  const { user } = useUser();

  return (
    <div>
      <Topbar title="Results" subtitle="Autumn 2026 — mid-term and cumulative standing" />
      <div className="px-6 py-8 lg:px-10">
        <div className="mb-6 flex flex-wrap gap-5">
          <div className="rounded-2xl border border-border bg-surface px-6 py-5">
            <p className="text-xs text-text-faint">Cumulative GPA</p>
            <p className="mt-1 font-display text-2xl text-gold">3.71</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface px-6 py-5">
            <p className="text-xs text-text-faint">Credit hours completed</p>
            <p className="mt-1 font-display text-2xl text-teal">42 / 132</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface px-6 py-5">
            <p className="text-xs text-text-faint">Semester standing</p>
            <p className="mt-1 font-display text-2xl text-text">Good standing</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-text-faint">
                <th className="px-5 py-3.5 font-medium">Course</th>
                <th className="px-5 py-3.5 font-medium">Mid-term (30)</th>
                <th className="px-5 py-3.5 font-medium">Assignments (20)</th>
                <th className="px-5 py-3.5 font-medium">Final (50)</th>
                <th className="px-5 py-3.5 font-medium">Grade</th>
                <th className="px-5 py-3.5 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.course} className="border-b border-border bg-ink last:border-0 hover:bg-surface/50">
                  <td className="px-5 py-4 text-text">{r.course}</td>
                  <td className="px-5 py-4 text-text-muted">{r.midterm ?? "—"}</td>
                  <td className="px-5 py-4 text-text-muted">{r.assignment ?? "—"}</td>
                  <td className="px-5 py-4 text-text-muted">{r.final ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={r.grade === "A" ? "text-gold" : "text-text-faint"}>{r.grade}</span>
                  </td>
                  <td className="px-5 py-4">
                    {r.grade !== "In progress" && user && (
                      <CertificateButton
                        studentName={user.name}
                        courseTitle={r.course}
                        program={user.program}
                        rollNo={user.rollNo}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}