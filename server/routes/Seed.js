import express from "express";
import {
  createSeed,
  getSeeds,
  updateSeed,
  deleteSeed,
  getSeedsBySearch,
  getSeed,

  createRow,
  updateCol,
  deleteRow,
} from "../controllers/seeds.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts
//
router.get("/search", getSeedsBySearch);
router.get("/", getSeeds);
router.get("/:id", getSeed);
router.post("/", createSeed);
//patch is used for updating
router.patch("/:id", updateSeed);
router.delete("/:id", deleteSeed);

router.post("/stock/:id", createRow);
router.patch("/stock/:id1/:id2", updateCol);
router.delete("/stock/:id1/:id2", deleteRow);

export default router;
