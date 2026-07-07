
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

/* PREMIUM EFFECTS */

import CursorGlow from "./components/common/CursorGlow";

import FloatingParticles from "./components/common/FloatingParticles";

import LoadingScreen from "./components/common/LoadingScreen";

/* PUBLIC PAGES */

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

/* DASHBOARD LAYOUT */

import DashboardLayout from "./layouts/DashboardLayout";

/* DASHBOARD PAGES */

import Dashboard from "./pages/Dashboard";

import Interview from "./pages/Interview";

import Analytics from "./pages/Analytics";

import Settings from "./pages/Settings";

import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  /* AUTH CHECK */

 const token =
  localStorage.getItem("token");

  const user =
  localStorage.getItem("aiUser");
  /* LOADING */

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      
      {/* PREMIUM EFFECTS */}

      <CursorGlow />

      <FloatingParticles />

      {/* ROUTES */}

      <Routes>
        
        {/* PUBLIC */}

        <Route
          path="/"
          element={<Landing />}
        />

       <Route
         path="/login"
          element={<Login />}
      />
      
        <Route
            path="/signup"
             element={<Signup />}
        />

        {/* DASHBOARD */}

        <Route
            path="/dashboard"
          element={
           token && user ? (
          <DashboardLayout />
          ) : (
           <Navigate
             to="/login"
            replace
          />
         )
        }
      >
          
          {/* HOME */}

          <Route
            index
            element={<Dashboard />}
          />

          {/* INTERVIEW */}

          <Route
            path="interview"
            element={<Interview />}
          />

          {/* ANALYTICS */}

          <Route
            path="analytics"
            element={<Analytics />}
          />

          {/* RESUME */}

          <Route
            path="resume"
            element={
              <ResumeAnalyzer />
            }
          />

          {/* SETTINGS */}

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

