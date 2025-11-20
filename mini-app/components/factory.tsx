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
  {
    deploymentsMin: 9001,
    deploymentsMax: 10000,
    reward: "* Up to $6 USDT + 1 OPENX",
  },
  {
    deploymentsMin: 8001,
    deploymentsMax: 9000,
    reward: "* Up to $7 USDT + 2 OPENX",
  },
  {
    deploymentsMin: 7001,
    deploymentsMax: 8000,
    reward: "* Up to $8 USDT + 2 OPENX",
  },
  {
    deploymentsMin: 6001,
    deploymentsMax: 7000,
    reward: "* Up to $9 USDT + 2 OPENX",
  },
  {
    deploymentsMin: 5001,
    deploymentsMax: 6000,
    reward: "* Up to $10 USDT + 2 OPENX",
  },
  {
    deploymentsMin: 4001,
    deploymentsMax: 5000,
    reward: "* Up to $11 USDT + 3 OPENX",
  },
  {
    deploymentsMin: 3001,
    deploymentsMax: 4000,
    reward: "* Up to $12 USDT + 3 OPENX",
  },
  {
    deploymentsMin: 2001,
    deploymentsMax: 3000,
    reward: "* Up to $13 USDT + 3 OPENX",
  },
  {
    deploymentsMin: 1001,
    deploymentsMax: 2000,
    reward: "* Up to $14 USDT + 5 OPENX ",
  },
  { deploymentsMin: 1, deploymentsMax: 1000, reward: "Genesis NFT + 5 OPENX" },
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
              <TableHead>App No.</TableHead>
              <TableHead>Reward</TableHead>
            </TableHeader>
            <TableBody>
              {rewards.map((reward, i) => (
                <TableRow
                  key={i}
                  className={cn(
                    "text-muted-foreground",
                    totalProjects !== undefined &&
                      totalProjects > reward.deploymentsMax &&
                      "text-black",
                    totalProjects !== undefined &&
                      totalProjects < reward.deploymentsMax &&
                      totalProjects > reward.deploymentsMin &&
                      "bg-blue-700 text-white"
                  )}
                >
                  <TableCell>
                    <div className="flex gap-3 place-items-center">
                      {totalProjects !== undefined &&
                      totalProjects > reward.deploymentsMin ? (
                        <div className="rounded-full p-1 bg-green-600">
                          <Check className="size-4 text-white" />
                        </div>
                      ) : (
                        <div className="rounded-full p-1 bg-red-600">
                          <LockIcon className="size-4 text-white" />
                        </div>
                      )}
                      <span>
                        {reward.deploymentsMin}-{reward.deploymentsMax}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span>{reward.reward}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <span className="max-w-[500px] text-center text-muted-foreground text-sm">
          * Depending on the level at the end of the campaign, maximum rewards
          are paid out if 10000 mini apps are deployed
        </span>
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
