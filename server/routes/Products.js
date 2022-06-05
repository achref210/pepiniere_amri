import express from "express";

import {
    refreshProducts,
    addComment,
    getProducts,
    getCategory
} from "../controllers/products.js";

const router = express.Router();
router.post("/", refreshProducts);
router.get("/category", getCategory);
router.get("/", getProducts);
//router.patch("/refresh",refresh)
router.patch("/addComment/:id",addComment)

export default router;
