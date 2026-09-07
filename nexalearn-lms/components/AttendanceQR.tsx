"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { RefreshCw, Users } from "lucide-react";
import { courses } from "@/lib/data";

export default function AttendanceQR() {
  const [courseId, setCourseId] = useState(courses[0].id);
  const [sessionCode, setSessionCode] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [checkedIn, setCheckedIn] = useState<string[]>([]);

  function newSession() {
    const code = `${courseId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    setSessionCode(code);
    setCheckedIn([]);
  }

  useEffect(() => {
    newSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(() => {
    if (!sessionCode) return;
    QRCode.toDataURL(sessionCode, {
      width: 320,
      margin: 1,
      color: { dark: "#0D1128", light: "#F3F4FA" },
    }).then(setQrDataUrl);
  }, [sessionCode]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-text-faint">Class</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setCourseId(c.id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                courseId === c.id ? "border-gold/40 bg-gold/10 text-text" : "border-border text-text-muted hover:text-text"
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          {qrDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrDataUrl} alt="Attendance QR code" className="mx-auto w-full max-w-[240px] rounded-xl" />
          )}
          <p className="mt-4 text-xs text-text-faint">Session code: {sessionCode}</p>
          <button
            onClick={newSession}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-text-muted hover:text-text transition-colors"
          >
            <RefreshCw size={14} /> Start new session
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-text-faint">
          <Users size={13} className="text-teal" />
          Checked in this session ({checkedIn.length})
        </p>
        <div className="rounded-2xl border border-border bg-surface p-6">
          {checkedIn.length === 0 ? (
            <p className="text-sm text-text-muted">
              No one has scanned yet. Students open Attendance on their dashboard and scan this
              code from their phone.
            </p>
          ) : (
            <ul className="space-y-2">
              {checkedIn.map((name) => (
                <li key={name} className="text-sm text-text">{name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}