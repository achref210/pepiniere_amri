import express from "express";
import {
  createSapling,
  getSaplings,
  updateSapling,
  deleteSapling,
  getSaplingsBySearch,
  getSapling,

  addFertilizationRow,
  updateFertilizationCol,
  deleteFertilizationRow,

  setDefaultFertilizationPlan,

  createRow,
  updateCol,
  deleteRow,

} from "../controllers/saplings.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts
//
router.get("/search", getSaplingsBySearch);
router.get("/", getSaplings);
router.get("/:id", getSapling);
router.post("/", createSapling);

router.post("/stock/:id", createRow);
router.patch("/stock/:id1/:id2", updateCol);
router.delete("/stock/:id1/:id2", deleteRow);

router.post("/stock/fertilization/:id1/:id2",addFertilizationRow);
router.patch("/stock/fertilization/:id1/:id2/:id3",updateFertilizationCol);
router.delete("/stock/fertilization/:id1/:id2/:id3",deleteFertilizationRow);
router.patch("/stock/defaultFertilization/:id1/:id2",setDefaultFertilizationPlan)
//router.patch("/stock/row/:id", updateRow);
//patch is used for updating
router.patch("/:id", updateSapling);
router.delete("/:id", deleteSapling);

export default router;