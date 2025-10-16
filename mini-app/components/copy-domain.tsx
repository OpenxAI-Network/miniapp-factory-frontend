"use client";

import { Button } from "./ui/button";

export function CopyDomain({ project }: { project: string }) {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(
          `${project}.miniapp-factory.marketplace.openxai.network`
        );
      }}
    >
      Copy Domain
    </Button>
  );
}
