import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPen , FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./route.css";

const CreateRoute = () => {
  const navigate = useNavigate();
  const [routeName, setRouteName] = useState("");
  const [routePath, setRoutePath] = useState("");
  const [routes, setRoutes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editRouteId, setEditRouteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/routes");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!routeName.trim() || !routePath.trim()) {
      toast.warn("Please enter both route name and route path.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/api/routes/${editRouteId}`, {
          path: routePath,
          name: routeName,
        });
        toast.success("Route updated successfully!");
      } else {
        const response = await axios.post(`http://localhost:4000/api/routes`, {
          path: routePath,
          name: routeName,
        });
        setRoutes([...routes, response.data]);
        toast.success("Route added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting route:", error);
      toast.error("An error occurred while adding or updating the route.");
    }
  };

  const handleEdit = (route) => {
    setRouteName(route.name);
    setRoutePath(route.path);
    setIsEditing(true);
    setEditRouteId(route._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/routes/${id}`);
      setRoutes(routes.filter((route) => route._id !== id));
      toast.success("Route deleted successfully!");
    } catch (error) {
      console.error("Error deleting route:", error);
      toast.error("An error occurred while deleting the route.");
    }
  };

  const handleView = (route) => {
    navigate("/view-route", { state: { route } });
  };

  const resetForm = () => {
    setRouteName("");
    setRoutePath("");
    setIsEditing(false);
    setEditRouteId(null);
    setShowForm(false);
  };

  return (
    <div className="route-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        Back
      </button>

      <button
        className="add-route-btn"
        onClick={() => {
          if (showForm) {
            resetForm();
          } else {
            setShowForm(true);
          }
        }}
      >
        {showForm ? "Cancel" : "Add Route"}
      </button>

      {showForm && (
        <div>
          <h3 className="route-title">{isEditing ? "Edit Route" : "Create Route"}</h3>
          <form className="route-form" onSubmit={handleSubmit}>
            <input
              className="route-input"
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Enter Route Name"
              required
            />
            <input
              className="route-input"
              type="text"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
              placeholder="Enter Route Path"
              required
            />
            <button className="route-submit">
              {isEditing ? "Update Route" : "Add Route"}
            </button>
          </form>
        </div>
      )}

      <table className="route-table">
        <thead>
          <tr>
            <th>Route Name</th>
            <th>Route Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id}>
              <td>{route.name}</td>
              <td>{route.path}</td>
              <td>
                <button className="view-btn" onClick={() => handleView(route)}>
                  <FaEye />
                </button>
                <button className="edit-btn" onClick={() => handleEdit(route)}>
                 <FaPen />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(route._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateRoute;
