import Link from "next/link";
import { Plus } from "lucide-react";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ProductList from "@/components/admin/ProductList";

export default function AdminProductsPage() {
  return (
    <AuthenticatedLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Manage Products</h2>
          <p className="text-sm text-gray-500 mt-1 md:mt-2">Add, edit, or remove products from the public catalogue.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl md:rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95 whitespace-nowrap text-sm md:text-base"
        >
          <Plus size={20} /> Add New Product
        </Link>
      </div>

      <ProductList />
    </AuthenticatedLayout>
  );
}
