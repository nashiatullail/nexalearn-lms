"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Camera, XCircle } from "lucide-react";

export default function AttendanceScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [scannedCode, setScannedCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let scanner: import("html5-qrcode").Html5Qrcode | null = null;

    async function start() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (!containerRef.current) return;
        scanner = new Html5Qrcode(containerRef.current.id);
        setStatus("scanning");
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 240 },
          (decodedText) => {
            setScannedCode(decodedText);
            setStatus("success");
            scanner?.stop().catch(() => {});
          },
          () => {
            // ignore per-frame scan failures — expected while camera searches for a code
          }
        );
      } catch (err) {
        console.error("Camera/scanner error:", err);
        setError("Couldn't access the camera. Check browser permissions and try again.");
        setStatus("error");
      }
    }

    start();

    return () => {
      scanner?.stop().catch(() => {});
    };
  }, []);

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/5 p-8 text-center">
        <CheckCircle2 size={32} className="mx-auto text-teal" />
        <p className="mt-3 text-lg text-text">Attendance marked</p>
        <p className="mt-1 text-sm text-text-faint">Session code: {scannedCode}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="mb-3 flex items-center gap-2 text-sm text-text-muted">
          <Camera size={15} className="text-gold" />
          Point your camera at the attendance QR code shown by your instructor
        </div>
        <div id="attendance-qr-reader" ref={containerRef} className="overflow-hidden rounded-xl" />
      </div>
      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose/30 bg-rose/5 p-4 text-sm text-rose">
          <XCircle size={15} />
          {error}
        </div>
      )}
    </div>
  );
}