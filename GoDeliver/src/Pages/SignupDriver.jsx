import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function SignupDriver() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleInfo: "",
    idFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "idFile") {
      setForm((prev) => ({ ...prev, idFile: files && files[0] ? files[0] : null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      alert("Please fill all required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Driver registered! Send data to backend here.");
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
        <h1 className="auth-title">Sign Up (Driver/Dispatcher)</h1>
        <p className="auth-subtitle">Create your account to receive assignments</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="auth-row">
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <input name="vehicleInfo" value={form.vehicleInfo} onChange={handleChange} placeholder="Vehicle Info (Optional)" />
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
            <Link to="/signup/admin" className="auth-link">Sign up as Admin</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupDriver;


