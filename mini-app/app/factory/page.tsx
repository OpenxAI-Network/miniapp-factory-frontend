import { Factory } from "@/components/factory";
import { headers } from "next/headers";

export default async function FactoryPage() {
  const user = await headers().then((h) => h.get("Xnode-Auth-User"));

  return <Factory user={user} />;
}
