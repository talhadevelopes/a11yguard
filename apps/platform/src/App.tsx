import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { ThemeProvider } from "./context/ThemeProvider";
import './App.css'
import Header from "./components/Header";

export default function App() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect logic
  const publicPaths = ["/", "/login", "/signup"];
  const isOnPublicPath = publicPaths.includes(location.pathname);

  useEffect(() => {
    if (!isAuthenticated && !isOnPublicPath) {
      // Not logged in and trying to access a protected path
      navigate("/login");
      return;
    }

    if (user && !user.onboarded && location.pathname !== "/onboard") {
      // Logged in but not onboarded, redirect to onboarding page
      navigate("/onboard");
      return;
    }
  }, [isAuthenticated, user, location.pathname, navigate, isOnPublicPath]);

  // If logged in and onboarded, or on a public path, render content
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {user && user.onboarded && <Header />} <Outlet />{" "}
      </ThemeProvider>
    </>
  );
}
