import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, getAllCategories, getProducts, getSingleCategory, getSingleProduct, updateCategory, updateProduct } from '../controllers/product.controller.js';
import dynamicUploader from '../middlewares/uploadimage.js';

const router = express.Router();

const uploadProductImage = dynamicUploader('products');
const uploadCategoryImage = dynamicUploader('category');

// ==========================
// All categories routes
// ==========================
router.post('/create-category', uploadCategoryImage.single('image'), createCategory);
router.get('/get-all-categories', getAllCategories);
router.get('/get-single-category/:id', getSingleCategory);
router.put('/update-category/:id', uploadCategoryImage.single('image'), updateCategory);
router.delete("/delete-category/:id", deleteCategory);



// ====================
// All products route
// ====================
router.post('/create-product', uploadProductImage.single('image'), createProduct);
router.get('/get-all-product', getProducts);
router.get("/get-single-product/:id", getSingleProduct);
router.put("/update-product/:id", uploadProductImage.single("image"), updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;