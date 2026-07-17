import { requireAdminAccess } from "@/app/access-auth";
import AdminLibrary from "./studio";
export const dynamic = "force-dynamic";
export default async function AdminPage(){await requireAdminAccess();return <AdminLibrary/>}
