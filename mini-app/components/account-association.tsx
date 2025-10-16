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
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function AccountAssociation({ project }: { project: string }) {
  const { isInMiniApp } = useMiniAppContext();

  const [open, setOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

  if (!isInMiniApp) return <></>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Farcaster</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Farcaster</DialogTitle>
          <DialogDescription>
            Link this mini app with your Farcaster account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="farcaster-header">Header</Label>
            <Input
              id="farcaster-header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="farcaster-payload">Payload</Label>
            <Input
              id="farcaster-payload"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="farcaster-signature">Signature</Label>
            <Input
              id="farcaster-signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              fetch("/api/factory/project/account_association", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  project,
                  account_association: {
                    header,
                    payload,
                    signature,
                  },
                }),
              })
                .then(() => setOpen(false))
                .catch(console.error);
            }}
            disabled={!header || !payload || !signature}
          >
            Link
          </Button>
          {/* <Button
            onClick={() => {
              if (!context?.user || !address) {
                return;
              }

              const header = {
                fid: context.user.fid,
                type: "auth",
                key: address,
              };
              const payload = {
                domain: `${project}.miniapp-factory.marketplace.openxai.network`,
              };
              cons = new Buffer(JSON.stringify(header), "utf-8")
                .toString")
                .replace(/\+ "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
              const encodedPayload = new Buffer(
                JSON.stringify(payload),
                "utf-8"
              )
                .toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");

              signMessage(
                {
                  message: `${encodedHeader}.${encodedPayload}`,
                },
                {
                  onSuccess(signature) {
                    const encodedSignature = new Buffer(
                      JSON.stringify(signature.replace("0x", "")),
                      "utf-8"
                    )
                      .toString("base64")
                      .replace(/\+/g, "-")
                      .replace(/\//g, "_")
                      .replace(/=+$/, "");

                    fetch("/api/factory/project/account_association", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        project,
                        account_association: {
                          header: encodedHeader,
                          payload: encodedPayload,
                          signature: encodedSignature,
                        },
                      }),
                    }).catch(console.error);
                  },
                }
              );
            }}
          >
            Link
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
