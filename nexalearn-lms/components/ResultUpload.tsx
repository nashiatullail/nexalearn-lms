"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { courses } from "@/lib/data";

type Row = { student: string; midterm: number; assignment: number; final: number };

const seedRows: Record<string, Row[]> = {
  cs101: [
    { student: "Hira Anwar", midterm: 27, assignment: 18, final: 0 },
    { student: "Zara Malik", midterm: 29, assignment: 19, final: 0 },
    { student: "Bilal Raza", midterm: 18, assignment: 14, final: 0 },
  ],
};

export default function ResultUpload() {
  const [courseId, setCourseId] = useState(courses[0].id);
  const [rows, setRows] = useState<Row[]>(seedRows[courses[0].id] ?? []);
  const [saved, setSaved] = useState(false);

  function selectCourse(id: string) {
    setCourseId(id);
    setRows(seedRows[id] ?? []);
    setSaved(false);
  }

  function update(i: number, field: keyof Row, value: number) {
    setRows((r) => r.map((row, ri) => (ri === i ? { ...row, [field]: value } : row)));
    setSaved(false);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCourse(c.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              courseId === c.id ? "border-gold/40 bg-gold/10 text-text" : "border-border text-text-muted hover:text-text"
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-text-muted">
          No marks entered yet for this course in the demo dataset — select CS-401 to see a filled example.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-text-faint">
                <th className="px-5 py-3.5 font-medium">Student</th>
                <th className="px-5 py-3.5 font-medium">Mid-term (30)</th>
                <th className="px-5 py-3.5 font-medium">Assignments (20)</th>
                <th className="px-5 py-3.5 font-medium">Final (50)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.student} className="border-b border-border bg-ink last:border-0">
                  <td className="px-5 py-3 text-text">{r.student}</td>
                  {(["midterm", "assignment", "final"] as const).map((field) => (
                    <td key={field} className="px-5 py-3">
                      <input
                        type="number"
                        value={r[field]}
                        onChange={(e) => update(i, field, Number(e.target.value))}
                        className="w-20 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-text outline-none focus:border-gold/40"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && (
        <button
          onClick={() => setSaved(true)}
          className="mt-5 flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-soft transition-colors"
        >
          <Save size={15} /> Publish results
        </button>
      )}
      {saved && <p className="mt-3 text-sm text-teal">Results published — students will see them on their Results page.</p>}
    </div>
  );
}
