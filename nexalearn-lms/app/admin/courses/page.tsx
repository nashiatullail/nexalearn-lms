import Topbar from "@/components/Topbar";
import CourseBuilder from "@/components/CourseBuilder";

export default function AdminCoursesPage() {
  return (
    <div>
      <Topbar title="Course Builder" subtitle="Manage courses and the documents your AI tutor learns from" />
      <div className="px-6 py-8 lg:px-10">
        <CourseBuilder />
      </div>
    </div>
  );
}
