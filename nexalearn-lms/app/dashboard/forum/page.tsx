import Topbar from "@/components/Topbar";
import ForumList from "@/components/ForumList";

export default function ForumPage() {
  return (
    <div>
      <Topbar title="Discussion Forum" subtitle="Ask questions, help classmates, get AI-assisted answers" />
      <div className="px-6 py-8 lg:px-10">
        <ForumList />
      </div>
    </div>
  );
}
