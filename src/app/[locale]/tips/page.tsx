import prisma from '@/lib/prisma';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default async function TipsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('Tips');

  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-emerald-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {articles.map((article) => {
              const title = locale === 'rw' ? article.titleRw : article.titleEn;
              const summary = locale === 'rw' ? article.summaryRw : article.summaryEn;

              return (
                <article key={article.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="relative h-56 bg-emerald-50">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-emerald-200">
                        <span className="text-6xl">📖</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(article.createdAt).toLocaleDateString(locale === 'rw' ? 'rw-RW' : 'en-US')}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {article.author}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {title}
                    </h2>

                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                      {summary}
                    </p>

                    <Link
                      href={`/tips/${article.slug}`}
                      className="inline-flex items-center text-emerald-600 font-bold hover:gap-2 transition-all"
                    >
                      {t('readMore')}
                      <ArrowRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Nta makuru arahari ubu.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
