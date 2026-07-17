import { requireChatGPTUser } from "@/app/chatgpt-auth";
import AdminLibrary from "./studio";
export const dynamic = "force-dynamic";
export default async function AdminPage(){await requireChatGPTUser("/admin");return <AdminLibrary/>}
