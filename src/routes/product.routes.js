import express from 'express';
import upload from '../middlewares/upload.js';
import { createCategory } from '../controllers/product.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/create-category', upload.single('image'), createCategory);

export default categoryRoutes;