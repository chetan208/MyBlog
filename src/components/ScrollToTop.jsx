import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Scroll to top on page refresh
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("load", handleLoad);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
