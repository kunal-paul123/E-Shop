"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  productName: string;
}

const Breadcrumb = ({ productName }: BreadcrumbProps) => {
  return (
    <nav className="text-sm text-gray-600 mb-6 flex items-center space-x-1">
      <Link href="/" className="text-gray-500">
        Home
      </Link>

      <ChevronRight className="w-4 h-4 text-gray-400" />

      <p> Products</p>

      <ChevronRight className="w-4 h-4 text-gray-400" />

      <span className="text-gray-900 font-medium truncate max-w-[180px] sm:max-w-none">
        {productName}
      </span>
    </nav>
  );
};

export default Breadcrumb;
