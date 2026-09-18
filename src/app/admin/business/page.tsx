import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import prisma from "@/lib/prisma";
import { Save } from "lucide-react";

export default async function AdminBusinessPage() {
  const info = await prisma.businessInfo.findUnique({
    where: { id: 'singleton' }
  });

  return (
    <AuthenticatedLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Business Information</h2>
        <p className="text-gray-500 mt-2">Update your business contact details and location.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-4xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                defaultValue={info?.phone || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number (e.g. 25078...)</label>
              <input
                type="text"
                defaultValue={info?.whatsapp || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={info?.email || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Opening Hours</label>
              <input
                type="text"
                defaultValue={info?.openingHours || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Physical Address</label>
              <input
                type="text"
                defaultValue={info?.address || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps Link</label>
              <input
                type="text"
                defaultValue={info?.mapsUrl || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
