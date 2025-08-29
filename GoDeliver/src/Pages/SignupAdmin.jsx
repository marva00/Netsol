import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function SignupAdmin() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Admin signup submitted. In production, restrict this route and require invitation or token.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="back-bar">
           <button className="back-btn" type="button" onClick={() => window.location.href = "http://localhost:5176"}>
  <span aria-hidden>←</span>
  <span>Back</span>
</button>
        </div>
        <h1 className="auth-title">Sign Up (Admin)</h1>
        <p className="auth-subtitle">For internal use. Typically restricted to invitations.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="auth-row">
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">Sign Up</button>
          </div>

          <div className="link-row">
            <Link to="/signup/customer" className="auth-link">Sign up as Customer</Link>
            <span> &nbsp;|&nbsp; </span>
            <Link to="/signup/driver" className="auth-link">Sign up as Driver</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupAdmin;


