import Topbar from "@/components/Topbar";
import { Wallet } from "lucide-react";

const fees = [
  { student: "Hira Anwar", program: "BS Computer Science", amount: "PKR 24,000", status: "Paid", date: "02 Aug 2026" },
  { student: "Zara Malik", program: "BS Computer Science", amount: "PKR 24,000", status: "Paid", date: "01 Aug 2026" },
  { student: "Bilal Raza", program: "BS Computer Science", amount: "PKR 24,000", status: "Pending", date: "Due 10 Sep 2026" },
  { student: "Sana Malik", program: "BS English", amount: "PKR 21,000", status: "Paid", date: "28 Jul 2026" },
  { student: "Ahmed Khan", program: "BBA Business Administration", amount: "PKR 26,500", status: "Overdue", date: "Was due 20 Aug 2026" },
];

const statusStyle: Record<string, string> = {
  Paid: "text-teal border-teal/40 bg-teal/10",
  Pending: "text-gold border-gold/40 bg-gold/10",
  Overdue: "text-rose border-rose/40 bg-rose/10",
};

export default function AdminFeesPage() {
  return (
    <div>
      <Topbar title="Fee Tracker" subtitle="Semester fee status across all enrolled students" />
      <div className="px-6 py-8 lg:px-10">
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-border bg-surface p-6">
          <Wallet size={22} className="text-gold" />
          <div>
            <p className="font-display text-2xl text-text">PKR 95,500</p>
            <p className="text-xs text-text-faint">Collected this semester · 1 payment overdue</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-text-faint">
                <th className="px-5 py-3.5 font-medium">Student</th>
                <th className="px-5 py-3.5 font-medium">Program</th>
                <th className="px-5 py-3.5 font-medium">Amount</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.student} className="border-b border-border bg-ink last:border-0 hover:bg-surface/50">
                  <td className="px-5 py-4 text-text">{f.student}</td>
                  <td className="px-5 py-4 text-text-muted">{f.program}</td>
                  <td className="px-5 py-4 text-text-muted">{f.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${statusStyle[f.status]}`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-faint">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
