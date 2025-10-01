"use client";

import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";

export const dynamic = "force-dynamic";

export function Share({ text, embeds }: { text: string; embeds?: [string] }) {
  const { sdk } = useMiniAppContext();
  const appUrl = process.env.NEXT_PUBLIC_URL;

  return (
    <Button
      onClick={() => {
        sdk.actions.composeCast({
          text,
          embeds: embeds ?? (appUrl ? [appUrl] : []),
        });
      }}
    >
      <span>Share</span>
    </Button>
  );
}
