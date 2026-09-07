"use client";

import { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import { courses } from "@/lib/data";

type Sent = { text: string; audience: string; time: string };

export default function AnnouncementComposer() {
  const [text, setText] = useState("");
  const [audience, setAudience] = useState("All students");
  const [sent, setSent] = useState<Sent[]>([
    { text: "Mid-term result cards released for EDU-305", audience: "EDU-305 students", time: "2 hours ago" },
    { text: "New handout uploaded in CS-401: Lab Manual", audience: "CS-401 students", time: "1 day ago" },
  ]);

  function send() {
    if (!text.trim()) return;
    setSent((s) => [{ text: text.trim(), audience, time: "just now" }, ...s]);
    setText("");
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-2 text-text">
          <Megaphone size={17} className="text-gold" />
          <h3 className="font-display text-lg">Broadcast an announcement</h3>
        </div>
        <p className="mb-2 mt-5 text-xs uppercase tracking-wide text-text-faint">Audience</p>
        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="w-full rounded-lg border border-border bg-ink px-3 py-2.5 text-sm text-text outline-none focus:border-gold/40"
        >
          <option>All students</option>
          {courses.map((c) => (
            <option key={c.id}>{c.code} students</option>
          ))}
        </select>
        <p className="mb-2 mt-5 text-xs uppercase tracking-wide text-text-faint">Message</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="e.g. Assignment deadline extended by 3 days…"
          className="w-full resize-none rounded-lg border border-border bg-ink px-3 py-2.5 text-sm text-text placeholder:text-text-faint outline-none focus:border-gold/40"
        />
        <button
          onClick={send}
          className="mt-4 flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-soft transition-colors"
        >
          <Send size={15} /> Send announcement
        </button>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-text-faint">Recently sent</p>
        <div className="space-y-3">
          {sent.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-sm text-text">{s.text}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-text-faint">
                <span>{s.audience}</span>
                <span>{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
