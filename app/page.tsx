import ProductList from "@/components/ProductList";

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

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
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
