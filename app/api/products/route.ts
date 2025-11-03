import Product from "@/app/models/product";
import dbConnect from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, description, price, image, category, inventory } = body;

    const newProduct = await Product.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
      price,
      image,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      inventory,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
