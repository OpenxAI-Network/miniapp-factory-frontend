"use client";

import Link from "next/link";
import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";

export function ViewMiniApp({ miniapp }: { miniapp: string }) {
  const { sdk, isInMiniApp } = useMiniAppContext();

  if (!isInMiniApp) {
    return (
      <Button asChild>
        <Link href={miniapp} target="_blank">
          View Mini App
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        sdk.actions.openMiniApp({ url: miniapp });
      }}
    >
      View Mini App
    </Button>
  );
}
