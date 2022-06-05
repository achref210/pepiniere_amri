import express from "express";
import {
  createSeed,
  getSeeds,
  updateSeed,
  deleteSeed,
  getSeedsBySearch,
  getSeed,
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

export default router;
