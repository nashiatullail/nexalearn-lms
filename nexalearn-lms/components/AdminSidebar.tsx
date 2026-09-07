"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookPlus,
  Users,
  ClipboardEdit,
  Megaphone,
  Wallet,
  Landmark,
  ArrowLeftRight,
  Camera,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Analytics", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Course Builder", icon: BookPlus },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/results", label: "Result Upload", icon: ClipboardEdit },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/fees", label: "Fee Tracker", icon: Wallet },
  { href: "/admin/attendance", label: "Attendance", icon: Camera },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-border bg-surface/60 h-screen sticky top-0">
      <Link href="/" className="flex items-center gap-2.5 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/50 text-teal">
          <Landmark size={17} strokeWidth={1.75} />
        </span>
        <div>
          <span className="font-display text-[1.05rem] tracking-tight text-text">Nexalearn</span>
          <p className="text-[0.65rem] text-text-faint">Admin Panel</p>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {nav.map((item) => {
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
              <Icon size={17} strokeWidth={1.75} className={active ? "text-teal" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-xs text-text-muted hover:text-text hover:border-gold/40 transition-colors"
        >
          <ArrowLeftRight size={15} strokeWidth={1.75} className="text-gold" />
          Switch to Student View
        </Link>
      </div>
    </aside>
  );
}
