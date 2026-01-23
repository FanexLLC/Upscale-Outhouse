import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin | Upscale Outhouse",
  description: "Admin dashboard for Upscale Outhouse",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If not authenticated, just render children (login page handles itself)
  // The middleware will redirect non-login pages to login
  if (!session) {
    return <>{children}</>;
  }

  // Authenticated users get the full admin layout with sidebar
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  );
}
