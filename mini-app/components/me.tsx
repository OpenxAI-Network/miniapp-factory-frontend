"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { ArrowLeft, FactoryIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { ProjectShowcase } from "./project-showcase";
import { CreateProject } from "./create-project";
import { Logout } from "./logout";

export function Me({ user }: { user: string | null }) {
  const { data: projects } = useQuery({
    queryKey: ["user_projects", user ?? ""],
    enabled: !!user,
    queryFn: async () => {
      return fetch("/api/factory/user/projects")
        .then((res) => res.json())
        .then((data) => data as string[])
        .catch(console.error);
    },
  });

  const [createProject, setCreateProject] = useState<boolean>(false);

  return (
    <main className="flex flex-col gap-3 place-items-center place-content-between px-4 py-4 grow">
      <div className="flex place-content-between place-items-center w-full max-w-[500px]">
        <Link href="/">
          <div className="p-2 rounded-full bg-blue-600">
            <FactoryIcon className="text-white" />
          </div>
        </Link>
        <Link href="/factory">
          <div className="p-2 rounded-full bg-gray-400">
            <ArrowLeft />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mt-8 ml-4 w-full max-w-[500px]">
        <span className="text-5xl font-semibold">Hi, User</span>
        <div className="flex place-items-center gap-2">
          <appkit-button />
          <Logout />
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4 w-full max-w-[500px] grow">
        <span className="ml-8 text-lg font-semibold">Your Mini Apps</span>
        <ScrollArea className="w-full grow h-0 px-3">
          <div className="grid grid-cols-3 gap-3">
            {projects?.map((project) => (
              <Link key={project} href={`/factory/project/${project}`}>
                <ProjectShowcase project={project} />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <Button
        className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7"
        onClick={() => setCreateProject(true)}
      >
        Create New App
      </Button>
      {createProject && (
        <CreateProject user={user} close={() => setCreateProject(false)} />
      )}
    </main>
  );
}
