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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

export function AccountAssociation({ project }: { project: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [json, setJson] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="h-auto px-10 py-4 rounded-4xl text-lg"
          variant="outline"
        >
          Farcaster
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Farcaster</DialogTitle>
          <DialogDescription>
            Link this mini app with your Farcaster account.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="manual">
          <TabsList className="bg-white border rounded-2xl">
            <TabsTrigger
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white py-2 px-3 data-[state=active]:rounded-2xl"
              value="manual"
            >
              Manual
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white py-2 px-3 data-[state=active]:rounded-2xl"
              value="json"
            >
              JSON
            </TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="farcaster-header" className="ml-3">
                  Header
                </Label>
                <Input
                  id="farcaster-header"
                  className="rounded-2xl"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="farcaster-payload" className="ml-3">
                  Payload
                </Label>
                <Input
                  id="farcaster-payload"
                  className="rounded-2xl"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="farcaster-signature" className="ml-3">
                  Signature
                </Label>
                <Input
                  id="farcaster-signature"
                  className="rounded-2xl"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
              </div>
              {/* {context && context.client.clientFid !== 309857 && (
                <Button
                  onClick={() => {
                    try {
                      sdk.experimental
                        .signManifest({
                          domain: `${project}.miniapp-factory.marketplace.openxai.network`,
                        })
                        .then((account_association) => {
                          setHeader(account_association.header);
                          setPayload(account_association.payload);
                          setSignature(account_association.signature);
                        });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Sign
                </Button>
              )} */}
            </div>
          </TabsContent>
          <TabsContent value="json">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="farcaster-json" className="ml-3">
                  JSON
                </Label>
                <Textarea
                  className="max-w-full rounded-2xl"
                  id="farcaster-json"
                  value={json}
                  onChange={(e) => setJson(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="rounded-3xl h-auto py-3 px-6"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="rounded-3xl h-auto py-3 px-6 bg-blue-700"
            onClick={() => {
              const account_association = json
                ? JSON.parse(json).accountAssociation
                : {
                    header,
                    payload,
                    signature,
                  };
              fetch("/api/factory/project/account_association", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  project,
                  account_association,
                }),
              })
                .then(() => setOpen(false))
                .catch(console.error);
            }}
            disabled={(!header || !payload || !signature) && !json}
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
