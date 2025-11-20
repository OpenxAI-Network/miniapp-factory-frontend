"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Check, FactoryIcon, LockIcon, User2 } from "lucide-react";
import { useState } from "react";
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
import { CreateProject } from "./create-project";

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

  const [createProject, setCreateProject] = useState<boolean>(false);

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
            {totalProjects !== undefined ? (
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
        <Button
          className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7"
          onClick={() => setCreateProject(true)}
        >
          Build My App
        </Button>
      )}

      {createProject && (
        <CreateProject user={user} close={() => setCreateProject(false)} />
      )}
    </main>
  );
}
