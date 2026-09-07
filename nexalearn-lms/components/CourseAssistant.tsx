"use client";

import { useState } from "react";
import { Sparkles, Send, FileCheck2, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

export default function CourseAssistant({
  courseTitle,
  handouts = [],
  lectureTitles = [],
}: {
  courseTitle: string;
  handouts?: { id: string; title: string }[];
  lectureTitles?: string[];
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: `Assalam-o-Alaikum! I'm your study assistant for ${courseTitle}. I've indexed this course's uploaded handouts — ask me anything from them.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages: Msg[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          courseTitle,
          contextDocs: [
            handouts.length ? `Handouts uploaded for this course: ${handouts.map((h) => h.title).join(", ")}.` : "",
            lectureTitles.length ? `Lecture topics covered so far: ${lectureTitles.join(", ")}.` : "",
          ].filter(Boolean),
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply ?? data.error ?? "Something went wrong." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Couldn't reach the AI assistant — please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[420px] flex-col rounded-2xl border border-border bg-ink">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm text-text-muted">
        <span className="flex items-center gap-2">
          <Sparkles size={15} className="text-gold" />
          AI Study Assistant — grounded in this course
        </span>
        {handouts.length > 0 && (
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-teal">
            <FileCheck2 size={13} />
            {handouts.length} documents indexed
          </span>
        )}
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto rounded-tr-sm bg-surface-2 text-text"
                : "rounded-tl-sm border border-border bg-surface text-text-muted"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 rounded-xl rounded-tl-sm border border-border bg-surface px-3.5 py-2.5 text-sm text-text-faint w-fit">
            <Loader2 size={13} className="animate-spin" /> Thinking…
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about this course…"
          className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold/50 outline-none"
        />
        <button
          onClick={send}
          disabled={loading}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink hover:bg-gold-soft transition-colors disabled:opacity-60"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
