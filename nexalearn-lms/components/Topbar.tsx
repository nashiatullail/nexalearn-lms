import { Bell, Search } from "lucide-react";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5 lg:px-10">
      <div>
        <h1 className="font-display text-2xl text-text">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-text-faint">
          <Search size={15} strokeWidth={1.75} />
          <span>Search courses, handouts…</span>
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-muted hover:text-gold transition-colors">
          <Bell size={16} strokeWidth={1.75} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose" />
        </button>
      </div>
    </header>
  );
}
