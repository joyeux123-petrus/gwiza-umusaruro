import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Phone, MessageSquare, MapPin, Mail, Clock } from 'lucide-react';

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('Contact');
  const tCommon = await getTranslations('Common');

  const contactMethods = [
    {
      icon: <Phone className="text-emerald-600" size={28} />,
      title: t('callNow'),
      value: "0793408967",
      link: "tel:0793408967"
    },
    {
      icon: <MessageSquare className="text-green-500" size={28} />,
      title: t('sendMessage'),
      value: "0793408967",
      link: "https://wa.me/250793408967"
    },
    {
      icon: <Mail className="text-blue-500" size={28} />,
      title: "Email",
      value: "shemubruno98@gmail.com",
      link: "mailto:shemubruno98@gmail.com"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-emerald-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-16 md:mb-20">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="flex flex-col items-center p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow text-center group active:scale-[0.98]"
              >
                <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{method.title}</h3>
                <p className="text-xl font-bold text-gray-900">{method.value}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Location & Hours */}
            <div className="space-y-8 md:space-y-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8 flex items-center gap-3">
                  <MapPin className="text-emerald-600" />
                  {t('findUs')}
                </h2>
                <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                    Kamonyi, Mugina
                  </p>
                  <a
                    href="https://maps.app.goo.gl/Q2SHnrAYw94Yrrb18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 md:mt-6 text-emerald-600 font-bold hover:underline"
                  >
                    {tCommon('getDirections')} →
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8 flex items-center gap-3">
                  <Clock className="text-emerald-600" />
                  {t('openingHours')}
                </h2>
                <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
                  <p className="text-lg md:text-xl text-gray-700 font-medium">
                    Mon - Sat: 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-500 mt-2 text-sm md:text-base">Dufunguye mu minsi yose y'akazi.</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-4">
                <MapPin size={64} />
                <p className="font-medium text-lg">Google Maps Icyerekezo</p>
              </div>
              {/* In production, embed actual Google Maps iframe here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
