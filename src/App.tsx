import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import RoutesComponent from "./routes";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  // State to store the user object, initialized as null
  const [user, setUser] = useState<{
    firstname: string;
    lastname: string;
  } | null>(null);

  // useEffect to check if a user is stored in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user if found in localStorage
    }
  }, []);

  // Handle user login and store user data in localStorage
  const handleLogin = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
    setUser(userData); // Set the user state
  };

  // Handle user logout by removing user data from localStorage
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Reset user state to null
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ position: "relative", fontFamily: "Montserrat" }}
    >
      {/* Background image with blur effect */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundImage:
            'url("https://img.freepik.com/free-vector/soft-yellow-color-watercolor-texture-background_1055-17979.jpg?semt=ais_hybrid")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: "-1",
        }}
      />
      {/* Main Router */}
      <Router>
        <ScrollToTop />
        {/* Navbar component with user data and logout function */}
        <Navbar user={user} onLogout={handleLogout} />
        <div className="flex-grow-1">
          {/* Routes for navigation, passing handleLogin for login functionality */}
          <RoutesComponent onLogin={handleLogin} />
        </div>
        {/* Footer component */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
