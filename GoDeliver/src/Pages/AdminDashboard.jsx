import React, { useState, useEffect } from 'react';
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

import { Input } from "antd";  // import Ant Design Input

// Icon components for sidebar
const Dashboard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const Truck = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const DollarSign = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const BarChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  
  // Separate search states for different tables
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [customerFilterStatus, setCustomerFilterStatus] = useState('all');
  const [driverSearchTerm, setDriverSearchTerm] = useState('');
  const [driverFilterStatus, setDriverFilterStatus] = useState('all');
  
  // System Settings state
  const [systemSettings, setSystemSettings] = useState({
    general: {
      companyName: 'GoDeliver',
      defaultLanguage: 'en',
      timezone: 'Asia/Karachi',
      currency: 'PKR',
      logoUrl: ''
    },
    userManagement: {
      defaultAccountStatus: 'active',
      minPasswordLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 30,
      requireEmailVerification: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      bookingConfirmations: true,
      deliveryUpdates: true,
      paymentConfirmations: true
    },
    pricing: {
      defaultServiceCharge: 5,
      commissionRate: 10,
      enablePromoCodes: true,
      maxDiscountPercentage: 20
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: false,
      easypaisaEnabled: true,
      jazzcashEnabled: true,
      autoInvoiceGeneration: true
    },
    security: {
      twoFactorAuth: false,
      ipRestrictions: false,
      allowedIPs: '',
      adminSessionTimeout: 60
    },
    system: {
      maxBookingsPerDriver: 5,
      defaultBookingStatus: 'pending',
      cancellationWindowHours: 1,
      dataRetentionDays: 365,
      autoBackup: true
    },
    appearance: {
      darkMode: false,
      compactLayout: false,
      showNotifications: true
    }
    
  });

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      totalBookings: 1247,
      todayBookings: 23,
      ongoingDeliveries: 18,
      completedDeliveries: 1156,
      totalRevenue: 245600,
      monthlyRevenue: 28400,
      truckBookings: 892,
      trainBookings: 355,
      pendingActions: 7
    },
    recentBookings: [
      {
        id: 'BK001',
        customer: 'John Smith',
        pickup: 'Lahore',
        destination: 'Karachi',
        mode: 'Truck',
        status: 'pending',
        amount: 2500,
        date: '2024-08-26',
        weight: '500kg'
      },
      {
        id: 'BK002',
        customer: 'Sarah Ahmad',
        pickup: 'Islamabad',
        destination: 'Multan',
        mode: 'Train',
        status: 'transit',
        amount: 1800,
        date: '2024-08-25',
        weight: '300kg'
      },
      {
        id: 'BK003',
        customer: 'Ahmed Khan',
        pickup: 'Faisalabad',
        destination: 'Peshawar',
        mode: 'Truck',
        status: 'delivered',
        amount: 3200,
        date: '2024-08-24',
        weight: '750kg'
      },
      {
        id: 'BK004',
        customer: 'Fatima Ali',
        pickup: 'Quetta',
        destination: 'Lahore',
        mode: 'Train',
        status: 'scheduled',
        amount: 2100,
        date: '2024-08-26',
        weight: '400kg'
      }
    ],
    customers: [
      { id: 1, name: 'John Smith', email: 'john@email.com', bookings: 12, status: 'active' },
      { id: 2, name: 'Sarah Ahmad', email: 'sarah@email.com', bookings: 8, status: 'active' },
       { id: 3, name: 'Ahmed Khan', email: 'ahmed@email.com', bookings: 15, status: 'active' },
       { id: 4, name: 'Fatima Ali', email: 'fatima@email.com', bookings: 5, status: 'inactive' },
       { id: 5, name: 'Muhammad Hassan', email: 'hassan@email.com', bookings: 20, status: 'inactive' }
    ],
    drivers: [
      { id: 1, name: 'Muhammad Ali', phone: '+92-300-1234567', vehicle: 'TRK-001', status: 'available' },
      { id: 2, name: 'Hassan Sheikh', phone: '+92-301-2345678', vehicle: 'TRK-002', status: 'busy' },
      { id: 3, name: 'Usman Tariq', phone: '+92-302-3456789', vehicle: 'TRK-003', status: 'available' }
    ],
    notifications: [
      { id: 1, title: 'New Booking Received', message: 'Booking BK001 needs driver assignment', time: '2 min ago', read: false },
      { id: 2, title: 'Delivery Completed', message: 'Booking BK003 has been delivered successfully', time: '1 hour ago', read: false },
      { id: 3, title: 'Payment Received', message: 'Payment for BK002 has been processed', time: '3 hours ago', read: true }
    ],
    pricing: {
      baseFare: 500,
      truckPerKm: 15,
      trainPerKm: 8,
      perKgRate: 5
    }
  });

  const filteredBookings = dashboardData.recentBookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesMode = filterMode === 'all' || booking.mode.toLowerCase() === filterMode.toLowerCase();
    return matchesSearch && matchesStatus && matchesMode;
  });

  const handleStatusUpdate = (bookingId, newStatus) => {
    setDashboardData(prev => ({
      ...prev,
      recentBookings: prev.recentBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    }));
    alert(`Booking ${bookingId} status updated to ${newStatus}!`);
  };

  const handlePricingUpdate = (newPricing) => {
    setDashboardData(prev => ({
      ...prev,
      pricing: { ...prev.pricing, ...newPricing }
    }));
    alert('Pricing updated successfully!');
  };
  // Function to handle customer status change
  const handleCustomerStatusChange = (customerId, newStatus) => {
    setDashboardData(prev => ({
      ...prev,
      customers: prev.customers.map(customer =>
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    }));
    alert(`Customer ${newStatus === 'active' ? 'enabled' : 'disabled'} successfully!`);
  };



  // Function to remove customer from list
  const handleRemoveCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to remove this customer from the list?')) {
      setDashboardData(prev => ({
        ...prev,
        customers: prev.customers.filter(customer => customer.id !== customerId)
      }));
      alert('Customer removed from the list successfully!');
    }
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to handle tab change and close sidebar on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  // Function to update system settings
  const updateSystemSettings = (category, key, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  // Function to save all settings
  const saveSystemSettings = () => {
    // Here you would typically make an API call to save settings
    alert('System settings saved successfully!');
  };

  const navigate = useNavigate();

  // logout logic
const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  navigate("/login");   // send user back to login
};


  const renderKPICards = () => (
    <div className="kpi-cards">
      <div className="kpi-card">
        <h3>Ongoing Deliveries</h3>
        <div className="kpi-value">{dashboardData.kpis.ongoingDeliveries}</div>
        <span className="kpi-change">In transit now</span>
      </div>
      <div className="kpi-card">
        <h3>Total Revenue</h3>
        <div className="kpi-value">Rs {dashboardData.kpis.totalRevenue.toLocaleString()}</div>
        <span className="kpi-change positive">+18% this month</span>
      </div>
      <div className="kpi-card">
        <h3>Truck vs Train</h3>
        <div className="kpi-value">{dashboardData.kpis.truckBookings} / {dashboardData.kpis.trainBookings}</div>
        <span className="kpi-change">71% / 29%</span>
      </div>
    </div>
  );

  const renderBookingsTable = () => (
    <div>
      <div className="search-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search bookings by ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="filter-select" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option>
          <option value="transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
        <select 
          className="filter-select" 
          value={filterMode} 
          onChange={(e) => setFilterMode(e.target.value)}
        >
          <option value="all">All Modes</option>
          <option value="truck">Truck</option>
          <option value="train">Train</option>
        </select>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Route</th>
            <th>Mode</th>
            <th>Weight</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map(booking => (
            <tr key={booking.id}>
              <td><strong>{booking.id}</strong></td>
              <td>{booking.customer}</td>
              <td>{booking.pickup} → {booking.destination}</td>
              <td>{booking.mode}</td>
              <td>{booking.weight}</td>
              <td>Rs {booking.amount.toLocaleString()}</td>
              <td>
                <span className={`status-badge status-${booking.status}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                <div className="button-group">
                <button className="action-btn btn-primary" onClick={() => alert(`View details for ${booking.id}`)}>
                  View
                </button>
                {booking.status === 'pending' && (
                  <button className="action-btn btn-success" onClick={() => handleStatusUpdate(booking.id, 'scheduled')}>
                    Assign
                  </button>
                )}
                {booking.status === 'scheduled' && (
                  <button className="action-btn btn-warning " onClick={() => handleStatusUpdate(booking.id, 'transit')}>
                    Dispatch
                  </button>
                )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCustomersTable = () => (
    <div>
      <div className="search-filters">
                 <input
           type="text"
           className="search-input"
           placeholder="Search customers by name or email..."
           value={customerSearchTerm}
           onChange={(e) => setCustomerSearchTerm(e.target.value)}
         />
         <select 
           className="filter-select" 
           value={customerFilterStatus} 
           onChange={(e) => setCustomerFilterStatus(e.target.value)}
         >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Total Bookings</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
                     {dashboardData.customers
             .filter(customer => {
               const matchesSearch = customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
                                    customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase());
               const matchesStatus = customerFilterStatus === 'all' || customer.status === customerFilterStatus;
               return matchesSearch && matchesStatus;
             })
            .map(customer => (
          <tr key={customer.id}>
            <td><strong>{customer.name}</strong></td>
            <td>{customer.email}</td>
            <td>{customer.bookings}</td>
            <td>
              <span className={`status-badge ${customer.status === 'active' ? 'status-delivered' : 'status-cancelled'}`}>
                {customer.status}
              </span>
            </td>
            <td>
                 <button 
                   className={`action-btn ${customer.status === 'active' ? 'btn-warning' : 'btn-success'}`} 
                   onClick={() => handleCustomerStatusChange(customer.id, customer.status === 'active' ? 'inactive' : 'active')}
                 >
                {customer.status === 'active' ? 'Disable' : 'Enable'}
              </button>
                 <button 
                   className="action-btn btn-danger" 
                   onClick={() => handleRemoveCustomer(customer.id)}
                   title="Remove customer from list"
                 >
                   Remove
                 </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

  const renderDriversTable = () => (
    <div>
      <div className="search-filters">
                 <input
           type="text"
           className="search-input"
           placeholder="Search drivers by name or vehicle..."
           value={driverSearchTerm}
           onChange={(e) => setDriverSearchTerm(e.target.value)}
         />
         <select 
           className="filter-select" 
           value={driverFilterStatus} 
           onChange={(e) => setDriverFilterStatus(e.target.value)}
         >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
        </select>
      </div>
      
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Vehicle</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
                     {dashboardData.drivers
             .filter(driver => {
               const matchesSearch = driver.name.toLowerCase().includes(driverSearchTerm.toLowerCase()) ||
                                    driver.vehicle.toLowerCase().includes(driverSearchTerm.toLowerCase());
               const matchesStatus = driverFilterStatus === 'all' || driver.status === driverFilterStatus;
               return matchesSearch && matchesStatus;
             })
            .map(driver => (
          <tr key={driver.id}>
            <td><strong>{driver.name}</strong></td>
            <td>{driver.phone}</td>
            <td>{driver.vehicle}</td>
            <td>
              <span className={`status-badge ${driver.status === 'available' ? 'status-delivered' : 'status-pending'}`}>
                {driver.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

  const renderPricingManagement = () => {
    const [pricing, setPricing] = useState(dashboardData.pricing);

    return (
      <div>
        <div className="form-group">
          <label className="form-label">Base Fare (Rs)</label>
          <input
            type="number"
            className="form-input"
            value={pricing.baseFare}
            onChange={(e) => setPricing({...pricing, baseFare: parseInt(e.target.value)})}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Truck Rate per KM (Rs)</label>
          <input
            type="number"
            className="form-input"
            value={pricing.truckPerKm}
            onChange={(e) => setPricing({...pricing, truckPerKm: parseInt(e.target.value)})}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Train Rate per KM (Rs)</label>
          <input
            type="number"
            className="form-input"
            value={pricing.trainPerKm}
            onChange={(e) => setPricing({...pricing, trainPerKm: parseInt(e.target.value)})}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Rate per KG (Rs)</label>
          <input
            type="number"
            className="form-input"
            value={pricing.perKgRate}
            onChange={(e) => setPricing({...pricing, perKgRate: parseInt(e.target.value)})}
          />
        </div>
        <button 
          className="btn-update" 
          onClick={() => handlePricingUpdate(pricing)}
        >
          Update Pricing
        </button>
      </div>
    );
  };

  const renderReports = () => (
    <div>
      <div className="reports-grid">
        <div className="report-card" onClick={() => alert('Generating bookings report...')}>
          <h4>📊 Bookings Report</h4>
          <p>Export detailed booking data</p>
        </div>
        <div className="report-card" onClick={() => alert('Generating revenue report...')}>
          <h4>💰 Revenue Report</h4>
          <p>Monthly/weekly revenue analysis</p>
        </div>
        <div className="report-card" onClick={() => alert('Generating driver report...')}>
          <h4>🚛 Driver Performance</h4>
          <p>Driver efficiency metrics</p>
        </div>
        <div className="report-card" onClick={() => alert('Generating customer report...')}>
          <h4>👥 Customer Analytics</h4>
          <p>Customer behavior insights</p>
        </div>
      </div>
      <div className="chart-container">
        <p>📈 Analytics Charts - Revenue Trends, Booking Patterns, Mode Distribution</p>
      </div>
    </div>
  );

   const renderSystemSettings = () => (
     <div className="settings-container">
               <div className="settings-grid">

         {/* User Management */}
         <div className="settings-card">
           <div className="settings-header">
             <h3>User Management</h3>
             <p>Account policies and security settings</p>
           </div>
           <div className="settings-content">
             <div className="setting-item">
               <label>Default Account Status</label>
               <select
                 value={systemSettings.userManagement.defaultAccountStatus}
                 onChange={(e) => updateSystemSettings('userManagement', 'defaultAccountStatus', e.target.value)}
                 className="setting-select"
               >
                 <option value="active">Active</option>
                 <option value="pending">Pending Approval</option>
               </select>
             </div>
             <div className="setting-item">
               <label>Minimum Password Length</label>
               <input
                 type="number"
                 min="6"
                 max="20"
                 value={systemSettings.userManagement.minPasswordLength}
                 onChange={(e) => updateSystemSettings('userManagement', 'minPasswordLength', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
             <div className="setting-item">
               <label className="toggle-label">
                 <input
                   type="checkbox"
                   checked={systemSettings.userManagement.requireSpecialChars}
                   onChange={(e) => updateSystemSettings('userManagement', 'requireSpecialChars', e.target.checked)}
                   className="toggle-input"
                 />
                 <span className="toggle-slider"></span>
                 Require Special Characters
               </label>
             </div>
             <div className="setting-item">
               <label>Session Timeout (minutes)</label>
               <input
                 type="number"
                 min="5"
                 max="120"
                 value={systemSettings.userManagement.sessionTimeout}
                 onChange={(e) => updateSystemSettings('userManagement', 'sessionTimeout', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
           </div>
         </div>

         

         {/* Pricing & Commission */}
         <div className="settings-card">
           <div className="settings-header">
             <h3>Pricing & Commission</h3>
             <p>Revenue settings and discount policies</p>
           </div>
           <div className="settings-content">
             <div className="setting-item">
               <label>Default Service Charge (%)</label>
               <input
                 type="number"
                 min="0"
                 max="20"
                 value={systemSettings.pricing.defaultServiceCharge}
                 onChange={(e) => updateSystemSettings('pricing', 'defaultServiceCharge', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
             <div className="setting-item">
               <label>Commission Rate (%)</label>
               <input
                 type="number"
                 min="0"
                 max="30"
                 value={systemSettings.pricing.commissionRate}
                 onChange={(e) => updateSystemSettings('pricing', 'commissionRate', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
             <div className="setting-item">
               <label className="toggle-label">
                 <input
                   type="checkbox"
                   checked={systemSettings.pricing.enablePromoCodes}
                   onChange={(e) => updateSystemSettings('pricing', 'enablePromoCodes', e.target.checked)}
                   className="toggle-input"
                 />
                 <span className="toggle-slider"></span>
                 Enable Promo Codes
               </label>
             </div>
             <div className="setting-item">
               <label>Max Discount Percentage</label>
               <input
                 type="number"
                 min="0"
                 max="50"
                 value={systemSettings.pricing.maxDiscountPercentage}
                 onChange={(e) => updateSystemSettings('pricing', 'maxDiscountPercentage', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
           </div>
         </div>

         {/* Payment Gateways */}
         <div className="settings-card">
           <div className="settings-header">
             <h3>Payment Gateways</h3>
             <p>Configure payment methods and billing</p>
           </div>
           <div className="settings-content">
             <div className="setting-item">
               <label className="toggle-label">
                 <input
                   type="checkbox"
                   checked={systemSettings.payment.stripeEnabled}
                   onChange={(e) => updateSystemSettings('payment', 'stripeEnabled', e.target.checked)}
                   className="toggle-input"
                 />
                 <span className="toggle-slider"></span>
                 Stripe
               </label>
             </div>
             <div className="setting-item">
               <label className="toggle-label">
                 <input
                   type="checkbox"
                   checked={systemSettings.payment.paypalEnabled}
                   onChange={(e) => updateSystemSettings('payment', 'paypalEnabled', e.target.checked)}
                   className="toggle-input"
                 />
                 <span className="toggle-slider"></span>
                 PayPal
               </label>
             </div>
             <div className="setting-item">
               <label className="toggle-label">
                 <input
                   type="checkbox"
                   checked={systemSettings.payment.easypaisaEnabled}
                   onChange={(e) => updateSystemSettings('payment', 'easypaisaEnabled', e.target.checked)}
                   className="toggle-input"
                 />
                 <span className="toggle-slider"></span>
                 Easypaisa
               </label>
             </div>
             <div className="setting-item">
               <label className="toggle-label">
                 <input
                   type="checkbox"
                   checked={systemSettings.payment.jazzcashEnabled}
                   onChange={(e) => updateSystemSettings('payment', 'jazzcashEnabled', e.target.checked)}
                   className="toggle-input"
                 />
                 <span className="toggle-slider"></span>
                 JazzCash
               </label>
             </div>
           </div>
         </div>

         

         {/* System Preferences */}
         <div className="settings-card">
           <div className="settings-header">
             <h3>System Preferences</h3>
             <p>Platform behavior and operational rules</p>
           </div>
           <div className="settings-content">
             <div className="setting-item">
               <label>Max Bookings per Driver (daily)</label>
               <input
                 type="number"
                 min="1"
                 max="20"
                 value={systemSettings.system.maxBookingsPerDriver}
                 onChange={(e) => updateSystemSettings('system', 'maxBookingsPerDriver', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
             <div className="setting-item">
               <label>Default Booking Status</label>
               <select
                 value={systemSettings.system.defaultBookingStatus}
                 onChange={(e) => updateSystemSettings('system', 'defaultBookingStatus', e.target.value)}
                 className="setting-select"
               >
                 <option value="pending">Pending</option>
                 <option value="confirmed">Confirmed</option>
                 <option value="scheduled">Scheduled</option>
               </select>
             </div>
             <div className="setting-item">
               <label>Cancellation Window (hours)</label>
               <input
                 type="number"
                 min="0"
                 max="72"
                 value={systemSettings.system.cancellationWindowHours}
                 onChange={(e) => updateSystemSettings('system', 'cancellationWindowHours', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
             <div className="setting-item">
               <label>Data Retention (days)</label>
               <input
                 type="number"
                 min="30"
                 max="1095"
                 value={systemSettings.system.dataRetentionDays}
                 onChange={(e) => updateSystemSettings('system', 'dataRetentionDays', parseInt(e.target.value))}
                 className="setting-input"
               />
             </div>
           </div>
         </div>

         

       </div>
       
       {/* Save Button */}
       <div className="settings-actions">
         <button className="btn-save-settings" onClick={saveSystemSettings}>
           Save 
         </button>
       </div>
     </div>
   );

  const renderMainContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="main-content">
            <div className="content-section">
              <div className="section-header">
                <h2 className="section-title">Recent Bookings</h2>
              </div>
              {renderBookingsTable()}
            </div>
            <div>
              
              <div className="content-section notifications">
                <div className="section-header">
                  <h2 className="section-title">Notifications</h2>
                </div>
                {dashboardData.notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div className={`notification-icon ${notification.read ? 'notification-read' : 'notification-new'}`}></div>
                    <div className="notification-content">
                      <h5>{notification.title}</h5>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Customer Management</h2>
            </div>
            {renderCustomersTable()}
          </div>
        );
      case 'drivers':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Driver Management</h2>
            </div>
            {renderDriversTable()}
          </div>
        );
      case 'pricing':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Pricing Management</h2>
            </div>
            {renderPricingManagement()}
          </div>
        );
      case 'reports':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">Reports & Analytics</h2>
            </div>
            {renderReports()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="top-header">
        <div className="header-left">
          <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle menu">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <div className="logo-container">
            <img src="/assets/GoDeliver.png" alt="GoDeliver" className="logo" />
            <span className="logo-text">GoDeliver</span>
          </div>
        </div>
        <div className="header-right">
          <div className="driver-profile">
            <div className="profile-pic">
              <User className="profile-icon" />
            </div>
            <span className="driver-name">Admin Panel</span>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <button 
              onClick={() => handleTabChange('overview')}
              className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <Dashboard className="nav-icon" />
              Dashboard
            </button>
            
            <button 
              onClick={() => handleTabChange('customers')}
              className={`nav-button ${activeTab === 'customers' ? 'active' : ''}`}
            >Customers
            </button>
            
            <button 
              onClick={() => handleTabChange('drivers')}
              className={`nav-button ${activeTab === 'drivers' ? 'active' : ''}`}
            > Drivers
            </button>
            
            <button 
              onClick={() => handleTabChange('settings')}
              className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
            >Settings
            </button>

            <button 
          className="nav-button logout" 
          onClick={handleLogout}
          >Logout
          </button>

          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-container">
            {activeTab === 'overview' && (
              <>
                <div className="content-header">
                  <h2 className="page-title">Dashboard Overview</h2>
                  <p className="page-subtitle">System overview and management</p>
                </div>
                <div className="kpi-section">
                  {renderKPICards()}
                </div>
                <div className="main-content-grid">
                  {renderMainContent()}
                </div>
              </>
            )}
            {activeTab === 'customers' && (
              <div className="content-header">
                <h2 className="page-title">Customer Management</h2>
                <p className="page-subtitle">Manage customer accounts and data</p>
                {renderMainContent()}
              </div>
            )}
            {activeTab === 'drivers' && (
              <div className="content-header">
                <h2 className="page-title">Driver Management</h2>
                <p className="page-subtitle">Manage driver accounts and assignments</p>
                {renderMainContent()}
              </div>
            )}
            
                         {activeTab === 'settings' && (
               <div className="content-header">
                 <h2 className="page-title">System Settings</h2>
                 <p className="page-subtitle">Configure platform-wide preferences and controls</p>
                 {renderSystemSettings()}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;