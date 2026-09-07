import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import CourseTabs from "@/components/CourseTabs";
import { courses } from "@/lib/data";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  return (
    <div>
      <Topbar title={course.title} subtitle={`${course.code} · ${course.instructor} · ${course.semester}`} />
      <div className="px-6 py-8 lg:px-10">
        <CourseTabs course={course} />
      </div>
    </div>
  );
}
