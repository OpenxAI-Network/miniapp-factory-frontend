import { useQuery } from "@tanstack/react-query";
import { CreditsPayment } from "./credits-payment";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateProject({
  user,
  close,
}: {
  user: string | null;
  close: () => void;
}) {
  const { data: credits, refetch: refetchCredits } = useQuery({
    queryKey: ["user_credits", user ?? ""],
    enabled: !!user,
    queryFn: async () => {
      return fetch("/api/factory/user/credits")
        .then((res) => res.json())
        .then((data) => data as number)
        .catch(console.error);
    },
  });

  const { data: price } = useQuery({
    queryKey: ["project_price", user ?? ""],
    enabled: !!user,
    queryFn: async () => {
      return fetch("/api/factory/project/price")
        .then((res) => res.json())
        .then((data) => data as number)
        .catch(console.error);
    },
    refetchInterval: 5_000, // 5 seconds
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

  if (credits === undefined || price === undefined) {
    return <></>;
  }

  if (credits < price) {
    return (
      <CreditsPayment
        user={user}
        item="Mini App Creation"
        price={price}
        close={(success) => {
          if (success) {
            refetchCredits();
          } else {
            close();
          }
        }}
      />
    );
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
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
            <Button className="rounded-3xl h-auto py-3 px-6" variant="outline">
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
            {price === 0
              ? "Create"
              : `Use ${price / 1_000_000}/${credits / 1_000_000} Credits`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
