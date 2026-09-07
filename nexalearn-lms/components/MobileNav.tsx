"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BookOpen, ClipboardList, GraduationCap, Sparkles } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", icon: LayoutGrid },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/assignments", label: "Tasks", icon: ClipboardList },
  { href: "/dashboard/results", label: "Results", icon: GraduationCap },
  { href: "/dashboard/ai-assistant", label: "AI Tutor", icon: Sparkles },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 flex lg:hidden border-t border-border bg-surface/95 backdrop-blur">
      {nav.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.65rem] ${
              active ? "text-gold" : "text-text-faint"
            }`}
          >
            <Icon size={17} strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
