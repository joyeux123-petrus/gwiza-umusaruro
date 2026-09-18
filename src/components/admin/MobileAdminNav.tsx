'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, FileText, Settings, Users, Layers, Home } from "lucide-react";

export default function MobileAdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Home", icon: <Settings size={20} /> },
    { href: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { href: "/admin/categories", label: "Cats", icon: <Layers size={20} /> },
    { href: "/admin/articles", label: "Blog", icon: <FileText size={20} /> },
    { href: "/admin/business", label: "Info", icon: <Users size={20} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              isActive ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-emerald-50' : ''}`}>
              {link.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
