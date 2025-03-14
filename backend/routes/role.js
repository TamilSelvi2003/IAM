 import express from "express";
import { createRole, getRoles, deleteRole, updateRole,getRolesByName } from "../controllers/roleController.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.delete("/:id", deleteRole);
router.put("/:id", updateRole);
router.get("/roles", getRolesByName);


export default router;
