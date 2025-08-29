import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function SignupChooser() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Choose the type of account you want to create</p>

        <div className="choice-grid">
          <div className="choice-card">
            <div className="choice-title">Customer</div>
            <div className="choice-desc">Book deliveries, manage shipments, and track your packages.</div>
            <div className="choice-actions">
              <Link to="/signup/customer" className="secondary-btn">Continue as Customer</Link>
            </div>
          </div>

          <div className="choice-card">
            <div className="choice-title">Driver / Dispatcher</div>
            <div className="choice-desc">Receive assignments, update delivery status, and manage routes.</div>
            <div className="choice-actions">
              <Link to="/signup/driver" className="secondary-btn">Continue as Driver</Link>
            </div>
          </div>

          <div className="choice-card">
            <div className="choice-title">Admin</div>
            <div className="choice-desc">Admin signup is restricted. Please contact a super-admin to create your account.</div>
            <div className="choice-actions">
              <Link to="/login" className="secondary-btn">Login as Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupChooser;


