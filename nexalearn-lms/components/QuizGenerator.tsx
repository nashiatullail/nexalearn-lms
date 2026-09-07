"use client";

import { useState } from "react";
import { PencilRuler, Sparkles, Loader2, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { courses, quizBank } from "@/lib/data";

type Stage = "setup" | "generating" | "quiz" | "result";

export default function QuizGenerator() {
  const [courseId, setCourseId] = useState(courses[0].id);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [stage, setStage] = useState<Stage>("setup");
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions = quizBank[courseId] ?? [];

  function generate() {
    setStage("generating");
    setAnswers({});
    setTimeout(() => setStage("quiz"), 1300);
  }

  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
  const weakTopics = questions
    .filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.correct)
    .map((q) => q.topic);

  if (stage === "setup" || stage === "generating") {
    return (
      <div className="max-w-xl rounded-2xl border border-border bg-surface p-8">
        <PencilRuler size={22} className="text-gold" />
        <h2 className="mt-4 font-display text-xl text-text">Generate a quiz from a course</h2>
        <p className="mt-2 text-sm text-text-muted">
          Pick a course and a difficulty — the AI builds questions from that course&apos;s lectures and handouts.
        </p>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wide text-text-faint">Course</p>
        <div className="flex flex-wrap gap-2">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setCourseId(c.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                courseId === c.id ? "border-gold/40 bg-gold/10 text-text" : "border-border text-text-muted hover:text-text"
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wide text-text-faint">Difficulty</p>
        <div className="flex gap-2">
          {(["Easy", "Medium", "Hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                difficulty === d ? "border-teal/40 bg-teal/10 text-text" : "border-border text-text-muted hover:text-text"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={stage === "generating"}
          className="mt-8 flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-gold-soft transition-colors disabled:opacity-70"
        >
          {stage === "generating" ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Generating questions…
            </>
          ) : (
            <>
              <Sparkles size={15} /> Generate quiz
            </>
          )}
        </button>
      </div>
    );
  }

  if (stage === "quiz") {
    const answeredAll = questions.every((q) => answers[q.id] !== undefined);
    return (
      <div className="max-w-2xl">
        <p className="mb-5 text-sm text-text-muted">
          {questions.length} questions · {difficulty} difficulty · {courses.find((c) => c.id === courseId)?.code}
        </p>
        <div className="space-y-5">
          {questions.map((q, i) => (
            <div key={q.id} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm text-text">{i + 1}. {q.prompt}</p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    className={`flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors ${
                      answers[q.id] === oi
                        ? "border-gold/40 bg-gold/5 text-text"
                        : "border-border text-text-muted hover:text-text"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStage("result")}
          disabled={!answeredAll}
          className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-gold-soft transition-colors disabled:opacity-40"
        >
          Submit quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
        <p className="text-xs text-gold">Quiz complete</p>
        <p className="mt-2 font-display text-3xl text-text">{score} / {questions.length} correct</p>
      </div>

      <div className="mt-6 space-y-3">
        {questions.map((q, i) => {
          const correct = answers[q.id] === q.correct;
          return (
            <div key={q.id} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              {correct ? (
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal" />
              ) : (
                <XCircle size={17} className="mt-0.5 shrink-0 text-rose" />
              )}
              <div className="min-w-0">
                <p className="text-sm text-text">{i + 1}. {q.prompt}</p>
                <p className="mt-1 text-xs text-text-faint">
                  Correct answer: {q.options[q.correct]} · Topic: {q.topic}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {weakTopics.length > 0 && (
        <div className="mt-6 rounded-2xl border border-rose/30 bg-rose/5 p-5">
          <p className="text-sm text-text">Suggested review topics</p>
          <p className="mt-1.5 text-sm text-text-muted">
            You missed questions on: {Array.from(new Set(weakTopics)).join(", ")}. Revisit these sections
            in the course handouts before your next assessment.
          </p>
        </div>
      )}

      <button
        onClick={() => setStage("setup")}
        className="mt-6 flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text-muted hover:text-text transition-colors"
      >
        <RotateCcw size={14} /> Generate another quiz
      </button>
    </div>
  );
}
