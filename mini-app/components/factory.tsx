"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Check, FactoryIcon, LockIcon, User2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const rewards = [
  { deployments: 7000, reward: 7000 },
  { deployments: 6000, reward: 6000 },
  { deployments: 5000, reward: 5000 },
  { deployments: 4000, reward: 4000 },
  { deployments: 3000, reward: 3000 },
  { deployments: 2000, reward: 2000 },
  { deployments: 1000, reward: 1000 },
];
export function Factory({ user }: { user: string | null }) {
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

  const { data: totalProjects } = useQuery({
    queryKey: ["totalProjects"],
    queryFn: async () => {
      return fetch(`/api/showcase/projects/count`)
        .then((res) => res.json())
        .then((data) => data as number)
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
        <Link href="/factory/me">
          <div className="p-2 rounded-full bg-gray-400">
            <User2 />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-4 place-items-center w-full">
        <div className="flex flex-col gap-1 place-items-center text-center">
          <span className="text-5xl font-semibold">
            {totalProjects ? (
              totalProjects.toLocaleString("en-us")
            ) : (
              <Skeleton className="h-8 w-[100px]" />
            )}
          </span>
          <span className="text-2xl">Apps Deployed</span>
        </div>
        <div className="w-full max-w-[500px] rounded-md border border-black">
          <Table>
            <TableHeader>
              <TableHead>No. Deployments</TableHead>
              <TableHead>Reward</TableHead>
            </TableHeader>
            <TableBody>
              {rewards.map((reward, i) => (
                <TableRow
                  key={i}
                  className={cn(
                    "text-muted-foreground",
                    totalProjects !== undefined &&
                      totalProjects > reward.deployments &&
                      "text-black",
                    totalProjects !== undefined &&
                      totalProjects < reward.deployments &&
                      totalProjects + 1000 > reward.deployments &&
                      "bg-blue-700 text-white"
                  )}
                >
                  <TableCell>
                    <div className="flex gap-3 place-items-center">
                      {totalProjects !== undefined &&
                      totalProjects > reward.deployments ? (
                        <div className="rounded-full p-1 bg-green-600">
                          <Check className="size-4 text-white" />
                        </div>
                      ) : (
                        <div className="rounded-full p-1 bg-red-600">
                          <LockIcon className="size-4 text-white" />
                        </div>
                      )}
                      <span>{reward.deployments.toLocaleString("en-us")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span>${reward.reward.toLocaleString("en-us")}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {projects && projects.length > 0 ? (
        <Link href="/factory/me">
          <Button className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7">
            Build My App
          </Button>
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7">
              Build My App
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
      )}
    </main>
  );
}
