import express from "express";
import {
  createMaterial,
  getMaterials,
  updateMaterial,
  deleteMaterial,
  getMaterialsBySearch,
  getMaterialsByFamily,
  getMaterial,

  createRow,
  updateCol,
  deleteRow,
} from "../controllers/materials.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts
router.get("/search", getMaterialsBySearch);
router.get("/family", getMaterialsByFamily);
router.get("/", getMaterials);
router.get("/:id", getMaterial);
router.post("/", createMaterial);
//patch is used for updating
router.patch("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);

router.post("/stock/:id", createRow);
router.patch("/stock/:id1/:id2", updateCol);
router.delete("/stock/:id1/:id2", deleteRow);

export default router;
