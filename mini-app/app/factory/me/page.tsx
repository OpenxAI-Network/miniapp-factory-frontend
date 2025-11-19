import { Me } from "@/components/me";
import { headers } from "next/headers";

export default async function MePage() {
  const user = await headers().then((h) => h.get("Xnode-Auth-User"));

  return (
    <div className="font-sans min-h-screen flex flex-col place-content-between gap-2">
      <Me user={user} />
    </div>
  );
}
