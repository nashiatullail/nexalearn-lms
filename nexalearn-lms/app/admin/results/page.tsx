import Topbar from "@/components/Topbar";
import ResultUpload from "@/components/ResultUpload";

export default function AdminResultsPage() {
  return (
    <div>
      <Topbar title="Result Upload" subtitle="Enter marks and publish result cards instantly" />
      <div className="px-6 py-8 lg:px-10">
        <ResultUpload />
      </div>
    </div>
  );
}
