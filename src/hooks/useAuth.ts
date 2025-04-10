import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage.getItem("user_token");
      setToken(storedToken);
    }
  }, []);

  return token;
};
