
import Role from "../models/role.js";
import Route from '../models/Route.js'

export const getRolesByName = async (req, res) => {
  try {
    const { role } = req.query;  
    if (!role) {
      return res.status(400).json({ error: "Role parameter is required" });
    }

    const roleData = await Role.findOne({ role }).populate("routes"); 
    if (!roleData) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(roleData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch role" });
  }
};


// get role

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('routes'); 
    console.log(roles);
    
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

//create Role
export const createRole = async (req, res) => {
  try {
    const { role, routes } = req.body;

    if (!role || role.trim() === "") {
      return res.status(400).json({ error: "Role name is required" });
    }

    if (!Array.isArray(routes) || routes.length === 0) {
      return res.status(400).json({ error: "At least one route must be selected" });
    }

    const existingRole = await Role.findOne({ role: role.trim() });
    if (existingRole) {
      return res.status(400).json({ error: "Role already exists" });
    }

    const formattedRoutes = routes.map(route => route.toString().trim());

    const newRole = new Role({
      role: role.trim(),
      routes: formattedRoutes, 
    });

    await newRole.save();

    res.status(201).json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Role creation failed" });
  }
};


export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: "Role deletion failed" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { role, routes } = req.body;

    if (!role || !routes) {
      return res.status(400).json({ error: "Role name and routes are required" });
    }

    const existingRole = await Role.findById(req.params.id);
    if (!existingRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    existingRole.role = role;
    existingRole.routes = routes; // Update routes dynamically

    await existingRole.save();

    res.json({ message: "Role updated successfully", role: existingRole });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Role update failed" });
  }
};
