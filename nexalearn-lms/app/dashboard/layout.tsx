import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import UserProvider from "@/components/UserProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider redirectTo="/signin">
      <div className="flex min-h-screen bg-ink">
        <Sidebar />
        <div className="flex-1 min-w-0 pb-16 lg:pb-0">{children}</div>
        <MobileNav />
      </div>
    </UserProvider>
  );
}
