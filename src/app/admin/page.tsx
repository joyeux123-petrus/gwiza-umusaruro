import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalProducts,
    publishedProducts,
    featuredProducts,
    totalCategories,
    articlesCount,
    productsMissingImages
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.product.count({ where: { featured: true } }),
    prisma.category.count(),
    prisma.article.count(),
    prisma.product.count({ where: { OR: [{ image: null }, { image: "" }] } }),
  ]);

  const stats = [
    { label: "Total Products", value: totalProducts, color: "text-emerald-600" },
    { label: "Published", value: publishedProducts, color: "text-blue-600" },
    { label: "Featured", value: featuredProducts, color: "text-amber-500" },
    { label: "Categories", value: totalCategories, color: "text-purple-600" },
    { label: "Missing Images", value: productsMissingImages, color: "text-red-500" },
    { label: "Total Articles", value: articlesCount, color: "text-gray-600" },
  ];

  return (
    <AuthenticatedLayout>
      <header className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-1 md:mt-2">Welcome back to Gwiza Umusaruro management portal.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-gray-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1 md:mb-2">{stat.label}</h3>
            <p className={`text-2xl sm:text-4xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
