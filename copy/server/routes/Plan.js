import express from "express";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  //activatePlan
  votePlan,
  activatePlan,
  disactivatePlan,
} from "../controllers/plan.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getPlans);
router.post("/", auth, createPlan);
router.patch("/:id", auth, updatePlan);
router.delete("/:id", auth, deletePlan);
//router.patch("/:id", auth, activatePlan);
router.patch("/:id/votePlan", auth, votePlan);
router.patch("/:id/activatePlan", auth, activatePlan);
router.patch("/:id/disactivatePlan", auth, disactivatePlan);

export default router;
