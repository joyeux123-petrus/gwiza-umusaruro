import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import { Leaf, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export default async function Home({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, published: true },
    include: { category: true },
    orderBy: { displayOrder: 'asc' },
    take: 8,
  });

  const categories = await prisma.category.findMany({
    where: { parentId: null, active: true },
    orderBy: { displayOrder: 'asc' },
    take: 6,
  });

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white overflow-hidden py-12 sm:py-16 lg:py-24">
        {/* Subtle background overlay grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/50 border border-emerald-700/40 text-xs font-semibold tracking-wider text-emerald-300 uppercase w-fit mb-6 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {locale === 'rw' ? 'Agroveto Yizewe' : 'Trusted Agroveto'}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
                {t('heroTitle')}
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-8 text-emerald-100/90 max-w-2xl leading-relaxed">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-600/30 active:scale-95 group"
                >
                  {t('ctaProducts')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl font-bold text-lg transition-all active:scale-95 backdrop-blur-sm"
                >
                  {t('ctaContact')}
                </Link>
              </div>

              {/* 4 Pillars Segment */}
              <div className="border-t border-emerald-800/60 pt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400/80 mb-4">
                  {locale === 'rw' ? 'Ibyo Tukugezaho Kurusha Ibindi' : 'Our Main Core Product Areas'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5 hover:bg-white/10 transition-colors shadow-sm">
                    <span className="text-xl filter drop-shadow">🐄</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">
                      {locale === 'rw' ? 'Imiti' : 'Medicine'}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5 hover:bg-white/10 transition-colors shadow-sm">
                    <span className="text-xl filter drop-shadow">🌱</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">
                      {locale === 'rw' ? 'Imbuto' : 'Seeds'}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5 hover:bg-white/10 transition-colors shadow-sm">
                    <span className="text-xl filter drop-shadow">🌿</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">
                      {locale === 'rw' ? 'Kurinda Imyaka' : 'Crop Protection'}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2.5 hover:bg-white/10 transition-colors shadow-sm">
                    <span className="text-xl filter drop-shadow">🌾</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">
                      {locale === 'rw' ? 'Ubuhinzi' : 'Agriculture'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Premium Visual Composition Column */}
            <div className="lg:col-span-5 w-full relative mt-4 lg:mt-0">
              <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[480px] mx-auto max-w-md sm:max-w-xl lg:max-w-none">

                {/* Image 1 - Main Large Base Left */}
                <div className="absolute left-0 bottom-4 w-[62%] h-[78%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group transition-transform duration-500 hover:scale-[1.02] z-10">
                  <Image
                    src="/images/1.png"
                    alt="Agricultural Showcase 1"
                    fill
                    sizes="(max-w-7xl) 33vw, 50vw"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
                </div>

                {/* Image 2 - Top Right Offset */}
                <div className="absolute right-0 top-0 w-[55%] h-[58%] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-900 group transition-transform duration-500 hover:scale-[1.02] z-0">
                  <Image
                    src="/images/2.png"
                    alt="Agricultural Showcase 2"
                    fill
                    sizes="(max-w-7xl) 25vw, 40vw"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent"></div>
                </div>

                {/* Image 3 - Bottom Right Overlapping Floating Card */}
                <div className="absolute right-4 bottom-0 w-[48%] h-[50%] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-900 group transition-transform duration-500 hover:scale-[1.05] hover:z-30 z-20">
                  <Image
                    src="/images/3.png"
                    alt="Agricultural Showcase 3"
                    fill
                    sizes="(max-w-7xl) 25vw, 40vw"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating Badge Decorative Element */}
                <div className="absolute -left-2 top-12 bg-white/90 backdrop-blur-md text-emerald-950 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-100 z-30 animate-bounce [animation-duration:4s]">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700">
                    <Leaf className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider leading-none">Gwiza Umusaruro</span>
                    <span className="text-xs font-bold leading-tight mt-0.5">{locale === 'rw' ? 'Umusaruro Mwiza' : 'Premium Quality'}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{t('categoriesTitle')}</h2>
            <div className="h-1.5 w-20 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative h-40 sm:h-64 rounded-2xl overflow-hidden shadow-md active:scale-[0.98] transition-transform"
              >
                <div className="absolute inset-0 bg-emerald-800 opacity-60 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {locale === 'rw' ? cat.nameRw : cat.nameEn}
                  </h3>
                  <span className="text-emerald-100 text-sm font-medium underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Reba ibikubiyemo
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('featuredTitle')}</h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Duhitamo ibyiza kurusha ibindi ku bahinzi bacu.</p>
            </div>
            <Link href="/products" className="text-emerald-600 font-bold hover:underline mb-1 hidden md:block">
              Ibindi byose →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('whyChooseUsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-emerald-300">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4">{t('quality')}</h4>
              <p className="text-emerald-100/70">Ibicuruzwa byose tubagemurira ni iby'ubuziranenge bwizewe.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-emerald-300">
                <Leaf size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4">{t('expertise')}</h4>
              <p className="text-emerald-100/70">Tuguha inama z'inzobere zizagufasha kongera umusaruro wawe.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-emerald-300">
                <Users size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4">{t('community')}</h4>
              <p className="text-emerald-100/70">Turi umufatanyabikorwa w'abahinzi n'aborozi mu iterambere.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
