"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    inventory: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "price" || name === "inventory" ? Number(value) : value,
    });
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await axios.post("/api/products", form);
      alert("Product added successfully");
      refreshProducts();
      setIsModalOpen(false);
      setForm({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        inventory: 0,
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    try {
      if (!editingId) return;
      setLoading(true);
      await axios.put(`/api/products/${editingId}`, form);
      alert("Product updated successfully.");
      setIsModalOpen(false);
      refreshProducts();
      setForm({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        inventory: 0,
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct();
    } else {
      addProduct();
    }
  };

  const handleEdit = (p: Product) => {
    setForm(p);
    setEditingId(p._id || null);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="space-x-4">
          <Link href={"/dashboard"}>
            <button className="px-5 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition cursor-pointer">
              Dashboard
            </button>
          </Link>
          <button
            onClick={() => {
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="px-5 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-grey-700 transition cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Inventory</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <Image
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.inventory}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No products available.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="border p-2 rounded focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
                <input
                  name="price"
                  type="number"
                  value={form.price || ""}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border p-2 rounded focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border p-2 rounded focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
                <input
                  name="inventory"
                  type="number"
                  value={form.inventory || ""}
                  onChange={handleChange}
                  placeholder="Inventory"
                  className="border p-2 rounded focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="border p-2 rounded md:col-span-2 focus:ring-2 focus:ring-gray-800 outline-none"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border p-2 rounded md:col-span-2 focus:ring-2 focus:ring-gray-800 outline-none"
                  required
                />
              </div>

              {/* ✅ Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Admin;
