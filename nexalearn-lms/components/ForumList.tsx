"use client";

import { useState } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { courses } from "@/lib/data";

const threads = [
  { id: "t1", course: "CS-401", title: "Why does my loop never terminate?", replies: 6, aiAnswered: true, time: "3h ago" },
  { id: "t2", course: "BBA-205", title: "Real-world example of brand positioning in Pakistan?", replies: 4, aiAnswered: true, time: "1d ago" },
  { id: "t3", course: "EDU-305", title: "Difference between formative and summative assessment", replies: 9, aiAnswered: false, time: "1d ago" },
  { id: "t4", course: "ENG-210", title: "How specific should a thesis statement be?", replies: 3, aiAnswered: true, time: "2d ago" },
  { id: "t5", course: "CS-401", title: "Best way to practice before the mid-term?", replies: 11, aiAnswered: false, time: "3d ago" },
];

export default function ForumList() {
  const [filter, setFilter] = useState<string>("All");

  const visible = filter === "All" ? threads : threads.filter((t) => t.course === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("All")}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
            filter === "All" ? "border-gold/40 bg-gold/10 text-text" : "border-border text-text-muted hover:text-text"
          }`}
        >
          All courses
        </button>
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.code)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              filter === c.code ? "border-gold/40 bg-gold/10 text-text" : "border-border text-text-muted hover:text-text"
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] text-text-faint">{t.course}</span>
                <p className="mt-2 text-sm text-text">{t.title}</p>
              </div>
              {t.aiAnswered && (
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-teal/40 bg-teal/10 px-2.5 py-1 text-[0.65rem] text-teal">
                  <Sparkles size={10} /> AI replied
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-text-faint">
              <span className="flex items-center gap-1">
                <MessageSquare size={12} /> {t.replies} replies
              </span>
              <span>{t.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
