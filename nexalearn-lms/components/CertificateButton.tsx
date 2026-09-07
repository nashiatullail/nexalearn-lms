"use client";

import { Award } from "lucide-react";
import { generateCertificate } from "@/lib/certificate";

export default function CertificateButton({
  studentName,
  courseTitle,
  program,
  rollNo,
}: {
  studentName: string;
  courseTitle: string;
  program: string;
  rollNo: string;
}) {
  return (
    <button
      onClick={() => generateCertificate({ studentName, courseTitle, program, rollNo })}
      className="flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-gold hover:bg-gold/15 transition-colors"
    >
      <Award size={15} />
      Download certificate
    </button>
  );
}