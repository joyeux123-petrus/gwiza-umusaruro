import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import CategoryList from "@/components/admin/CategoryList";

export default function AdminCategoriesPage() {
  return (
    <AuthenticatedLayout>
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Category Management</h2>
        <p className="text-sm text-gray-500 mt-1 md:mt-2">Organize your products into categories and subcategories.</p>
      </div>

      <CategoryList />
    </AuthenticatedLayout>
  );
}
