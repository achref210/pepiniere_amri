import express from "express";
import {
  createDefaultFertilizationProduct,
  getDefaultFertilizationPlan,
  updateDefaultFertilizationPlan,
  deleteDefaultFertilizationPlan
  //deleteRef,

} from "../controllers/saplings.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDefaultFertilizationPlan);
router.post("/", createDefaultFertilizationProduct);
router.patch("/:id", updateDefaultFertilizationPlan);
router.delete("/:id",deleteDefaultFertilizationPlan)
//router.delete("/:id", deleteRef);

export default router;