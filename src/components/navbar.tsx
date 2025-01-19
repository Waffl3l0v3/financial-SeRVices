import { useNavigate } from "react-router-dom";

// TypeScript interface for the Navbar props, which includes user data and a logout function
interface NavbarProps {
  user: {
    firstname: string;
    lastname: string;
  } | null;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const navigate = useNavigate(); // Hook for navigation, used for redirecting after logout

  // Function to handle the logout process
  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-$teal-600 pb-3 mb-4"
      style={{ backgroundColor: "#008080", fontFamily: "Montserrat" }}
    >
      <div className="container-fluid">
        {/* Logo and site name */}
        <a
          className="navbar-brand text-white"
          href="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://www.reshot.com/preview-assets/icons/ZED7VSP4CJ/money-ZED7VSP4CJ.svg"
            alt="Logo"
            style={{
              width: "40px", // Adjust the size of the logo
              height: "auto",
              marginRight: "10px", // Space between logo and "SRV"
            }}
          />
          SRV
        </a>

        {/* Hamburger menu for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {/* Standard navigation links */}
            <a
              className="nav-link active text-white p-2.5 m-2"
              aria-current="page"
              href="/"
            >
              Home
            </a>
            <a className="nav-link text-white p-2.5 m-2" href="/stockdata">
              Stock Data
            </a>
            <a className="nav-link text-white p-2.5 m-2" href="/chatbot">
              Chatbot
            </a>
            <a className="nav-link text-white p-2.5 m-2" href="/resources">
              Resources
            </a>

            {/* Conditional rendering based on user authentication */}
            {user ? (
              <>
                {/* If user is logged in, show their name, profile link, and logout button */}
                <span className="nav-link text-white p-2.5 m-2">
                  Welcome, {user.firstname} {user.lastname}
                </span>
                <a className="nav-link text-white p-2.5 m-2" href="/profile">
                  Profile
                </a>
                <button
                  className="btn text-danger p-2.5 m-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* If user is not logged in, show login and signup buttons */}
                <a href="/login">
                  <button className="btn btn-warning text-danger p-2.5 m-2">
                    Login
                  </button>
                </a>
                <a href="/signup">
                  <button className="btn btn-warning text-danger p-2.5 m-2">
                    Signup
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
