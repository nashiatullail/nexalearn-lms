"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  FileText,
  Download,
  Sparkles,
  Headphones,
  MessageSquare,
  Send,
} from "lucide-react";
import CourseAssistant from "@/components/CourseAssistant";
import type { Course } from "@/lib/data";

const tabs = ["Lectures", "Handouts", "Discussion", "AI Assistant"] as const;

const seedThread = [
  { author: "Bilal R.", text: "Can someone explain why the loop in the second example never terminates?", time: "3h ago" },
  { author: "Instructor — Dr. Ayesha", text: "Good catch — the counter needs to be incremented inside the loop body. I've added a note to the handout.", time: "2h ago" },
];

export default function CourseTabs({ course }: { course: Course }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Lectures");
  const [nowPlaying, setNowPlaying] = useState(course.lectures[0]);
  const [thread, setThread] = useState(seedThread);
  const [reply, setReply] = useState("");

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
              active === t ? "bg-surface-3 text-text" : "text-text-faint hover:text-text-muted"
            }`}
          >
            {t === "AI Assistant" && <Sparkles size={13} />}
            {t}
          </button>
        ))}
      </div>

      {active === "Lectures" && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2">
              <iframe
                key={nowPlaying.id}
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${nowPlaying.youtubeId}`}
                title={nowPlaying.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-text-muted">{nowPlaying.title} · {nowPlaying.duration}</p>
              <button className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-text-faint hover:text-gold hover:border-gold/40 transition-colors">
                <Headphones size={13} />
                AI audio summary
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {course.lectures.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setNowPlaying(l)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                  nowPlaying.id === l.id
                    ? "border-gold/40 bg-gold/5"
                    : "border-border bg-surface hover:border-border"
                }`}
              >
                {l.done ? (
                  <CheckCircle2 size={17} className="shrink-0 text-teal" />
                ) : (
                  <Circle size={17} className="shrink-0 text-text-faint" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-text">{i + 1}. {l.title}</p>
                  <p className="text-xs text-text-faint">{l.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {active === "Handouts" && (
        <div className="mt-6 space-y-2">
          {course.handouts.map((h) => (
            <div
              key={h.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5"
            >
              <FileText size={17} className="shrink-0 text-teal" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-text">{h.title}</p>
                <p className="text-xs text-text-faint">{h.size}</p>
              </div>
              <Download size={15} className="shrink-0 text-text-faint" />
            </div>
          ))}
        </div>
      )}

      {active === "Discussion" && (
        <div className="mt-6 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-text-muted">
            <MessageSquare size={15} className="text-teal" />
            {thread.length} replies in this course&apos;s discussion
          </div>
          <div className="space-y-3">
            {thread.map((m, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text">{m.author}</p>
                  <p className="text-xs text-text-faint">{m.time}</p>
                </div>
                <p className="mt-1.5 text-sm text-text-muted">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && reply.trim()) {
                  setThread((t) => [...t, { author: "You", text: reply.trim(), time: "just now" }]);
                  setReply("");
                }
              }}
              placeholder="Ask your classmates or instructor…"
              className="flex-1 rounded-full border border-border bg-ink px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-gold/50 outline-none"
            />
            <button
              onClick={() => {
                if (!reply.trim()) return;
                setThread((t) => [...t, { author: "You", text: reply.trim(), time: "just now" }]);
                setReply("");
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink hover:bg-gold-soft transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {active === "AI Assistant" && (
        <div className="mt-6">
          <CourseAssistant
            courseTitle={course.title}
            handouts={course.handouts}
            lectureTitles={course.lectures.map((l) => l.title)}
          />
        </div>
      )}
    </div>
  );
}
