'use client';

import { useState } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Navigation');

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/products', label: t('products') },
    { href: '/tips', label: t('tips') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-emerald-700 font-bold text-lg sm:text-2xl tracking-tight whitespace-nowrap">GWIZA UMUSARURO</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute top-20 left-0 right-0 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-lg font-bold text-gray-800 hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-all border border-transparent hover:border-emerald-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 pb-2 border-t border-gray-100 flex flex-col gap-4 mt-4">
              <a href="tel:0793408967" className="flex items-center justify-center gap-3 bg-emerald-50 text-emerald-700 py-4 rounded-2xl font-bold hover:bg-emerald-100 transition-all border border-emerald-100">
                <Phone size={22} /> 0793408967
              </a>
              <a href="https://wa.me/250793408967" className="flex items-center justify-center gap-3 bg-green-50 text-green-700 py-4 rounded-2xl font-bold hover:bg-green-100 transition-all border border-green-100">
                <MessageSquare size={22} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
