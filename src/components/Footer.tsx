'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  businessInfo: any;
}

export default function Footer({ businessInfo }: FooterProps) {
  const tNav = useTranslations('Navigation');
  const tCommon = useTranslations('Common');

  return (
    <footer className="bg-emerald-950 text-emerald-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          {/* Brand & About */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white text-xl font-bold mb-6 tracking-tight">GWIZA UMUSARURO AGROVETO</h3>
            <p className="text-emerald-200/80 mb-6 leading-relaxed max-w-sm">
              {tCommon('footerText')}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{tNav('products')}</h4>
            <ul className="space-y-4">
              <li><Link href="/products?category=veterinary" className="hover:text-white transition-colors">{tNav('veterinary')}</Link></li>
              <li><Link href="/products?category=seeds" className="hover:text-white transition-colors">{tNav('seeds')}</Link></li>
              <li><Link href="/products?category=crop-protection" className="hover:text-white transition-colors">{tNav('cropProtection')}</Link></li>
              <li><Link href="/tips" className="hover:text-white transition-colors">{tNav('tips')}</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-white transition-colors">{tNav('about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{tNav('contact')}</h4>
            <ul className="space-y-4 text-emerald-200/80">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin className="flex-shrink-0 md:mt-1" size={18} />
                <span>{businessInfo?.address || 'Kamonyi, Mugina'}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <Phone className="flex-shrink-0" size={18} />
                <span>{businessInfo?.phone || '0793408967'}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MessageSquare className="flex-shrink-0" size={18} />
                <span>{businessInfo?.whatsapp || '0793408967'}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <Mail className="flex-shrink-0" size={18} />
                <span>{businessInfo?.email || 'shemubruno98@gmail.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900/50 pt-8 text-center text-sm text-emerald-400">
          <p>© {new Date().getFullYear()} Gwiza Umusaruro Agroveto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
