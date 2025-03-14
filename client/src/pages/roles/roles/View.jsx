import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./role.css"; // Import common styles

const ViewRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || {};

  if (!role) {
    return <p>No role data available.</p>;
  }

  return (
    <div className="view-role">
      <h2>View Role</h2>
      <p><strong>Role Name:</strong> {role.role}</p>
      <p><strong>Routes:</strong> {role.routes ? role.routes.join(", ") : "No routes assigned"}</p>
      
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ViewRole;
