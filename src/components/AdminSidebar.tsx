'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, FileText, Settings, Users, LogOut, Home, Layers } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Overview", icon: <Settings size={20} /> },
    { href: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { href: "/admin/categories", label: "Categories", icon: <Layers size={20} /> },
    { href: "/admin/articles", label: "Articles", icon: <FileText size={20} /> },
    { href: "/admin/business", label: "Business Info", icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-64 bg-emerald-950 text-white p-6 hidden md:flex flex-col min-h-screen sticky top-0">
      <h1 className="text-xl font-bold mb-10 tracking-tight flex items-center gap-2">
        <span className="text-emerald-500 text-2xl">🌱</span> GWIZA ADMIN
      </h1>

      <nav className="flex-grow space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === link.href ? 'bg-emerald-800 text-white shadow-lg' : 'text-emerald-100/60 hover:bg-emerald-900 hover:text-white'
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-emerald-900 space-y-2">
        <Link href="/" className="flex items-center gap-3 p-3 text-emerald-100/60 hover:text-white transition-colors">
          <Home size={20} /> View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
