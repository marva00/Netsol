import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen";
import FareCalculator from "./Pages/FareCalculator";
import Login from "./Pages/Login";
import SignupCustomer from "./Pages/SignupCustomer";
import SignupDriver from "./Pages/SignupDriver";
import SignupAdmin from "./Pages/SignupAdmin";
import CustomerDashboard from "./Pages/CustomerDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import DriverDashboard from "./Pages/DriverDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomeScreen />} />

        {/* Fare Calculator Page */}
        <Route path="/fare-calculator" element={<FareCalculator />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupCustomer />} />
        <Route path="/signup/customer" element={<SignupCustomer />} />
        <Route path="/signup/driver" element={<SignupDriver />} />
        <Route path="/signup/admin" element={<SignupAdmin />} />

        {/* Dashboards */}
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
