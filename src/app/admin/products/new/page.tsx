import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ProductForm from "@/components/ProductForm";
import prisma from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, nameEn: true, parentId: true }
  });

  return (
    <AuthenticatedLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Add New Product</h2>
        <p className="text-gray-500 mt-2">Fill in the details to add a new product to your catalogue.</p>
      </div>

      <ProductForm categories={categories} />
    </AuthenticatedLayout>
  );
}
