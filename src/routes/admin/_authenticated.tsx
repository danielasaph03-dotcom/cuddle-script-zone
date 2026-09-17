import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { getSession } from "../../lib/auth";

export const Route = createFileRoute("/admin/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
