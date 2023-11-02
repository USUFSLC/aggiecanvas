import React, { useContext, useState, createContext, useEffect } from "react";
import { Client as AggieCanvasClient } from "@/aggiecanvas-openapi";
import { useAggieCanvasClient } from "./AggieCanvasClient";

export interface User {
  username: string;
}

export interface authContext {
  user: null | User;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<authContext>({
  user: null,
  logout: async () => {},
  refreshUser: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { clientInitializer, client } = useAggieCanvasClient();

  const logout = async () => {
    return new Promise<void>((res) =>
      client.getAuthLogout().then(() =>
        setUser(() => {
          res();
          return null;
        })
      )
    );
  };

  const refreshUser = async (givenClient: AggieCanvasClient = client) => {
    givenClient
      .getAuthMe()
      .then((resp) => {
        const data = resp.data;
        if (data && data.username) {
          setUser({
            username: data.username,
          });
        }
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    clientInitializer.then(refreshUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
