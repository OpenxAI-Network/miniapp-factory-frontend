import { AccountAssociation } from "@/components/account-association";
import { BaseBuild } from "@/components/base-build";
import { ChangeProject } from "@/components/change-project";
import { ProjectHistory } from "@/components/project-history";
import { ProjectLLMOutput } from "@/components/project-llm-output";
import { Share } from "@/components/share";
import { Button } from "@/components/ui/button";
import { ViewMiniApp } from "@/components/view-miniapp";
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
        <div className="grid grid-cols-2 gap-2">
          <div>
            <ViewMiniApp
              miniapp={`https://${project}.miniapp-factory.marketplace.openxai.network`}
            />
          </div>
          <div>
            <Button asChild>
              <Link
                href={`https://github.com/miniapp-factory/${project}`}
                target="_blank"
              >
                View On GitHub
              </Link>
            </Button>
          </div>
          <AccountAssociation
            domain={`${project}.miniapp-factory.marketplace.openxai.network`}
          />
          <BaseBuild />
        </div>
        <Share
          text={`Checkout this app I created using OpenxAI's #MiniAppFactory! https://${project}.miniapp-factory.marketplace.openxai.network \nCreate your own app at https://miniapp-factory.marketplace.openxai.network`}
        />
      </div>
      <ChangeProject project={project} />
      <ProjectHistory project={project} />
      <ProjectLLMOutput project={project} />
    </main>
  );
}
