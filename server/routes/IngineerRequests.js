import express from "express";
import {
    getIngineerRequestsBySearch,
    getIngineerRequests,
    getIngineerRequest,
    createIngineerRequest,
    updateIngineerRequest,
    deleteIngineerRequest,
    confirmReceipt
    //accepteIngineerRequest,

} from "../controllers/ingineerRequests.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//localhost:5000/posts
//
router.get("/search", getIngineerRequestsBySearch);
router.get("/", getIngineerRequests);
router.get("/:id", getIngineerRequest);
router.post("/", createIngineerRequest);
router.patch("/:id", updateIngineerRequest);
router.delete("/:id", deleteIngineerRequest);
router.patch("/:id/confirmReceipt", confirmReceipt);
//router.patch("/:id/accepte", accepteIngineerRequest)

export default router;