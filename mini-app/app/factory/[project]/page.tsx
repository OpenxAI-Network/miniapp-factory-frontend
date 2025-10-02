import { ChangeProject } from "@/components/change-project";
import { Share } from "@/components/share";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Project({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;

  return (
    <main className="flex flex-col gap-8 place-items-center px-4">
      <div className="flex flex-col gap-3 place-items-center text-center">
        <span className="text-3xl font-bold">{project}</span>
        <Button asChild>
          <Link
            href={`https://${project}.miniapp-factory.marketplace.openxai.network`}
            target="_blank"
          >
            View Mini App
          </Link>
        </Button>
        <Share
          text={`Checkout this app I created using OpenxAI's #MiniAppFactory! https://${project}.miniapp-factory.marketplace.openxai.network \nCreate your own app at https://miniapp-factory.marketplace.openxai.network`}
        />
      </div>
      <ChangeProject project={project} />
    </main>
  );
}
