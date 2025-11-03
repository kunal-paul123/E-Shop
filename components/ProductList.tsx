"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

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

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  }, [query, products]);

  return (
    <>
      <Navbar onSearch={setQuery} />

      <section className="text-center mb-12 mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Discover Your Style 👕
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Shop the latest collection of trendy clothing at unbeatable prices.
          From casuals to formals — we’ve got you covered.
        </p>
      </section>

      <section>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No products found matching your search.
          </p>
        )}
      </section>
    </>
  );
};

export default ProductList;
