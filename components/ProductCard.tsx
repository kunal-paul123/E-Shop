import Image from "next/image";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm
                   hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        <div className="relative w-full aspect-3/4 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className="p-4 flex flex-col gap-1">
          <h3 className="font-semibold text-gray-800 text-lg truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{product.category}</p>

          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-lg text-gray-900">
              ₹{product.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
