import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/AuthSlice";
import { fetchRoutes } from "./redux/RouteSlice";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Admin from './pages/Admin/Admin'
// import AdminDashboard from "./pages/Admin/AdminDashboard";
import DynamicPage from "./pages/dynamicRoutes/DynamicPage";
import PublicLayouts from "./Layouts/PublicLayouts";
import ProtectedRoute from "./pages/ProtectedRoutes";
import ViewUser from "./pages/Admin/View";
import CreateRole from './pages/roles/roles/roles'
import CreateRoute from './pages/roles/routes/routes'
import Header from './pages/Header'
import Unauthorized from "./pages/dynamicRoutes/UnAuthorized";  
import ViewRole from "./pages/roles/roles/View";
import ViewRoute from "./pages/roles/routes/view";

export default function App() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(updateUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRoutes(user.role));
    }
  }, [dispatch, user]);

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<PublicLayouts />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="header" element={<Header />} />
      </Route> 

      <Route element={<ProtectedRoute />}>
        <Route path="/:pageName" element={<DynamicPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/role" element={<CreateRole />} />
        <Route path="/route" element={<CreateRoute />} />
        <Route path="/viewuser/:id" element={<ViewUser />} />
        <Route path="/view-role" element={<ViewRole />} />
        <Route path="/view-route" element={<ViewRoute />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
    </>
   
  );
}
