import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  purpose: string;
}

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    purpose: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(
        "An error occurred during registration. Please try again later."
      );
      console.error("Error:", error);
    }
  };

  const handleSocialLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("Social login feature coming soon!");
  };

  return (
    <div className="container my-5" style={{ fontFamily: "Montserrat" }}>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="./src/assets/logo.svg"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">
                  We are The Financial <i>S</i>e<i>RV</i>ices
                </h4>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <p>Create your account</p>

              <div className="mb-4">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  required
                />
              </div>

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
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="purpose" className="form-label">
                  Purpose for Using the Website
                </label>
                <select
                  className="form-select"
                  id="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="personal-finance">Personal Finance</option>
                  <option value="investment">Investment</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div className="text-center pt-1 mb-5 pb-1">
                <button type="submit" className="btn btn-primary w-100 mb-4">
                  Sign up
                </button>
                <a href="/login" className="text-muted">
                  Already have an account? Log in
                </a>
              </div>

              <div className="text-center">
                <p>Or sign up with:</p>
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={handleSocialLogin}
                >
                  <i className="bi bi-google"></i> Google
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSocialLogin}
                >
                  <i className="bi bi-facebook"></i> Facebook
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-5">
            <div
              className="d-flex flex-column justify-content-center bg-primary text-white h-100 mb-4"
              style={{
                background:
                  "linear-gradient(180deg, #ffe369, #ffce52, #ffb32b, #deb321, #bcb316, #9ab30b, #78b300)",
              }}
            >
              <div className="px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">Join our community</h4>
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
      </form>
    </div>
  );
}

export default Signup;
