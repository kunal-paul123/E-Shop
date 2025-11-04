import Product from "@/models/product";
import dbConnect from "@/lib/connectDb";
import { NextResponse } from "next/server";
import { products } from "@/data/productData";

export async function GET() {
  await dbConnect();

  const count = await Product.countDocuments();

  if (count > 0) {
    return NextResponse.json({ message: "Products already exits" });
  }

  await Product.insertMany(products);
  return NextResponse.json({ message: "10 products added successfully!" });
}
