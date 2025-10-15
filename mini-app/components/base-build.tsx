"use client";

import { useAccount } from "wagmi";
import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";
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

export function BaseBuild({ project }: { project: string }) {
  const { isInMiniApp } = useMiniAppContext();
  const { address } = useAccount();

  if (!isInMiniApp) return <></>;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Base Build</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Base Build</DialogTitle>
          <DialogDescription>
            Link this mini app with your Base Build account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (!address) {
                return;
              }

              fetch("/api/factory/project/base_build", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  project,
                  base_build: {
                    allowed_addresses: [address],
                  },
                }),
              }).catch(console.error);
            }}
          >
            Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
