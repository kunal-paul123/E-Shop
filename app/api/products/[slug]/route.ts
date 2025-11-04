import Product from "@/app/models/product";
import dbConnect from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const productDetails = await Product.findOne({ slug });
    if (!productDetails) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }
    return NextResponse.json(productDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;

    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(slug, body, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
