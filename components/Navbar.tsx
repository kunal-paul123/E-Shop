"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky bg-transparent top-2 z-50 w-full rounded-4xl backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          <span className="text-black-600">E</span>Shop
        </Link>

        <div className="relative flex items-center w-full max-w-md bg-white border border-gray-200 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-pink-500 transition">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for products..."
            className="w-full rounded-full px-5 py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 p-2 text-gray-500 hover:text-black-600 transition"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
