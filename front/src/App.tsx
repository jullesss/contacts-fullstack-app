import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";
import GlobalStyle from "./styles/globalStyle";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
};
