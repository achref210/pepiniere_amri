import express from "express";
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
  absence,
  reinitialiser,
} from "../controllers/employers.js";

const router = express.Router();

//localhost:5000/posts
router.get("/", getSuppliers);
router.post("/", createSupplier);
//patch is used for updating
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
