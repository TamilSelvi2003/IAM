import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./route.css"; // Import common styles

const ViewRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { route } = location.state || {};

  if (!route) {
    return <p>No route details available</p>;
  }

  return (
    <div className="view-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>Route Details</h2>
      <div className="view-details">
        <p><strong>Name:</strong> {route.name}</p>
        <p><strong>Path:</strong> {route.path}</p>
      </div>
    </div>
  );
};

export default ViewRoute;
