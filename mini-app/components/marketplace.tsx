"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FactoryIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { ProjectShowcase } from "./project-showcase";
import { ViewMiniApp } from "./view-miniapp";

const featured: string[] = [];

export function Marketplace() {
  const { data: projects } = useQuery({
    queryKey: ["showcase_projects"],
    queryFn: async () => {
      return fetch("/api/showcase/projects/all")
        .then((res) => res.json())
        .then((data) => data as { id: number; name: string }[])
        .then((projects) => projects.sort((p1, p2) => p2.id - p1.id))
        .catch(console.error);
    },
  });

  return (
    <main className="flex flex-col gap-3 place-items-center place-content-between px-4 py-4 grow">
      <div className="flex place-content-between place-items-center w-full max-w-[500px]">
        <Link href="/">
          <div className="p-2 rounded-full bg-blue-600">
            <FactoryIcon className="text-white" />
          </div>
        </Link>
        <Link href="/">
          <div className="p-2 rounded-full bg-gray-400">
            <ArrowLeft />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mt-8 ml-4 w-full max-w-[500px]">
        <span className="text-4xl font-semibold">Marketplace</span>
      </div>
      {featured.length > 0 && (
        <div className="flex flex-col gap-1 mt-4 w-full max-w-[500px]">
          <span className="ml-4 text-lg font-semibold">Featured</span>
          <div className="grid grid-cols-3 gap-3">
            {featured.map((project) => (
              <ViewMiniApp
                key={project}
                miniapp={`https://${project}.miniapp-factory.marketplace.openxai.network/`}
              >
                <ProjectShowcase project={project} />
              </ViewMiniApp>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-4 w-full max-w-[500px] grow">
        <span className="ml-4 text-lg font-semibold">Latest</span>
        <ScrollArea className="w-full grow h-0 px-3">
          <div className="grid grid-cols-3 gap-3">
            {projects?.map((project) => (
              <ViewMiniApp
                key={project.id}
                miniapp={`https://${project.name}.miniapp-factory.marketplace.openxai.network/`}
              >
                <ProjectShowcase project={project.name} />
              </ViewMiniApp>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
