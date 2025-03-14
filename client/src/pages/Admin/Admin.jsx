import React, { useState, useEffect } from "react";
import { get, post, put, deleteUser } from "../../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { FaEye, FaPen, FaTrash, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", password: "", status: "" });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/api/admin/getuser");
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await get("/api/roles");
        if (response.status === 200) {
          setRoles(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch roles.");
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setFormData({ name: "", email: "", role: "", password: "", status: "" });
    setEditingUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (editingUserId) {
        response = await put(`/api/admin/updateuser/${editingUserId}`, formData);
        if (response.status === 200) {
          toast.success("User updated successfully!");
          setUsers(users.map(user => user._id === editingUserId ? response.data.user : user));
        }
      } else {
        response = await post("/api/admin/createuser", formData, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 201) {
          toast.success("User added successfully!");
          setUsers([...users, response.data.user]);
        }
      }

      setShowForm(false);
      setFormData({ name: "", email: "", role: "", password: "", status: "" });
      setEditingUserId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed. Please try again.");
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await put(`/api/admin/updateuser/${userId}`, { status: updatedStatus });

      if (response.status === 200) {
        setUsers(users.map(user => (user._id === userId ? { ...user, status: updatedStatus } : user)));
        toast.success(`User status updated to ${updatedStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role, password: user.password, status: user.status });
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(`/api/admin/delet/${userId}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== userId));
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    }
  };

  const handleView = (user) => {
    navigate(`/viewuser/${user._id}`, { state: user });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <button onClick={() => navigate("/")} className="close-btn">X</button>
      <button onClick={toggleForm} className="add-user-btn">
        {showForm ? "Cancel" : "Add User"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="user-form">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
          
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <button type="button" onClick={togglePasswordVisibility} className="password-toggle-btn">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <select name="status" value={formData.status} onChange={handleInputChange} required>
            <option value=" ">Select Stauts</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select name="role" value={formData.role} onChange={handleInputChange} required>
            <option value="">Select Role</option>
            {roles.map(role => <option key={role._id} value={role.role}>{role.role}</option>)}
          </select>

          <button type="submit">{editingUserId ? "Update" : "Submit"}</button>
        </form>
      )}

      <table className="usertable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td> 
              <td>
  <div
    className={`toggle-switch ${user.status === "active" ? "active" : ""}`}
    onClick={() => handleStatusToggle(user._id, user.status)}
  >
    <div className="toggle-circle"></div>
  </div>
</td>

              <td>{user.role}</td>
              <td >
                <button className="view" onClick={() => handleView(user)}><FaEye /></button>
                <button className="edit" onClick={() => handleEdit(user)}><FaPen /></button>
                <button className="delete" onClick={() => handleDelete(user._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
