import React from "react";
import dbConnect from "@/lib/connectDb";

import Link from "next/link";
import Product from "@/app/models/product";
import Image from "next/image";

export default async function DashboardPage() {
  await dbConnect();

  const LOW_STOCK = 5;

  const totalProducts = await Product.countDocuments();

  const totalInventoryAgg = await Product.aggregate([
    { $group: { _id: null, totalInventory: { $sum: "$inventory" } } },
  ]);
  const totalInventory =
    (totalInventoryAgg && totalInventoryAgg[0]?.totalInventory) || 0;

  const lowStockProducts = await Product.find({
    inventory: { $lte: LOW_STOCK },
  })
    .sort({ inventory: 1 }) // lowest first
    .limit(10)
    .lean();

  const lowStockCount = await Product.countDocuments({
    inventory: { $lte: LOW_STOCK },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Inventory Dashboard
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-1 p-6 bg-white rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Products</div>
            <div className="mt-2 text-2xl font-bold">{totalProducts}</div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Inventory</div>
            <div className="mt-2 text-2xl font-bold">{totalInventory}</div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-sm text-gray-500">
              Low Stock (≤ {LOW_STOCK})
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-600">
              {lowStockCount}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Low Stock Products</h2>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="text-sm text-gray-500">No low-stock items.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lowStockProducts.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border rounded p-3"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-500">
                      Category: {p.category || "—"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{p.inventory}</div>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
