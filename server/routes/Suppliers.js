import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersBySearch,
  createSaplingArticle,
  createSeedArticle,
  createMaterialArticle,
  updateSaplingArticle,
  updateSeedArticle,
  updateMaterialArticle,
  deleteSaplingArticle,
  deleteSeedArticle,
  deleteMaterialArticle

} from "../controllers/suppliers.js";

const router = express.Router();

//localhost:5000/posts
router.get("/search", getSuppliersBySearch);
router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.post("/", createSupplier);
//patch is used for updating
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);
//Sapling Articles
router.delete("/:id1/materialArticle/:id2", deleteMaterialArticle);
router.delete("/:id1/saplingArticle/:id2", deleteSaplingArticle);
router.delete("/:id1/seedArticle/:id2", deleteSeedArticle);
router.patch("/:id/saplingArticle", createSaplingArticle);
router.patch("/:id/seedArticle", createSeedArticle);
router.patch("/:id/MaterialArticle", createMaterialArticle);
router.patch("/:id/updateSaplingArticle", updateSaplingArticle);
router.patch("/:id/updateSeedArticle", updateSeedArticle);
router.patch("/:id/updateSaterialArticle", updateMaterialArticle);

export default router;
