import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchRoutes } from "../redux/RouteSlice";
import { Logout } from "../redux/AuthSlice";
import { post } from "../services/ApiEndpoint";
import Swal from "sweetalert2";
import { AiOutlineLogout, AiOutlineArrowLeft, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import "./Header.css";

export default function Home() {
  const user = useSelector((state) => state.Auth.user);
  const roleRoutes = useSelector((state) => state.route.routes);
  const routeLoading = useSelector((state) => state.route.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [permissionOpen, setPermissionOpen] = useState(false);  

  useEffect(() => {
    if (user?.role) {
      dispatch(fetchRoutes(user.role));
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      try {
        await post("/api/auth/logout");
        dispatch(Logout());
        localStorage.removeItem("token");
        navigate("/login");
        Swal.fire("Logged out!", "You have been successfully logged out.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong during logout!", "error");
      }
    }
  };

  if (routeLoading) {
    return <div>Loading routes...</div>;
  }

  return (
    <div className="home-container">
      <div className="sidebar">
      <h3 style={{marginTop:"30px",marginBottom:"-20px",marginLeft:"10px",color:"orange"}}> {user?.name}</h3>
        <div className="sidebar-header">
          {user?.role === "admin" && (
            <div className="permissions-section">
             <button
  onClick={() => setPermissionOpen(!permissionOpen)}
  className="permission-btn"
>
  Permissions 
  <span style={{ marginLeft: "10px" }}>
    {permissionOpen ? <AiOutlineUp /> : <AiOutlineDown />}
  </span>
</button>

              {permissionOpen && (
                <div className="permission-submenu">
                  <NavLink to="/role" className="link">Add Role</NavLink>
                  <NavLink to="/route" className="link">Add Route</NavLink>
                  <NavLink to="/admin" className="link">Add User</NavLink>
                </div>
              )}
            </div>
          ) }
        </div>

        <div className="sidebar-nav">
          {roleRoutes.length > 0 ? (
            roleRoutes.map((route, index) => {
              const cleanRoute = route.replace(/^\/+/, "");
              const formattedRoute = cleanRoute.charAt(0).toUpperCase() + cleanRoute.slice(1);
              return (
                <NavLink key={index} to={`/${cleanRoute}`} className="nav-link" activeclassname="active-link">
                  {formattedRoute}
                </NavLink>
              );
            })
          ) : (
            <p>No routes available for this role.</p>
          )}
        </div>

        {user && (
          <button onClick={handleLogout} className="logout-btn">
            <AiOutlineLogout size={16} /> Logout
          </button>
        )}
      </div>
      
    </div>
  );
}

