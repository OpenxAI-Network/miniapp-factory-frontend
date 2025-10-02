"use client";

import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";

export const dynamic = "force-dynamic";

export function Share({ text }: { text: string }) {
  const { sdk } = useMiniAppContext();

  return (
    <Button
      onClick={() => {
        sdk.actions.composeCast({
          text,
        });
      }}
    >
      <span>Share</span>
    </Button>
  );
}
