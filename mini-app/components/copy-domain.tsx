"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

export function CopyDomain({ project }: { project: string }) {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(
          `${project}.miniapp-factory.marketplace.openxai.network`
        );
        toast("Copied to clipboard.");
      }}
    >
      Copy Domain
    </Button>
  );
}
