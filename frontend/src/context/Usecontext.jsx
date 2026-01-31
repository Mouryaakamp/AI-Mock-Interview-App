import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function Usecontext({ children }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}


