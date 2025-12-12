import express from 'express';
import { createCategory, createProduct } from '../controllers/product.controller.js';
import dynamicUploader from '../middlewares/uploadimage.js';

const router = express.Router();

const uploadProductImage = dynamicUploader('products');
const uploadCategoryImage = dynamicUploader('category');

router.post('/create-category', uploadCategoryImage.single('image'), createCategory);
router.post('/create-product', uploadProductImage.single('image'), createProduct);
export default router;