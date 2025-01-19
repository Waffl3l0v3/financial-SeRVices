import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Runs whenever the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
