'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';

interface ProductCardProps {
  product: {
    id: string;
    nameRw: string;
    nameEn: string;
    slug: string;
    image: string | null;
    availability: string;
    subCategoryRw: string | null;
    subCategoryEn: string | null;
    variant: string | null;
    category: {
      nameRw: string;
      nameEn: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('Common');
  const locale = useLocale();

  const name = locale === 'rw' ? product.nameRw : product.nameEn;
  const categoryName = locale === 'rw' ? product.category.nameRw : product.category.nameEn;
  const subCategory = locale === 'rw' ? product.subCategoryRw : product.subCategoryEn;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span className="text-4xl">🌱</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
            product.availability === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {product.availability === 'AVAILABLE' ? t('available') : t('unavailable')}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">{categoryName}</p>
        {subCategory && (
          <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wider mb-1 line-clamp-1">
            {subCategory} {product.variant && `• ${product.variant}`}
          </p>
        )}
        <h3 className="font-bold text-gray-900 mb-3 text-xs sm:text-base line-clamp-1">{name}</h3>
        <Link
          href={`/products/${product.slug}`}
          className="block w-full text-center py-2 border border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis px-1"
        >
          {t('viewDetails')}
        </Link>
      </div>
    </div>
  );
}
