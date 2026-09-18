import AdminSidebar from "./AdminSidebar";
import MobileAdminNav from "./admin/MobileAdminNav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 pb-20 md:pb-0">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <MobileAdminNav />
    </div>
  );
}
