import { Factory } from "@/components/factory";
import { headers } from "next/headers";

export default async function FactoryPage() {
  const user = await headers().then((h) => h.get("Xnode-Auth-User"));

  return (
    <div className="font-sans min-h-screen flex flex-col place-content-between gap-2">
      <Factory user={user} />
    </div>
  );
}
