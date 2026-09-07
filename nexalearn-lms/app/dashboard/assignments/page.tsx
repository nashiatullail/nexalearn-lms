import Topbar from "@/components/Topbar";
import { assignments } from "@/lib/data";
import { Clock, CheckCircle2, UploadCloud } from "lucide-react";

const statusStyle: Record<string, string> = {
  pending: "text-rose border-rose/40 bg-rose/10",
  submitted: "text-teal border-teal/40 bg-teal/10",
  graded: "text-gold border-gold/40 bg-gold/10",
};
const statusLabel: Record<string, string> = {
  pending: "Pending",
  submitted: "Submitted",
  graded: "Graded",
};
const statusIcon: Record<string, typeof Clock> = {
  pending: Clock,
  submitted: UploadCloud,
  graded: CheckCircle2,
};

export default function AssignmentsPage() {
  return (
    <div>
      <Topbar title="Assignments" subtitle="Track submissions and deadlines across all courses" />
      <div className="px-6 py-8 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-text-faint">
                <th className="px-5 py-3.5 font-medium">Course</th>
                <th className="px-5 py-3.5 font-medium">Assignment</th>
                <th className="px-5 py-3.5 font-medium">Due date</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => {
                const Icon = statusIcon[a.status];
                return (
                  <tr key={a.id} className="border-b border-border bg-ink last:border-0 hover:bg-surface/50">
                    <td className="px-5 py-4 text-text-faint">{a.course}</td>
                    <td className="px-5 py-4 text-text">{a.title}</td>
                    <td className="px-5 py-4 text-text-muted">{a.due}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${statusStyle[a.status]}`}>
                        <Icon size={12} />
                        {statusLabel[a.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-text-muted">
                      {"grade" in a ? a.grade : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
