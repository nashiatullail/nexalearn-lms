import Topbar from "@/components/Topbar";
import AttendanceScanner from "@/components/AttendanceScanner";

export default function StudentAttendancePage() {
  return (
    <div>
      <Topbar title="Mark Attendance" subtitle="Scan your instructor's QR code to check in to class" />
      <div className="px-6 py-8 lg:px-10 max-w-lg">
        <AttendanceScanner />
      </div>
    </div>
  );
}