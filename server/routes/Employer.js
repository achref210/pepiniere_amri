import express from "express";
import {
  createEmployer,
  getEmployers,
  updateEmployer,
  deleteEmployer,
  absence,
  reinitialiser,
} from "../controllers/employers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts
router.get("/", getEmployers);
router.post("/", createEmployer);
//patch is used for updating
router.patch("/:id", updateEmployer);
router.delete("/:id", deleteEmployer);
router.patch("/:id/absence", absence);
router.patch("/:id/reinitialiser", reinitialiser);

export default router;
