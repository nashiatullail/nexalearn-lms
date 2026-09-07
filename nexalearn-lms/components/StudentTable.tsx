"use client";

import { useState } from "react";
import { UserPlus, UploadCloud } from "lucide-react";

const seed = [
  { id: "s1", name: "Hira Anwar", roll: "AC-2024-CS-0142", program: "BS Computer Science", status: "Active" as const },
  { id: "s2", name: "Zara Malik", roll: "AC-2024-CS-0098", program: "BS Computer Science", status: "Active" as const },
  { id: "s3", name: "Bilal Raza", roll: "AC-2024-CS-0176", program: "BS Computer Science", status: "Active" as const },
  { id: "s4", name: "Sana Malik", roll: "AC-2024-EN-0033", program: "BS English", status: "Active" as const },
  { id: "s5", name: "Ahmed Khan", roll: "AC-2024-BA-0211", program: "BBA Business Administration", status: "Suspended" as const },
];

export default function StudentTable() {
  const [students, setStudents] = useState(seed);

  function toggle(id: string) {
    setStudents((list) =>
      list.map((s) => (s.id === id ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" } : s))
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-soft transition-colors">
          <UserPlus size={15} /> Enroll student
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-muted hover:text-text transition-colors">
          <UploadCloud size={15} /> Bulk upload CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-text-faint">
              <th className="px-5 py-3.5 font-medium">Student</th>
              <th className="px-5 py-3.5 font-medium">Roll No.</th>
              <th className="px-5 py-3.5 font-medium">Program</th>
              <th className="px-5 py-3.5 font-medium">Status</th>
              <th className="px-5 py-3.5 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border bg-ink last:border-0 hover:bg-surface/50">
                <td className="px-5 py-4 text-text">{s.name}</td>
                <td className="px-5 py-4 text-text-faint">{s.roll}</td>
                <td className="px-5 py-4 text-text-muted">{s.program}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${
                      s.status === "Active"
                        ? "border-teal/40 bg-teal/10 text-teal"
                        : "border-rose/40 bg-rose/10 text-rose"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => toggle(s.id)}
                    className="text-xs text-text-faint hover:text-gold transition-colors"
                  >
                    {s.status === "Active" ? "Suspend" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
