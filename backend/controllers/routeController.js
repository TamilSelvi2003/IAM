import Route from "../models/Route.js";

 
export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

 
export const createRoute = async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();
    res.json(newRoute);
  } catch (error) {
    res.status(400).json({ error: "Route creation failed" });
  }
};

 
export const deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Route deletion failed" });
  }
};

 
export const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoute);
  } catch (error) {
    res.status(400).json({ error: "Route update failed" });
  }
};
