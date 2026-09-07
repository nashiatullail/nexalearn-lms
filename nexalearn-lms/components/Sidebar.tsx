"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Sparkles,
  Landmark,
  LogOut,
  PencilRuler,
  CalendarClock,
  MessagesSquare,
  Trophy,
  ShieldCheck,
  Camera,
} from "lucide-react";
import { useUser } from "@/components/UserProvider";

const mainNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/dashboard/results", label: "Results", icon: GraduationCap },
  { href: "/dashboard/attendance", label: "Attendance", icon: Camera },
];

const aiNav = [
  { href: "/dashboard/ai-assistant", label: "AI Study Assistant", icon: Sparkles },
  { href: "/dashboard/quiz", label: "Quiz Generator", icon: PencilRuler },
  { href: "/dashboard/planner", label: "Study Planner", icon: CalendarClock },
];

const communityNav = [
  { href: "/dashboard/forum", label: "Discussion Forum", icon: MessagesSquare },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
];

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: typeof mainNav;
  pathname: string;
}) {
  return (
    <div className="mb-4">
      <p className="px-3 pb-1.5 text-[0.65rem] uppercase tracking-wider text-text-faint">{label}</p>
      <div className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-surface-3 text-text"
                  : "text-text-muted hover:bg-surface-2 hover:text-text"
              }`}
            >
              <Icon size={17} strokeWidth={1.75} className={active ? "text-gold" : ""} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useUser();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-border bg-surface/60 h-screen sticky top-0 overflow-y-auto">
      <Link href="/" className="flex items-center gap-2.5 px-6 py-6">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Landmark size={17} strokeWidth={1.75} />
        </span>
        <span className="font-display text-[1.15rem] tracking-tight text-text">Nexalearn</span>
      </Link>

      <nav className="flex-1 px-3 py-2">
        <NavGroup label="Campus" items={mainNav} pathname={pathname} />
        <NavGroup label="AI Tools" items={aiNav} pathname={pathname} />
        <NavGroup label="Community" items={communityNav} pathname={pathname} />
      </nav>

      <div className="mx-3 mb-3 space-y-3">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-xs text-text-muted hover:text-text hover:border-gold/40 transition-colors"
        >
          <ShieldCheck size={15} strokeWidth={1.75} className="text-teal" />
          Switch to Admin Panel
        </Link>

        <div className="rounded-xl border border-border bg-surface-2 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 font-display text-gold">
              {user?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-text">{user?.name ?? "Guest"}</p>
              <p className="truncate text-xs text-text-faint">{user?.rollNo ?? ""}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-3 flex items-center gap-2 text-xs text-text-faint hover:text-rose transition-colors"
          >
            <LogOut size={14} strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
