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
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function BaseBuild({ project }: { project: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [allowedAddresses, setAllowedAddresses] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="basebuild-allowedaddress">Allowed Addresses</Label>
            <Input
              id="basebuild-allowedaddress"
              value={allowedAddresses}
              onChange={(e) => setAllowedAddresses(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              fetch("/api/factory/project/base_build", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  project,
                  base_build: {
                    allowed_addresses: [allowedAddresses],
                  },
                }),
              })
                .then(() => setOpen(false))
                .catch(console.error);
            }}
            disabled={!allowedAddresses}
          >
            Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
