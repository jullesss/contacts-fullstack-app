import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../pages/Login/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  token: string;
}

interface AuthContextValues {
  signIn: (data: LoginData) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
}

export const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("my-contacts:token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      navigate("/");
    } else {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setLoading(false);
      navigate("/dashboard");
    }
  }, []);

  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post<LoginResponse>("/login", data);
      const { token } = response.data;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("my-contacts:token", token);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, loading, setLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};
