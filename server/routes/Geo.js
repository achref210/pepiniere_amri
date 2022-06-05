import express from "express";
import {
    getGeo,
    addGeo,
    updateGeo,
    deleteGeo
  //createPlan,
  //updatePlan,
  //deletePlan,
  //activatePlan
  //votePlan,
  //activatePlan,
  //disactivatePlan,
} from "../controllers/geo.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getGeo);
router.post("/", addGeo);
router.patch("/:id", updateGeo);
router.delete("/:id", deleteGeo);

//router.post("/", auth, createPlan);
//router.patch("/:id", auth, updatePlan);
//router.delete("/:id", auth, deletePlan);
//router.patch("/:id", auth, activatePlan);
//router.patch("/:id/votePlan", auth, votePlan);
//router.patch("/:id/activatePlan", auth, activatePlan);
//router.patch("/:id/disactivatePlan", auth, disactivatePlan);

export default router;
