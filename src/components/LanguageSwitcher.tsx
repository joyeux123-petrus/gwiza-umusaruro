'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLocale = (newLocale: 'rw' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2 font-medium text-sm">
      <button
        onClick={() => toggleLocale('rw')}
        className={`${locale === 'rw' ? 'text-emerald-600 underline' : 'text-gray-600'} hover:text-emerald-500`}
      >
        RW
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => toggleLocale('en')}
        className={`${locale === 'en' ? 'text-emerald-600 underline' : 'text-gray-600'} hover:text-emerald-500`}
      >
        EN
      </button>
    </div>
  );
}
