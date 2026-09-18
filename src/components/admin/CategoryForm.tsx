'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload } from 'lucide-react';

interface Category {
  id: string;
  nameEn: string;
}

interface CategoryFormProps {
  parentCategories: Category[];
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CategoryForm({ parentCategories, initialData, onSuccess, onCancel }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nameRw: initialData?.nameRw || '',
    nameEn: initialData?.nameEn || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    parentId: initialData?.parentId || null,
    displayOrder: initialData?.displayOrder || 0,
    active: initialData?.active ?? true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = initialData?.id
        ? `/api/admin/categories/${initialData.id}`
        : '/api/admin/categories';

      const res = await fetch(url, {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          displayOrder: parseInt(formData.displayOrder.toString())
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      if (onSuccess) onSuccess();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Name (English)</label>
          <input
            type="text"
            value={formData.nameEn}
            onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Name (Kinyarwanda)</label>
          <input
            type="text"
            value={formData.nameRw}
            onChange={(e) => setFormData({...formData, nameRw: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Parent Category (optional)</label>
          <select
            value={formData.parentId || ''}
            onChange={(e) => setFormData({...formData, parentId: e.target.value || null})}
            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
          >
            <option value="" className="text-gray-900">None (Top Level)</option>
            {parentCategories
              .filter(cat => cat.id !== initialData?.id) // Prevent self-parenting
              .map(cat => (
                <option key={cat.id} value={cat.id} className="text-gray-900">{cat.nameEn}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
            placeholder="e.g. animal-medicines"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all h-24 text-gray-900"
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Direct Image Upload</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-3 bg-gray-50 cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-500 transition-all group">
                <Upload className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors mb-1" />
                <span className="text-xs font-bold text-gray-500 group-hover:text-emerald-700">Select image...</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Or Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900 text-xs"
                placeholder="/images/categories/example.jpg"
              />
            </div>
          </div>

          {formData.image && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-100 mt-1">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: '' })}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
          <input
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({...formData, displayOrder: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="cat-active"
            checked={formData.active}
            onChange={(e) => setFormData({...formData, active: e.target.checked})}
            className="w-5 h-5 accent-emerald-600"
          />
          <label htmlFor="cat-active" className="text-sm font-bold text-gray-700">Active / Visible</label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Saving...' : <><Save size={18} /> Save Category</>}
        </button>
      </div>
    </form>
  );
}
