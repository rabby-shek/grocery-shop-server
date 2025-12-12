import Categories from "../models/category.model.js";


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