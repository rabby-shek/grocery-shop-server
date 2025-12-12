import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/uploads/default.png", // your default image
    },
  },
  { timestamps: true }
);

const Categories = mongoose.model("categories", categorySchema);

export default Categories;
