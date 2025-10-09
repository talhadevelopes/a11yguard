import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import WebsiteDetails from "./pages/websites/WebsiteDetailsPage";
import WebsiteMindPage from "./pages/mind/WebsiteMindPage";
import WebsitesPage from "./pages/websites/WebsitesPage";
import TeamManagementPage from "./pages/team_management/TeamManagementPage";
import ReportsPage from "./pages/report/ReportPage";
import OnboardingPage from "./pages/auth/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
     
      {
        path: "manage",
        element: <TeamManagementPage />,
      },
      {
        path: "onboard",
        element: <OnboardingPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "websites",
        children: [
          {
            index: true,
            element: <WebsitesPage />,
          },
          {
            path: ":id",
            element: <WebsiteDetails />,
          },
        ],
      },
      {
        path: "/mind/:websiteId",
        element: <WebsiteMindPage />, 
      },
    ],
  },
]);
