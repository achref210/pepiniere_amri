import express from "express";
import {
    getUserRequests,
    getRequests,
    createRequest,
    updateRequest,
    deleteRequest,
    accepteRequest,
    refuseRequest,

} from "../controllers/requests.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts
//
router.get("/user", auth, getUserRequests);
router.get("/", getRequests);
//router.get("/:id", getRequest);
router.post("/", auth, createRequest);
router.patch("/:id", updateRequest);
router.delete("/:id", deleteRequest);
router.patch("/:id/accepte", accepteRequest)
router.patch("/:id/refuse", refuseRequest)

export default router;