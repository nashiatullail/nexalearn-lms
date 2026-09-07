import Topbar from "@/components/Topbar";
import { Flame, Award, Trophy, Star, BookMarked, Target } from "lucide-react";

const badges = [
  { icon: Flame, label: "7-day streak", earned: true },
  { icon: BookMarked, label: "First course completed", earned: true },
  { icon: Target, label: "5 quizzes passed", earned: true },
  { icon: Star, label: "Top 10% in class", earned: false },
  { icon: Award, label: "Assignment perfectionist", earned: false },
];

const leaderboard = [
  { rank: 1, name: "Zara Malik", points: 2840 },
  { rank: 2, name: "Hira Anwar", points: 2695, isYou: true },
  { rank: 3, name: "Usman Tariq", points: 2510 },
  { rank: 4, name: "Ayesha Noor", points: 2320 },
  { rank: 5, name: "Bilal Raza", points: 2180 },
];

export default function LeaderboardPage() {
  return (
    <div>
      <Topbar title="Leaderboard & Badges" subtitle="Stay motivated with streaks, badges and class rankings" />
      <div className="px-6 py-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gold/25 bg-gold/5 p-6">
              <Flame size={28} className="text-gold" />
              <div>
                <p className="font-display text-2xl text-text">7-day streak</p>
                <p className="text-xs text-text-faint">Keep it going — log in tomorrow to reach 8</p>
              </div>
            </div>

            <p className="mb-3 text-xs uppercase tracking-wide text-text-faint">Your badges</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center ${
                    b.earned ? "border-gold/30 bg-surface" : "border-border bg-surface/40 opacity-40"
                  }`}
                >
                  <b.icon size={20} className={b.earned ? "text-gold" : "text-text-faint"} />
                  <p className="text-xs text-text-muted">{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-text-faint">
              <Trophy size={13} className="text-teal" />
              Class leaderboard — BS Computer Science, Semester 3
            </p>
            <div className="overflow-hidden rounded-2xl border border-border">
              {leaderboard.map((l) => (
                <div
                  key={l.rank}
                  className={`flex items-center justify-between border-b border-border px-5 py-4 last:border-0 ${
                    l.isYou ? "bg-gold/5" : "bg-ink"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-display text-lg ${l.rank <= 3 ? "text-gold" : "text-text-faint"}`}>
                      #{l.rank}
                    </span>
                    <span className="text-sm text-text">
                      {l.name} {l.isYou && <span className="text-xs text-teal">(you)</span>}
                    </span>
                  </div>
                  <span className="text-sm text-text-muted">{l.points.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
