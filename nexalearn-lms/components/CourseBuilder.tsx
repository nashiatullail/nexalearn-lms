"use client";

import { useState, useRef } from "react";
import { Plus, UploadCloud, FileCheck2, Loader2, BookOpen, Video, Link2, PlayCircle, Trash2 } from "lucide-react";
import { courses as seedCourses } from "@/lib/data";

type Doc = { name: string; status: "indexing" | "ready" };
type LectureVideo = { title: string; source: "youtube" | "vimeo" | "file"; ref: string };

function parseVideoUrl(url: string): { source: "youtube" | "vimeo"; ref: string } | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return { source: "youtube", ref: yt[1] };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { source: "vimeo", ref: vimeo[1] };
  return null;
}

export default function CourseBuilder() {
  const [selected, setSelected] = useState(seedCourses[0].id);
  const [docsByCourse, setDocsByCourse] = useState<Record<string, Doc[]>>({});
  const [videosByCourse, setVideosByCourse] = useState<Record<string, LectureVideo[]>>({});
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const course = seedCourses.find((c) => c.id === selected)!;
  const docs = docsByCourse[selected] ?? [];
  const videos = videosByCourse[selected] ?? [];

  function upload(files: FileList | null) {
    if (!files) return;
    const additions = Array.from(files).map((f) => ({ name: f.name, status: "indexing" as const }));
    setDocsByCourse((d) => ({ ...d, [selected]: [...(d[selected] ?? []), ...additions] }));
    additions.forEach((a) => {
      setTimeout(() => {
        setDocsByCourse((d) => ({
          ...d,
          [selected]: (d[selected] ?? []).map((x) => (x.name === a.name ? { ...x, status: "ready" } : x)),
        }));
      }, 1600);
    });
  }

  function addVideoLink() {
    setVideoError("");
    if (!videoTitle.trim() || !videoUrl.trim()) {
      setVideoError("Add a lecture title and a video link.");
      return;
    }
    const parsed = parseVideoUrl(videoUrl.trim());
    if (!parsed) {
      setVideoError("Couldn't recognise that link — paste a YouTube or Vimeo URL.");
      return;
    }
    setVideosByCourse((v) => ({
      ...v,
      [selected]: [...(v[selected] ?? []), { title: videoTitle.trim(), source: parsed.source, ref: parsed.ref }],
    }));
    setVideoTitle("");
    setVideoUrl("");
  }

  function uploadVideoFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadingFile(true);
    setTimeout(() => {
      setVideosByCourse((v) => ({
        ...v,
        [selected]: [...(v[selected] ?? []), { title: file.name, source: "file", ref: file.name }],
      }));
      setUploadingFile(false);
    }, 1800);
  }

  function removeVideo(i: number) {
    setVideosByCourse((v) => ({ ...v, [selected]: (v[selected] ?? []).filter((_, vi) => vi !== i) }));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <button
          onClick={() => setShowNewForm((s) => !s)}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-3.5 py-2.5 text-sm text-text-muted hover:border-gold/40 hover:text-gold transition-colors"
        >
          <Plus size={15} /> New course
        </button>
        {showNewForm && (
          <div className="mb-4 rounded-xl border border-border bg-surface p-4">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Course title…"
              className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder:text-text-faint outline-none focus:border-gold/40"
            />
            <button
              onClick={() => setShowNewForm(false)}
              className="mt-2 w-full rounded-lg bg-gold px-3 py-2 text-xs font-medium text-ink hover:bg-gold-soft transition-colors"
            >
              Save course (demo)
            </button>
          </div>
        )}
        <div className="space-y-2">
          {seedCourses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${
                c.id === selected ? "border-gold/40 bg-gold/5 text-text" : "border-border text-text-muted hover:text-text"
              }`}
            >
              <BookOpen size={15} className="shrink-0" />
              <span className="truncate">{c.code} — {c.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-display text-lg text-text">{course.title}</h3>
          <p className="mt-1 text-sm text-text-faint">{course.program} · {course.instructor} · {course.credits} credit hours</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
            <span>{course.lectures.length} lectures</span>
            <span>{course.handouts.length} handouts</span>
            <span>{course.progress}% avg. completion</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-display text-lg text-text">Knowledge base for AI tutor</h3>
          <p className="mt-1 text-sm text-text-muted">
            Upload this course&apos;s handouts, slides or past papers. The AI assistant will only answer
            from documents indexed here — nothing outside the syllabus.
          </p>

          <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
          <button
            onClick={() => fileRef.current?.click()}
            className="mt-4 flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2.5 text-sm text-text-muted hover:border-teal/40 hover:text-teal transition-colors"
          >
            <UploadCloud size={15} /> Upload documents
          </button>

          <div className="mt-4 space-y-2">
            {course.handouts.map((h) => (
              <div key={h.id} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-muted">
                <FileCheck2 size={14} className="shrink-0 text-teal" />
                <span className="truncate">{h.title}</span>
                <span className="ml-auto shrink-0 text-xs text-text-faint">Indexed</span>
              </div>
            ))}
            {docs.map((d) => (
              <div key={d.name} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-muted">
                {d.status === "indexing" ? (
                  <Loader2 size={14} className="shrink-0 animate-spin text-text-faint" />
                ) : (
                  <FileCheck2 size={14} className="shrink-0 text-teal" />
                )}
                <span className="truncate">{d.name}</span>
                <span className="ml-auto shrink-0 text-xs text-text-faint">
                  {d.status === "indexing" ? "Indexing…" : "Indexed"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="flex items-center gap-2 font-display text-lg text-text">
            <Video size={17} className="text-gold" />
            Lecture videos
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Add a lecture by pasting a YouTube or Vimeo link, or upload a video file directly
            (for production, files are pushed to Cloudinary or Bunny.net and served from there).
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.3fr_auto]">
            <input
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Lecture title…"
              className="rounded-lg border border-border bg-ink px-3 py-2.5 text-sm text-text placeholder:text-text-faint outline-none focus:border-gold/40"
            />
            <div className="flex items-center gap-2 rounded-lg border border-border bg-ink px-3 py-2.5">
              <Link2 size={14} className="shrink-0 text-text-faint" />
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste YouTube or Vimeo URL…"
                className="w-full bg-transparent text-sm text-text placeholder:text-text-faint outline-none"
              />
            </div>
            <button
              onClick={addVideoLink}
              className="rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold-soft transition-colors"
            >
              Add
            </button>
          </div>
          {videoError && <p className="mt-2 text-xs text-rose">{videoError}</p>}

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-text-faint">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <input
            ref={videoFileRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => uploadVideoFile(e.target.files)}
          />
          <button
            onClick={() => videoFileRef.current?.click()}
            disabled={uploadingFile}
            className="mt-4 flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2.5 text-sm text-text-muted hover:border-teal/40 hover:text-teal transition-colors disabled:opacity-60"
          >
            {uploadingFile ? <Loader2 size={15} className="animate-spin" /> : <UploadCloud size={15} />}
            {uploadingFile ? "Uploading to cloud storage…" : "Upload video file"}
          </button>

          {(course.lectures.length > 0 || videos.length > 0) && (
            <div className="mt-4 space-y-2">
              {course.lectures.map((l) => (
                <div key={l.id} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-muted">
                  <PlayCircle size={14} className="shrink-0 text-teal" />
                  <span className="truncate">{l.title}</span>
                  <span className="ml-auto shrink-0 text-xs text-text-faint">Published</span>
                </div>
              ))}
              {videos.map((v, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-muted">
                  <PlayCircle size={14} className="shrink-0 text-gold" />
                  <span className="truncate">{v.title}</span>
                  <span className="ml-auto shrink-0 text-xs text-text-faint capitalize">{v.source}</span>
                  <button onClick={() => removeVideo(i)} className="shrink-0 text-text-faint hover:text-rose">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
