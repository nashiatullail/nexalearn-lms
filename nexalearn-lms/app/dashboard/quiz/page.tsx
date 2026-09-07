import Topbar from "@/components/Topbar";
import QuizGenerator from "@/components/QuizGenerator";

export default function QuizPage() {
  return (
    <div>
      <Topbar title="AI Quiz Generator" subtitle="Turn any course into a graded practice quiz in seconds" />
      <div className="px-6 py-8 lg:px-10">
        <QuizGenerator />
      </div>
    </div>
  );
}
