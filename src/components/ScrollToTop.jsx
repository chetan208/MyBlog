import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // gives current route path

  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to top-left corner
  }, [pathname]); // run effect whenever route changes

  return null; // no UI
};

export default ScrollToTop;
