"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { ArrowLeft, FactoryIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { ProjectShowcase } from "./project-showcase";

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

  const [projectName, setProjectName] = useState<string>("");
  const [creatingProject, setCreatingProject] = useState<boolean>(false);
  const router = useRouter();

  const { data: projectAvailable } = useQuery({
    queryKey: ["projectAvailable", projectName ?? ""],
    enabled: !!projectName,
    queryFn: async () => {
      return fetch(`/api/factory/project/available?project=${projectName}`)
        .then((res) => res.json())
        .then((data) => data as boolean)
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
        </Link>{" "}
        <Link href="/factory">
          <div className="p-2 rounded-full bg-gray-400">
            <ArrowLeft />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mt-8 ml-4 w-full max-w-[500px]">
        <span className="text-5xl font-semibold">Hi, User</span>
        <span className="text-sm break-all">{user}</span>
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
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7">
            Create New App
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Create new mini app</DialogTitle>
            <DialogDescription>
              Your mini app can be accessed through https://
              {"{name}"}
              .miniapp-factory.marketplace.openxai.network. The name cannot be
              changed afterward.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            <Label htmlFor="miniapp-project-name" className="ml-3">
              Mini App Name
            </Label>
            <Input
              id="miniapp-project-name"
              className="rounded-2xl"
              aria-invalid={
                !new RegExp(/^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/).test(
                  projectName
                ) || projectAvailable === false
              }
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value.toLowerCase().replace(" ", "-"))
              }
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="rounded-3xl h-auto py-3 px-6"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="rounded-3xl h-auto py-3 px-6 bg-blue-700"
              onClick={() => {
                setCreatingProject(true);
                fetch("/api/factory/project/create", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ project: projectName }),
                })
                  .then((res) => {
                    if (res.ok) {
                      router.push(`/factory/project/${projectName}`);
                    }
                  })
                  .catch(console.error)
                  .finally(() => setCreatingProject(false));
              }}
              disabled={
                creatingProject ||
                !new RegExp(/^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/).test(
                  projectName
                ) ||
                projectAvailable === false
              }
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
