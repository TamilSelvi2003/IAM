import express from "express";
import { createRoute, getRoutes, deleteRoute,updateRoute } from "../controllers/routeController.js";

const router = express.Router();

router.get("/", getRoutes);
router.post("/", createRoute);
router.delete("/:id", deleteRoute);
router.put("/:id", updateRoute);


export default router;
