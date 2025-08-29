import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // Email or Phone
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // customer | admin | driver
  const [errors, setErrors] = useState({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone validation regex (basic - adjust based on your requirements)
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;

  const validateForm = () => {
    const newErrors = {};

    // Validate identifier (email or phone)
    if (!identifier.trim()) {
      newErrors.identifier = "Email or phone is required";
    } else {
      const isEmail = identifier.includes("@");
      if (isEmail && !emailRegex.test(identifier)) {
        newErrors.identifier = "Please enter a valid email address";
      } else if (!isEmail && !phoneRegex.test(identifier.replace(/\s/g, ""))) {
        newErrors.identifier = "Please enter a valid phone number";
      }
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Validate role
    if (!role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Placeholder: call backend here to authenticate and detect role
    // Example:
    // const { role } = await api.login({ identifier, password });
    
    // Navigate based on selected role
    const target = role === "admin" ? "/admin" : role === "driver" ? "/driver" : "/customer";
    navigate(target);
  };

  const handleInputChange = (field, value) => {
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    if (field === 'identifier') {
      setIdentifier(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);
    // Clear role error when user selects a role
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: undefined }));
    }
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
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">Access your account to continue</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={(e) => handleInputChange('identifier', e.target.value)}
              placeholder="Email or Phone"
              className={errors.identifier ? 'error' : ''}
            />
            {errors.identifier && <span className="error-message">{errors.identifier}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="input-group">
            <div className="role-group" role="radiogroup" aria-label="Select role">
              <div className="role-option">
                <input 
                  id="role-customer" 
                  type="radio" 
                  name="role" 
                  value="customer" 
                  checked={role === "customer"} 
                  onChange={(e) => handleRoleChange(e.target.value)}
                />
                <label htmlFor="role-customer">Customer</label>
              </div>
              <div className="role-option">
                <input 
                  id="role-driver" 
                  type="radio" 
                  name="role" 
                  value="driver" 
                  checked={role === "driver"} 
                  onChange={(e) => handleRoleChange(e.target.value)}
                />
                <label htmlFor="role-driver">Driver</label>
              </div>
              <div className="role-option">
                <input 
                  id="role-admin" 
                  type="radio" 
                  name="role" 
                  value="admin" 
                  checked={role === "admin"} 
                  onChange={(e) => handleRoleChange(e.target.value)}
                />
                <label htmlFor="role-admin">Admin</label>
              </div>
            </div>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          <button type="submit" className="primary-btn">Login</button>

          <div className="auth-actions">
            <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
            <Link to="/signup" className="auth-link">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;