import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TypeScript interface for props, with a callback function onLogin
interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate(); // Hook for navigation after successful login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // To store any error message

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error before making the API call

    try {
      // Sending login credentials to the backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send email and password as the body
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, call onLogin and navigate to home
        onLogin(data.user);
        navigate("/");
      } else {
        // If login failed, show an error message
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle any error during the login process
      setError("An error occurred during login. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container my-5" style={{ fontFamily: "Montserrat" }}>
        <div className="row">
          {/* Login form left side with fields for email and password */}
          <div className="col-md-6 mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="./src/assets/logo.svg"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">
                  We are The Financial <i>S</i>e<i>RV</i>ices Team
                </h4>
              </div>

              <p>Please login to your account</p>

              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password input */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Login button and additional options like forgot password */}
              <div className="text-center pt-1 mb-5 pb-1">
                <button className="btn btn-primary w-100 mb-4">Sign in</button>
                <a className="text-muted" href="#">
                  Forgot password?
                </a>
              </div>

              {/* Social login buttons */}
              <div className="text-center mb-4">
                <p>Or login with:</p>
                <button className="btn btn-danger me-2 mb-2">
                  <i className="bi bi-google"></i> Google
                </button>
                <button className="btn btn-primary mb-3">
                  <i className="bi bi-facebook"></i> Facebook
                </button>
              </div>

              {/* Sign up link for users without an account */}
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="#" className="text-danger">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right-side background section for marketing or additional info */}
          <div className="col-md-6 mb-5">
            <div
              className="d-flex flex-column justify-content-center bg-primary text-white h-100 mb-4"
              style={{
                background:
                  "linear-gradient(180deg, #ffe369, #ffce52, #ffb32b, #deb321, #bcb316, #9ab30b, #78b300)",
              }}
            >
              <div className="px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  This website is your one-stop shop for all things finance! We
                  provide easy-to-understand articles, videos, and calculators
                  to help you build a strong financial foundation. Learn about
                  budgeting, saving, investing, credit scores, and more. Whether
                  you're just starting out or looking to take your finances to
                  the next level, we have the resources to empower you to make
                  informed financial decisions and achieve your financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
