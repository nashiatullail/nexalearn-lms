import Topbar from "@/components/Topbar";
import StudentTable from "@/components/StudentTable";

export default function AdminStudentsPage() {
  return (
    <div>
      <Topbar title="Students" subtitle="Enroll, manage and monitor every student on the campus" />
      <div className="px-6 py-8 lg:px-10">
        <StudentTable />
      </div>
    </div>
  );
}
