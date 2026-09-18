import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Image from 'next/image';

export default async function ArticleDetailPage({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string };
}) {
  setRequestLocale(locale);
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  const title = locale === 'rw' ? article.titleRw : article.titleEn;
  const content = locale === 'rw' ? article.contentRw : article.contentEn;

  return (
    <article className="bg-white min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/tips" className="inline-flex items-center text-emerald-600 font-medium hover:underline mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Subira inyuma
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-y border-gray-100 py-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-emerald-600" />
              {new Date(article.createdAt).toLocaleDateString(locale === 'rw' ? 'rw-RW' : 'en-US')}
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-emerald-600" />
              {article.author}
            </div>
            <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors sm:ml-auto">
              <Share2 size={18} />
              Sangiza abandi
            </button>
          </div>
        </header>

        {article.image && (
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={article.image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg prose-emerald max-w-none">
          {/* In a real app, this would be rendered from Markdown or HTML safely */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>

        <div className="mt-16 p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">Ukeneye andi makuru?</h3>
          <p className="text-emerald-800/70 mb-8 max-w-md">
            Twandikire uyu munsi kugira ngo uguhe inama zihariye zigufasha mu buhinzi n'ubworozi bwawe.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-md"
          >
            Twandikire ubu
          </Link>
        </div>
      </div>
    </article>
  );
}
