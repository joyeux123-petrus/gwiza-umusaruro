import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

export default async function ProductsPage({
  searchParams,
  params: { locale }
}: {
  searchParams: { query?: string; category?: string; sub?: string };
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('Products');

  const query = searchParams.query || '';
  const categorySlug = searchParams.category || '';
  const subCategorySlug = searchParams.sub || '';

  const categories = await prisma.category.findMany({
    where: { parentId: null, active: true },
    include: { children: { where: { active: true } } }
  });

  const activeCategory = categorySlug
    ? categories.find(c => c.slug === categorySlug)
    : null;

  const activeSubCategory = activeCategory && subCategorySlug
    ? activeCategory.children.find(c => c.slug === subCategorySlug)
    : null;

  const products = await prisma.product.findMany({
    where: {
      published: true,
      AND: [
        {
          OR: [
            { nameRw: { contains: query } },
            { nameEn: { contains: query } },
            { descriptionRw: { contains: query } },
            { descriptionEn: { contains: query } },
            { brand: { contains: query } },
            { activeIngredients: { contains: query } },
          ],
        },
        activeSubCategory
          ? { categoryId: activeSubCategory.id }
          : activeCategory
            ? {
                OR: [
                  { categoryId: activeCategory.id },
                  { category: { parentId: activeCategory.id } }
                ]
              }
            : {},
      ],
    },
    include: { category: true },
    orderBy: [
      { displayOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-emerald-900 text-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-sm md:text-base">
            {locale === 'rw'
              ? 'Genzura ibikubiye mu maduka yacu, waba ushaka imiti, imbuto cyangwa ibikoresho.'
              : 'Explore our catalog of quality agricultural and livestock products.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-6 flex flex-col gap-4 md:gap-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between w-full">
            <Search />

            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/products"
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  !categorySlug ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('all')}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}${query ? `&query=${query}` : ''}`}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    categorySlug === cat.slug ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {locale === 'rw' ? cat.nameRw : cat.nameEn}
                </Link>
              ))}
            </div>
          </div>

          {/* Subcategory Filters */}
          {activeCategory && activeCategory.children.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50 justify-center md:justify-start">
              <Link
                href={`/products?category=${categorySlug}${query ? `&query=${query}` : ''}`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  !subCategorySlug ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {t('all')}
              </Link>
              {activeCategory.children.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products?category=${categorySlug}&sub=${sub.slug}${query ? `&query=${query}` : ''}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    subCategorySlug === sub.slug ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {locale === 'rw' ? sub.nameRw : sub.nameEn}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-12">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">{t('noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
