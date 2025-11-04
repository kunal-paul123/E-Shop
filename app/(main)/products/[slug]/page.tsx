import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
}

async function getProductDetails(slug: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductDetails(slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-6 md:px-16 py-10">
      <section className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <Breadcrumb productName={product.name} />

          <div className="relative w-full max-w-sm mx-auto aspect-3/4 rounded-2xl overflow-hidden shadow-md bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 w-full md:w-1/2 text-gray-800 mt-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-medium flex items-center">
              ⭐ 4.5
            </span>
            <span className="text-gray-500 text-sm">297 Ratings</span>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-gray-400 line-through text-lg">₹2000</span>
              <span className="text-black font-semibold text-lg">
                (10% OFF)
              </span>
            </div>
            <p className="text-green-600 text-sm font-medium mt-1">
              Inclusive of all taxes
            </p>
            <p
              className={
                product.inventory > 5
                  ? "text-green-600 text-sm font-medium mt-1"
                  : "text-red-600 text-sm font-medium mt-1"
              }
            >
              Stock: {product.inventory}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="flex-1 bg-stone-900 text-white py-3 rounded-lg font-semibold text-lg shadow transition-all hover:bg-stone-800">
              🛒 Add to Cart
            </button>
            <button className="flex-1 border border-gray-400 text-gray-800 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100">
              ♡ Wishlist
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Category: {product.category}</li>
              <li>• 100% premium cotton material</li>
              <li>• Easy hand wash recommended</li>
              <li>• Made in India 🇮🇳</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
