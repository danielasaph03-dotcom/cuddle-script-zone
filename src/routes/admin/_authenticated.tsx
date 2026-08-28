import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

export const Route = createFileRoute("/admin/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (!supabase) {
      throw redirect({ to: "/admin/login" });
    }
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
