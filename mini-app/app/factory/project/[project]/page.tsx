import { Project } from "@/components/project";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;

  return <Project project={project} />;
}
