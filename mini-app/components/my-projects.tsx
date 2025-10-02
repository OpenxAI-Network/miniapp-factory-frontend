"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
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

export function MyProjects({ user }: { user: string | null }) {
  const { data: userInfo } = useQuery({
    queryKey: [user ?? ""],
    enabled: !!user,
    queryFn: async () => {
      return fetch("/api/factory/user/info")
        .then((res) => res.json())
        .then((data) => data as { id: string; projects: string[] })
        .catch(console.error);
    },
  });

  const [projectName, setProjectName] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex flex-col place-items-center gap-3">
      <Dialog>
        <DialogTrigger>
          <Button className="flex gap-1">
            <Plus />
            <span>Create new project</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>
              Your mini app will be automatically deployed under the domain{" "}
              {"{project name}"}
              .miniapp-factory.marketplace.openxai.network. The project name
              cannot be changed afterward.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            <Label htmlFor="miniapp-project-name">Project Name</Label>
            <Input
              id="miniapp-project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                fetch("/api/factory/project/create", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ project: projectName }),
                })
                  .then(() => router.push(`/factory/${projectName}`))
                  .catch(console.error);
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {userInfo?.projects.map((project) => (
        <Button key={project} asChild>
          <Link href={`/factory/${project}`}>{project}</Link>
        </Button>
      ))}
    </div>
  );
}
