import express from "express";
import {
  getRefBySearch,
  getRefs,
  createRef,
  updateRef,
  deleteRef,

} from "../controllers/seeds.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search",getRefBySearch)
router.get("/", getRefs);
router.post("/", createRef);
router.patch("/:id", updateRef);
router.delete("/:id", deleteRef);

export default router;