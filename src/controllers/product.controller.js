import Categories from "../models/category.model.js";
import Product from "../models/product.model.js";

// ================
// Create category
// ================

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


// ===================
// Get All Categories
// ===================

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();

        res.status(200).json({
            success: true,
            data: categories,
            message: "Successfully fetched all categories data"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching categories data"
        })
    }
}


// ====================
// Get Single category
// ====================

export const getSingleCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            data: category,
            message: "Category found successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching category data"
        })
    }
}

// =================
// Update Category
// =================

export const updateCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        const imagePath = req.file
            ? `/uploads/categories/${req.file.filename}`
            : undefined;

        const updateData = { categoryName };

        if (imagePath) {
            updateData.image = imagePath;
        }

        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update category",
            error: error.message
        });
    }
}

// =============================
// DELETE CATEGORY
// =============================
export const deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message
        });
    }
};



// ==============
// Create product
// ==============

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

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