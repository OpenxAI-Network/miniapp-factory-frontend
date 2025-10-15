"use client";

import { useAccount, useSignMessage } from "wagmi";
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

export function AccountAssociation({ project }: { project: string }) {
  const { isInMiniApp, context } = useMiniAppContext();
  const { address } = useAccount();
  const { signMessage } = useSignMessage();

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
          <Button
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
              const encodedHeader = new Buffer(
                JSON.stringify(header),
                "utf-8"
              ).toString("base64url");
              const encodedPayload = new Buffer(
                JSON.stringify(payload),
                "utf-8"
              ).toString("base64url");

              signMessage(
                {
                  message: `${encodedHeader}.${encodedPayload}`,
                },
                {
                  onSuccess(signature) {
                    const encodedSignature = new Buffer(
                      JSON.stringify(signature.replace("0x", "")),
                      "utf-8"
                    ).toString("base64url");

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
            Associate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
