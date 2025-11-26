"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FactoryIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { ViewMiniApp } from "./view-miniapp";

const featured: string[] = ["bonfire", "crypto-hangman", "mangala"];

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
    refetchInterval: 10_000, // 10 seconds
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
              <ProjectShowcase key={project} project={project} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-4 w-full max-w-[500px] grow">
        <span className="ml-4 text-lg font-semibold">Latest</span>
        <ScrollArea className="w-full grow h-0 px-3">
          <div className="grid grid-cols-3 gap-3">
            {projects?.map((project) => (
              <ProjectShowcase key={project.name} project={project.name} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
function ProjectShowcase({ project }: { project: string }) {
  const { data: metadata } = useQuery({
    queryKey: ["metadata", project],
    queryFn: async () => {
      return await fetch(`/metadata/${project}`)
        .then((res) => res.json())
        .then(
          (data) => data as { name: string; description: string; image: string }
        )
        .catch(console.error);
    },
  });

  if (!metadata || metadata.name === "Mini App Factory App") {
    return <></>;
  }

  return (
    <ViewMiniApp
      miniapp={`https://${project}.miniapp-factory.marketplace.openxai.network/`}
    >
      <div className="grid place-items-center place-content-center size-full rounded-2xl aspect-square">
        <img
          src={metadata.image}
          alt="project image"
          className="col-start-1 row-start-1 -z-10 size-full rounded-2xl"
        />
        <div className="col-start-1 row-start-1 size-full flex place-items-end place-content-center p-3">
          <div className="bg-white/80 rounded-lg px-1 py-0.5 place-items-center text-center">
            <span className="max-md:text-xs font-semibold">
              {metadata.name.substring(0, 25)}
              {metadata.name.length > 25 ? "..." : ""}
            </span>
          </div>
        </div>
      </div>
    </ViewMiniApp>
  );
}
