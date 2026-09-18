'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, ChevronRight, ChevronDown,
  Layers, GripVertical, CheckCircle, XCircle, X
} from 'lucide-react';
import CategoryForm from './CategoryForm';

interface Category {
  id: string;
  nameEn: string;
  nameRw: string;
  slug: string;
  parentId: string | null;
  displayOrder: number;
  active: boolean;
  _count?: { products: number };
  children?: Category[];
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {}
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        fetchCategories();
      } else {
        alert(data.error);
      }
    } catch (err) {}
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const renderCategory = (cat: Category, level = 0) => {
    const isExpanded = expanded.includes(cat.id);
    const hasChildren = cat.children && cat.children.length > 0;

    return (
      <div key={cat.id} className="w-full">
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-3 md:px-6 hover:bg-gray-50/80 transition-colors border-b border-gray-50 group ${level > 0 ? 'ml-2 sm:ml-4 md:ml-8 border-l-2 border-emerald-100' : ''}`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(cat.id)}
                className="p-1 hover:bg-gray-200 rounded text-gray-400 flex-shrink-0"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <div className="w-6 flex-shrink-0" />
            )}

            <Layers size={18} className="text-emerald-600 opacity-60 flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 truncate text-xs sm:text-sm md:text-base">{cat.nameEn}</div>
              <div className="text-[10px] text-gray-400 font-mono truncate">{cat.slug}</div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                {cat._count?.products || 0} Prod
              </span>

              {!cat.active && (
                <span className="px-1.5 py-0.5 bg-red-50 text-red-500 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                  <XCircle size={10} /> Hide
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity border-t sm:border-t-0 pt-2 sm:pt-0">
            <button
              onClick={() => openEdit(cat)}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-1 text-xs"
              title="Edit"
            >
              <Edit size={16} /> <span className="sm:hidden font-bold">Edit</span>
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1 text-xs"
              title="Delete"
            >
              <Trash2 size={16} /> <span className="sm:hidden font-bold">Delete</span>
            </button>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="w-full">
            {cat.children?.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Product Categories</h3>
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95 text-sm"
        >
          <Plus size={18} /> New Category
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-emerald-100 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4 md:mb-6 border-b pb-3 md:pb-4">
            <h4 className="text-base md:text-lg font-bold text-gray-900">
              {editingCategory ? `Edit: ${editingCategory.nameEn}` : 'Create New Category'}
            </h4>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <CategoryForm
            parentCategories={categories}
            initialData={editingCategory}
            onSuccess={() => { closeForm(); fetchCategories(); }}
            onCancel={closeForm}
          />
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center animate-pulse text-gray-400 font-bold">Loading categories...</div>
        ) : categories.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {categories.map(cat => renderCategory(cat))}
          </div>
        ) : (
          <div className="p-20 text-center text-gray-400">
            <Layers className="mx-auto mb-4 opacity-20" size={64} />
            <p className="text-lg font-bold">No categories defined</p>
          </div>
        )}
      </div>
    </div>
  );
}
