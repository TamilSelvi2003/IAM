import React from "react";
import { useNavigate } from "react-router-dom";
import './route.css'

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You do not have the permission to access this page. so please contact Admin.</p>
      <button className="unauthorized-btn" onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default Unauthorized;
