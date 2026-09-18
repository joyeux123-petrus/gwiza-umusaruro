import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { ShieldCheck, Award, TrendingUp } from 'lucide-react';

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-emerald-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-[250px] sm:h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl bg-emerald-50">
              {/* Placeholder for About Image */}
              <div className="absolute inset-0 flex items-center justify-center text-emerald-200">
                <span className="text-9xl">🚜</span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Urugendo rwa Gwiza Umusaruro</h2>
              <div className="prose prose-lg prose-emerald text-gray-600 mb-10">
                <p className="leading-relaxed">
                  {t('content')}
                </p>
                <p>
                  Intego yacu ni uko buri muhinzi n'uworozi mu Rwanda agira ubushobozi bwo kongera umusaruro we binyuze mu gukoresha ibikoresho n'imiti byujuje ubuziranenge.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-emerald-100 rounded-xl text-emerald-600">
                    <ShieldCheck size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900">Ubwizerane</h4>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-emerald-100 rounded-xl text-emerald-600">
                    <Award size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900">Ubwiza</h4>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-emerald-100 rounded-xl text-emerald-600">
                    <TrendingUp size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900">Iterambere</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
