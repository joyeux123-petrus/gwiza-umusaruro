import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import ProductForm from "@/components/ProductForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id }
    }),
    prisma.category.findMany({
      select: { id: true, nameEn: true, parentId: true }
    })
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AuthenticatedLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Edit Product</h2>
        <p className="text-gray-500 mt-2">Update product information and visibility settings.</p>
      </div>

      <ProductForm categories={categories} initialData={product} />
    </AuthenticatedLayout>
  );
}
