"use client";

import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { getCookie } from "cookies-next";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const jwt = getCookie("opentablejwt");
      if (!jwt) {
        return setAuthState({ data: null, error: null, loading: false });
      }

      const fetchResponse = await axios.get(
        `${process.env.OPEN_TABLE_API_URL}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      ///// to set the header to all subsequent axios calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        data: fetchResponse.data,
        error: null,
        loading: false,
      });
    } catch (err: any) {
      setAuthState({
        data: null,
        error: err.response.data.errorMessage,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
