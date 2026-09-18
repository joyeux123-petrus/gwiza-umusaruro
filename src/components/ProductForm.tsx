'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  nameEn: string;
  parentId?: string | null;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: any;
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nameRw: initialData?.nameRw || '',
    nameEn: initialData?.nameEn || '',
    slug: initialData?.slug || '',
    categoryId: initialData?.categoryId || categories[0]?.id || '',
    descriptionRw: initialData?.descriptionRw || '',
    descriptionEn: initialData?.descriptionEn || '',
    brand: initialData?.brand || '',
    package: initialData?.package || '',
    productType: initialData?.productType || '',
    animalType: initialData?.animalType || '',
    cropType: initialData?.cropType || '',
    activeIngredients: initialData?.activeIngredients || '',
    usagePurpose: initialData?.usagePurpose || '',
    price: initialData?.price || '',
    availability: initialData?.availability || 'AVAILABLE',
    featured: initialData?.featured || false,
    promoted: initialData?.promoted || false,
    published: initialData?.published ?? true,
    displayOrder: initialData?.displayOrder || 0,
    image: initialData?.image || '',
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
        ? `/api/admin/products/${initialData.id}`
        : '/api/admin/products';

      const res = await fetch(url, {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: formData.price === '' ? null : parseFloat(formData.price.toString()),
          displayOrder: parseInt(formData.displayOrder.toString())
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
          <X size={20} />
          <p className="font-bold">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name (English)</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name (Kinyarwanda)</label>
                <input
                  type="text"
                  value={formData.nameRw}
                  onChange={(e) => setFormData({...formData, nameRw: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL handle)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                  placeholder="e.g. antibiotic-spray"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                >
                  {categories.filter(c => !c.parentId).map(parent => (
                    <optgroup key={parent.id} label={parent.nameEn} className="text-gray-900">
                      <option value={parent.id} className="text-gray-900">{parent.nameEn} (Main)</option>
                      {categories.filter(c => c.parentId === parent.id).map(child => (
                        <option key={child.id} value={child.id} className="text-gray-900">{child.nameEn}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Descriptions</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description (English)</label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all h-32 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description (Kinyarwanda)</label>
                <textarea
                  value={formData.descriptionRw}
                  onChange={(e) => setFormData({...formData, descriptionRw: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all h-32 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Technical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Active Ingredients</label>
                <input
                  type="text"
                  value={formData.activeIngredients}
                  onChange={(e) => setFormData({...formData, activeIngredients: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                  placeholder="e.g. Amoxicillin, Ivermectin"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Usage / Purpose</label>
                <input
                  type="text"
                  value={formData.usagePurpose}
                  onChange={(e) => setFormData({...formData, usagePurpose: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                  placeholder="e.g. De-worming, Pain relief"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Brand / Manufacturer</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Animal Type (if applicable)</label>
                <input
                  type="text"
                  value={formData.animalType}
                  onChange={(e) => setFormData({...formData, animalType: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                  placeholder="e.g. Cattle, Poultry, Pigs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Media & Price</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Direct Image Upload</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-500 transition-all group">
                  <Upload className="h-6 w-6 text-gray-400 group-hover:text-emerald-600 transition-colors mb-2" />
                  <span className="text-xs font-bold text-gray-500 group-hover:text-emerald-700">Select image file...</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Or Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900 text-xs"
                  placeholder="/images/products/example.jpg"
                />
              </div>

              {formData.image && (
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 mt-2">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 shadow transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all font-bold text-gray-900"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Package / Unit</label>
              <input
                type="text"
                value={formData.package}
                onChange={(e) => setFormData({...formData, package: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
                placeholder="e.g. 500ml, 10 tablets"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Status & Visibility</h3>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none transition-all text-gray-900"
              >
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
                <option value="CONTACT">Contact for info</option>
              </select>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">Published</span>
                  <span className="text-[10px] text-gray-500">Visible on public catalog</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="w-6 h-6 accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-amber-100 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">Featured</span>
                  <span className="text-[10px] text-gray-500">Show on homepage</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-6 h-6 accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">Promoted</span>
                  <span className="text-[10px] text-gray-500">Highlighted in results</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.promoted}
                  onChange={(e) => setFormData({...formData, promoted: e.target.checked})}
                  className="w-6 h-6 accent-blue-600 cursor-pointer"
                />
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pb-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 border border-gray-300 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-12 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/10 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Saving...' : <><Save size={20} /> Save Product</>}
        </button>
      </div>
    </form>
  );
}
