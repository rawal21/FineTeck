import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";


export default function SignUpPage() {
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
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" className="form-control" placeholder="John Doe" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-control" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" className="form-control" />
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
