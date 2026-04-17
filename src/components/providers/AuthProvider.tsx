// providers/session-provider.tsx
"use client";

import { getCurrentUser } from "@/lib/auth";
import { LoggedInUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<{
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
  isLoading: boolean;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  const initialzeUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };

  useEffect(() => {
    initialzeUser();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        isLoading: false,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within an AuthProvider");

  return context;
};
