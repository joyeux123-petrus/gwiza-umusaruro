'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Filter, ChevronLeft, ChevronRight, MoreVertical,
  Eye, Edit, Trash2, CheckCircle, XCircle, Star, TrendingUp, Package, AlertCircle
} from 'lucide-react';

interface Category {
  id: string;
  nameEn: string;
  parent?: any;
}

interface Product {
  id: string;
  nameEn: string;
  nameRw: string;
  slug: string;
  categoryId: string;
  category: Category;
  published: boolean;
  featured: boolean;
  promoted: boolean;
  availability: string;
  image: string | null;
  updatedAt: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters & Search
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('all'); // all, published, unpublished
  const [isFeatured, setIsFeatured] = useState<boolean | null>(null);
  const [isPromoted, setIsPromoted] = useState<boolean | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    limit: 10
  });

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `/api/admin/products?page=${page}&limit=10&query=${query}&categoryId=${categoryId}`;
      if (status === 'published') url += '&published=true';
      if (status === 'unpublished') url += '&published=false';
      if (isFeatured !== null) url += `&featured=${isFeatured}`;
      if (isPromoted !== null) url += `&promoted=${isPromoted}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, query, categoryId, status, isFeatured, isPromoted]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTogglePublished = async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !product.published }),
      });
      if (res.ok) fetchProducts();
    } catch (err) {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (err) {}
  };

  const handleBulkAction = async (action: 'publish' | 'unpublish' | 'delete') => {
    if (selectedIds.length === 0) return;

    let confirmMsg = `Apply ${action} to ${selectedIds.length} products?`;
    if (action === 'delete') confirmMsg = `PERMANENTLY DELETE ${selectedIds.length} products? This cannot be undone.`;

    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch('/api/admin/products/bulk', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedIds,
          action: action === 'delete' ? 'delete' : 'update',
          data: action === 'publish' ? { published: true } : action === 'unpublish' ? { published: false } : undefined
        }),
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchProducts();
      }
    } catch (err) {}
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Filters Bar */}
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 items-center">
        <div className="relative w-full sm:flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-2xl outline-none transition-all text-sm text-gray-900"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full sm:w-48 px-4 py-3 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
          >
            <option value="" className="text-gray-900">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="text-gray-900">{cat.nameEn}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-40 px-4 py-3 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
          >
            <option value="all" className="text-gray-900">All Status</option>
            <option value="published" className="text-gray-900">Published</option>
            <option value="unpublished" className="text-gray-900">Unpublished</option>
          </select>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsFeatured(isFeatured === true ? null : true)}
              className={`p-3 rounded-2xl border transition-all ${isFeatured === true ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-gray-50 border-transparent text-gray-400'}`}
              title="Filter Featured"
            >
              <Star size={20} fill={isFeatured === true ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => setIsPromoted(isPromoted === true ? null : true)}
              className={`p-3 rounded-2xl border transition-all ${isPromoted === true ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-transparent text-gray-400'}`}
              title="Filter Promoted"
            >
              <TrendingUp size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <span className="font-bold text-sm">{selectedIds.length} selected</span>
            <div className="hidden md:block h-6 w-px bg-emerald-800"></div>
            <div className="flex gap-4">
              <button onClick={() => handleBulkAction('publish')} className="text-xs md:text-sm font-bold hover:text-emerald-300 transition-colors">Publish</button>
              <button onClick={() => handleBulkAction('unpublish')} className="text-xs md:text-sm font-bold hover:text-emerald-300 transition-colors">Unpublish</button>
              <button onClick={() => handleBulkAction('delete')} className="text-xs md:text-sm font-bold text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
          <button onClick={() => setSelectedIds([])} className="text-xs font-bold opacity-60 hover:opacity-100 uppercase tracking-widest">Clear</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 accent-emerald-600 rounded"
                  />
                </th>
                <th className="px-6 py-5 font-bold text-gray-700 text-xs uppercase tracking-widest">Product</th>
                <th className="px-6 py-5 font-bold text-gray-700 text-xs uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 font-bold text-gray-700 text-xs uppercase tracking-widest text-center">Stats</th>
                <th className="px-6 py-5 font-bold text-gray-700 text-xs uppercase tracking-widest text-center">Published</th>
                <th className="px-6 py-5 font-bold text-gray-700 text-xs uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-8 bg-gray-50/20"></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50/50 transition-colors group ${selectedIds.includes(product.id) ? 'bg-emerald-50/30' : ''}`}>
                    <td className="px-6 py-6">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="w-5 h-5 accent-emerald-600 rounded"
                      />
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                          {product.image ? (
                            <Image src={product.image} alt={product.nameEn} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 line-clamp-1">{product.nameEn}</div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">
                          {product.category?.parent
                            ? `${(product.category.parent as any).nameEn} > ${product.category.nameEn}`
                            : product.category?.nameEn || 'Uncategorized'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-center gap-3">
                        <Star size={16} className={product.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-200'} />
                        <TrendingUp size={16} className={product.promoted ? 'text-blue-500' : 'text-gray-200'} />
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <button
                        onClick={() => handleTogglePublished(product)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          product.published
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {product.published ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {product.published ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                          title="View on site"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-gray-400">
                    <Package className="mx-auto mb-4 opacity-20" size={64} />
                    <p className="text-lg font-bold">No products found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Showing {products.length} of {pagination.total} products
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center px-4 font-bold text-gray-700">
                {page} / {pagination.totalPages}
              </div>
              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <AlertCircle size={24} />
          <div className="font-bold">{error}</div>
          <button onClick={() => setError('')} className="ml-4 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}
    </div>
  );
}
