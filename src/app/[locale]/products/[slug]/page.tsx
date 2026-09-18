import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Phone, MessageSquare, MapPin, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from '@/navigation';

export default async function ProductDetailPage({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('ProductDetails');
  const tCommon = await getTranslations('Common');

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { include: { parent: true } } },
  });

  if (!product || !product.published) {
    notFound();
  }

  const name = locale === 'rw' ? product.nameRw : product.nameEn;
  const description = locale === 'rw' ? product.descriptionRw : product.descriptionEn;
  const categoryName = locale === 'rw' ? product.category.nameRw : product.category.nameEn;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center text-emerald-600 font-medium hover:underline mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Subira inyuma
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            {product.image ? (
              <Image
                src={product.image}
                alt={name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200">
                <span className="text-9xl">🌱</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                {categoryName}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{name}</h1>
            </div>

            <div className="space-y-6 mb-10">
              {product.price && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Price</h4>
                  <p className="text-3xl text-emerald-600 font-extrabold">{product.price.toLocaleString()} RWF</p>
                </div>
              )}
              {product.brand && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('brand')}</h4>
                  <p className="text-lg text-gray-700 font-medium">{product.brand}</p>
                </div>
              )}
              {product.activeIngredients && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Ingredients</h4>
                  <p className="text-lg text-gray-700 font-medium">{product.activeIngredients}</p>
                </div>
              )}
              {product.usagePurpose && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Purpose / Usage</h4>
                  <p className="text-lg text-gray-700 font-medium">{product.usagePurpose}</p>
                </div>
              )}
              {product.animalType && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Target Animal</h4>
                  <p className="text-lg text-gray-700 font-medium">{product.animalType}</p>
                </div>
              )}
              {product.package && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('package')}</h4>
                  <p className="text-lg text-gray-700 font-medium">{product.package}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('availability')}</h4>
                <p className={`text-lg font-bold ${
                  product.availability === 'AVAILABLE' ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {product.availability === 'AVAILABLE' ? tCommon('available') : tCommon('unavailable')}
                </p>
              </div>
            </div>

            <div className="prose prose-emerald max-w-none mb-10">
              <p className="text-gray-600 leading-relaxed text-lg italic">
                {description || "Nta bisobanuro birambuye bihari ubu."}
              </p>
            </div>

            {product.category.slug === 'veterinary' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 mb-10">
                <AlertTriangle className="text-amber-500 flex-shrink-0" size={24} />
                <p className="text-sm text-amber-800 font-medium">
                  {t('warning')}
                </p>
              </div>
            )}

            {/* Contact Actions */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-2">{t('contactTitle')}</h3>
              <p className="text-emerald-800/70 mb-6">{t('contactSubtitle')}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:0793408967"
                  className="flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md"
                >
                  <Phone size={24} />
                  {tCommon('callUs')}
                </a>
                <a
                  href={`https://wa.me/250793408967?text=Ubuza%20kuri%20${encodeURIComponent(name)}`}
                  className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-md"
                >
                  <MessageSquare size={24} />
                  {tCommon('whatsappUs')}
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-200/50">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 text-emerald-700 font-bold hover:underline"
                >
                  <MapPin size={20} />
                  {tCommon('getDirections')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
