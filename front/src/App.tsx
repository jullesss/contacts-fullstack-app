import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";
import GlobalStyle from "./styles/globalStyle";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </>
  );
};
