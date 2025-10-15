"use client";

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

export function AccountAssociation({ domain }: { domain: string }) {
  const { isInMiniApp, context } = useMiniAppContext();

  if (!isInMiniApp) return <></>;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Account Association</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account Association</DialogTitle>
          <DialogDescription>
            Associate this mini app with your account. This requires a signature
            from your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button>Associate</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
