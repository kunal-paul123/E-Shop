import ProductList from "@/components/ProductList";
import dbConnect from "@/lib/connectDb";
import Product from "@/models/product";

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

export const dynamic = "force-static";
export const revalidate = 3600;

async function getProducts(): Promise<Product[]> {
  try {
    await dbConnect();
    const products = await Product.find({}).lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const Home = async () => {
  const products = await getProducts();

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 md:px-16 py-5">
        <ProductList products={products} />
      </main>
    </>
  );
};

export default Home;
