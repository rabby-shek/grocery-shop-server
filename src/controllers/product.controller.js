import Categories from "../models/category.model.js";
import Product from "../models/product.model.js";

// Create category
export const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        const imagePath = req.file
            ? `/uploads/categories/${req.file.filename}`
            : undefined;

        const newCategory = await Categories.create({
            categoryName,
            image: imagePath, // if undefined, Mongoose uses default
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating category",
            error: error.message,
        });
    }
};

// Create product

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        console.log(req.body);
        const imagePath = req.file
            ? `/uploads/products/${req.file.filename}`
            : undefined;
        const product = await Product.create({
            name,
            price,
            description,
            category,
            image: imagePath
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
}