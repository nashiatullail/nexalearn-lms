import Topbar from "@/components/Topbar";
import AttendanceQR from "@/components/AttendanceQR";

export default function AdminAttendancePage() {
  return (
    <div>
      <Topbar title="Attendance" subtitle="Generate a QR code for students to scan and check in" />
      <div className="px-6 py-8 lg:px-10">
        <AttendanceQR />
      </div>
    </div>
  );
}