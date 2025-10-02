import { MyProjects } from "@/components/my-projects";
import { headers } from "next/headers";

export default async function Factory() {
  const user = await headers().then((h) => h.get("Xnode-Auth-User"));

  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <div className="flex flex-col gap-3 place-items-center text-center">
        <span>Welcome to the factory!</span>
        <span>Choose your project to work on:</span>
      </div>
      <MyProjects user={user} />
    </main>
  );
}
