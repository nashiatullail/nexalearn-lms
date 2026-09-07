"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut, type StoredUser } from "@/lib/auth";

type UserContextValue = {
  user: StoredUser | null;
  loading: boolean;
  logout: () => void;
};

const UserContext = createContext<UserContextValue>({ user: null, loading: true, logout: () => {} });

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
  redirectTo = "/signin",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const current = getCurrentUser();
    if (!current) {
      router.replace(redirectTo);
      return;
    }
    setUser(current);
    setLoading(false);
  }, [router, redirectTo]);

  function logout() {
    signOut();
    router.replace("/signin");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-sm text-text-faint">
        Loading your campus…
      </div>
    );
  }

  return <UserContext.Provider value={{ user, loading, logout }}>{children}</UserContext.Provider>;
}
