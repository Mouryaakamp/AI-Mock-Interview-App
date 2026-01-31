import { createContext, useState } from "react";

export const AuthContext = createContext(); 

export default function Usecontext({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}


