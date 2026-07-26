import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CursorGlow from "./components/common/CursorGlow";
import ScrollToTop from "./components/common/ScrollToTop";
import FloatingParticles from "./components/common/FloatingParticles";
import LoadingScreen from "./components/common/LoadingScreen";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Feedback from "./pages/Feedback";

import { useAuth } from "./context/AuthContext";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("aiUser");
  return token && user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [appLoading, setAppLoading] = useState(true);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (appLoading || authLoading) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
      <CursorGlow />
      <FloatingParticles />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="interview" element={<Interview />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="resume" element={<ResumeAnalyzer />} />
          <Route path="settings" element={<Settings />} />
          <Route path="feedback/:interviewId" element={<Feedback />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
