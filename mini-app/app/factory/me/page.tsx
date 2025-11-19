import { Me } from "@/components/me";
import { headers } from "next/headers";

export default async function MePage() {
  const user = await headers().then((h) => h.get("Xnode-Auth-User"));

  return <Me user={user} />;
}
