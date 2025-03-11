import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("User" , JSON.stringify(data.user.name));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row w-100">
        <div className="col-lg-6 d-none d-lg-flex flex-column bg-primary text-white p-4 justify-content-between">
          <div className="fs-4 fw-bold">
            <Link to="/" className="text-white text-decoration-none">FinanceAI</Link>
          </div>
          <blockquote className="blockquote">
            <p>&ldquo;This platform has completely transformed how I manage my finances. The AI-powered insights are incredible!&rdquo;</p>
            <footer className="blockquote-footer text-white">Sofia Davis</footer>
          </blockquote>
        </div>
        <div className="col-lg-6 p-4">
          <div className="mx-auto w-100" style={{ maxWidth: "350px" }}>
            <div className="text-center mb-4">
              <h1 className="h4 fw-bold">Welcome back</h1>
              <p className="text-muted">Enter your credentials to access your account</p>
            </div>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="border rounded p-4 bg-light">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Link to="/forgot-password" className="text-muted text-decoration-none">Forgot password?</Link>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
              </form>
              <div className="text-center my-3">Or continue with</div>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-dark w-100">
                  <FaGithub className="me-2" /> Github
                </button>
                <button className="btn btn-outline-dark w-100">Continue with Google</button>
              </div>
            </div>
            <p className="text-center text-muted mt-3">
              Don&apos;t have an account? <Link to="/signup" className="text-primary text-decoration-none">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
