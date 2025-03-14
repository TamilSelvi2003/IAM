import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Admin.css'

const ViewUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();  

  if (!state) {
    return <h3>No user data available.</h3>;
  }

  return (
    <div className="view-user">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {state.name}</p>
      <p><strong>Email:</strong> {state.email}</p>
      <p><strong>Role:</strong> {state.role}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ViewUser;
