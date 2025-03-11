import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";


export default function SignUpPage() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    income: "",
    currency: "USD",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
        
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Side */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between bg-primary text-white p-5">
          <div className="fw-bold fs-4">
            <Link to="/" className="text-white text-decoration-none">FinanceAI</Link>
          </div>
          <blockquote>
            <p className="fs-5">
              "Join thousands of users who are already managing their finances smarter with FinanceAI."
            </p>
            <footer className="fs-6">John Smith</footer>
          </blockquote>
        </div>

        {/* Right Side */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "350px" }}>
            <div className="text-center mb-4">
              <h1 className="fw-semibold">Create an account</h1>
              <p className="text-muted">Enter your details to get started</p>
            </div>
            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="income" className="form-label">Monthly Income</label>
                <input
                  type="number"
                  id="income"
                  name="income"
                  className="form-control"
                  placeholder="5000"
                  value={formData.income}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="currency" className="form-label">Currency</label>
                <select
                  id="currency"
                  name="currency"
                  className="form-control"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Create Account</button>
            </form>
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">Or continue with</span>
              <hr className="flex-grow-1" />
            </div>
            <button className="btn btn-outline-dark w-100">
              <FaGithub className="me-2" /> Github
            </button>
            <p className="text-center text-muted mt-3">
              <Link to="/login" className="text-decoration-none">Already have an account? Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
