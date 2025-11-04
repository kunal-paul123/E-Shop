import mongoose, { models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  inventory: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: String, default: new Date().toISOString() },
});

const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;
