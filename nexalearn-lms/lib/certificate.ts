import jsPDF from "jspdf";

export function generateCertificate({
  studentName,
  courseTitle,
  program,
  rollNo,
  completionDate,
}: {
  studentName: string;
  courseTitle: string;
  program: string;
  rollNo: string;
  completionDate?: string;
}) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const gold = "#E3B23C";
  const ink = "#0D1128";
  const muted = "#6C73A3";

  doc.setFillColor(ink);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setDrawColor(gold);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setLineWidth(0.3);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  doc.setTextColor(gold);
  doc.setFont("times", "bold");
  doc.setFontSize(28);
  doc.text("NEXALEARN UNIVERSITY", pageWidth / 2, 38, { align: "center" });

  doc.setTextColor(muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("AI Campus — Certificate of Completion", pageWidth / 2, 46, { align: "center" });

  doc.setTextColor("#F3F4FA");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("This certifies that", pageWidth / 2, 68, { align: "center" });

  doc.setFont("times", "bolditalic");
  doc.setFontSize(30);
  doc.setTextColor(gold);
  doc.text(studentName, pageWidth / 2, 82, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor("#F3F4FA");
  doc.text(`has successfully completed the course`, pageWidth / 2, 96, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(courseTitle, pageWidth / 2, 106, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(muted);
  doc.text(`${program} · Roll No. ${rollNo}`, pageWidth / 2, 114, { align: "center" });

  const issued = completionDate ?? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  doc.setFontSize(10);
  doc.setTextColor("#F3F4FA");
  doc.text(`Issued on ${issued}`, pageWidth / 2, 132, { align: "center" });

  doc.setDrawColor(muted);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 35, 148, pageWidth / 2 + 35, 148);
  doc.setFontSize(9);
  doc.setTextColor(muted);
  doc.text("Registrar, Nexalearn University", pageWidth / 2, 154, { align: "center" });

  doc.save(`${studentName.replace(/\s+/g, "_")}_${courseTitle.replace(/\s+/g, "_")}_Certificate.pdf`);
}