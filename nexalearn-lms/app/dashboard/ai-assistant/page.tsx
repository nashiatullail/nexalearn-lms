import Topbar from "@/components/Topbar";
import AssistantFull from "@/components/AssistantFull";

export default function AiAssistantPage() {
  return (
    <div>
      <Topbar title="AI Study Assistant" subtitle="Grounded answers from your own course lectures and handouts" />
      <div className="px-6 py-8 lg:px-10">
        <AssistantFull />
      </div>
    </div>
  );
}
