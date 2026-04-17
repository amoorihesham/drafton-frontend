// providers/session-provider.tsx
"use client";

import { getCurrentUser } from "@/actions/auth.actions";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<{
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
}>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

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
