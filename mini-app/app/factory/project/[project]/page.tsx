import { Project } from "@/components/project";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;

  return (
    <div className="font-sans min-h-screen flex flex-col place-content-between gap-2">
      <Project project={project} />
    </div>
  );
}
