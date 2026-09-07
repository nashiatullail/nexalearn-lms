import Topbar from "@/components/Topbar";
import AnnouncementComposer from "@/components/AnnouncementComposer";

export default function AdminAnnouncementsPage() {
  return (
    <div>
      <Topbar title="Announcements" subtitle="Broadcast updates to a course or the whole campus" />
      <div className="px-6 py-8 lg:px-10">
        <AnnouncementComposer />
      </div>
    </div>
  );
}
