import express from "express";

import { updateUser, signin, signup, getUsers } from "../controllers/user.js";

const router = express.Router();

//localhost:5000/posts
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.post("/signin", signin);
router.post("/signup", signup);

//router.get("/signup/:email", getUser);
//patch is used for updating
//router.patch("/:id", updateEmployer);
//router.delete("/:id", deleteEmployer);
//router.patch("/:id/absence", absence);
//router.patch("/:id/reinitialiser", reinitialiser);

export default router;
