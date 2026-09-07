"use client";

import { useState, useRef } from "react";
import { Sparkles, Send, BookOpen, UploadCloud, FileCheck2, Loader2 } from "lucide-react";
import { courses } from "@/lib/data";

type Msg = { role: "user" | "assistant"; text: string };

const suggestions = [
  "Summarise Unit 2 in simple words",
  "Give me 5 possible exam questions",
  "Explain this like I'm a first-year student",
];

export default function AssistantFull() {
  const [courseId, setCourseId] = useState(courses[0].id);
  const course = courses.find((c) => c.id === courseId)!;
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: `Assalam-o-Alaikum! I'm ready to help with ${course.title}. Ask me anything from the lectures or handouts you've uploaded.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [uploaded, setUploaded] = useState<{ name: string; status: "indexing" | "ready" }[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    const names = Array.from(files).map((f) => ({ name: f.name, status: "indexing" as const }));
    setUploaded((u) => [...u, ...names]);
    names.forEach((n) => {
      setTimeout(() => {
        setUploaded((u) => u.map((x) => (x.name === n.name ? { ...x, status: "ready" } : x)));
      }, 1400);
    });
  }

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || loading) return;
    const nextMessages: Msg[] = [...messages, { role: "user", text: value }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          courseTitle: course.title,
          contextDocs: [
            course.handouts.length
              ? `Handouts uploaded for this course: ${course.handouts.map((h) => h.title).join(", ")}.`
              : "",
            `Lecture topics covered so far: ${course.lectures.map((l) => l.title).join(", ")}.`,
            uploaded.length ? `Student's own uploaded notes: ${uploaded.map((u) => u.name).join(", ")}.` : "",
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-text-faint">Choose a course</p>
        <div className="space-y-2">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCourseId(c.id);
                setMessages([
                  {
                    role: "assistant",
                    text: `Assalam-o-Alaikum! I'm ready to help with ${c.title}. Ask me anything from the lectures or handouts you've uploaded.`,
                  },
                ]);
              }}
              className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${
                c.id === courseId
                  ? "border-gold/40 bg-gold/5 text-text"
                  : "border-border bg-surface text-text-muted hover:text-text"
              }`}
            >
              <BookOpen size={15} className="shrink-0" />
              <span className="truncate">{c.title}</span>
            </button>
          ))}
        </div>

        <p className="mt-6 mb-3 text-xs uppercase tracking-wide text-text-faint">Add your own notes</p>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-3.5 py-3 text-xs text-text-faint hover:border-gold/40 hover:text-gold transition-colors"
        >
          <UploadCloud size={15} />
          Upload PDF / notes
        </button>
        {uploaded.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {uploaded.map((f) => (
              <div key={f.name} className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-2 text-xs text-text-muted">
                {f.status === "indexing" ? (
                  <Loader2 size={12} className="animate-spin text-text-faint" />
                ) : (
                  <FileCheck2 size={12} className="text-teal" />
                )}
                <span className="truncate">{f.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex h-[540px] flex-col rounded-2xl border border-border bg-ink">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5 text-sm text-text-muted">
          <Sparkles size={15} className="text-gold" />
          Grounded in {course.code} — {course.title}
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto rounded-tr-sm bg-surface-2 text-text"
                  : "rounded-tl-sm border border-border bg-surface text-text-muted"
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 rounded-xl rounded-tl-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-faint w-fit">
              <Loader2 size={13} className="animate-spin" /> Thinking…
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-text-faint hover:text-gold hover:border-gold/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-border p-3.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={`Ask something about ${course.code}…`}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-gold/50 outline-none"
          />
          <button
            onClick={() => send()}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink hover:bg-gold-soft transition-colors disabled:opacity-60"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
