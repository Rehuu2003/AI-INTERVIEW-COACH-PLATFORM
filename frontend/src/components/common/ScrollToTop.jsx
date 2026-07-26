import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the dashboard main content container if it exists
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "instant" });
    } else {
      // Fallback for pages outside dashboard (landing, login, signup)
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
