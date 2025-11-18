"use client";

import Link from "next/link";
import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";
import { ReactNode } from "react";

export function ViewMiniApp({
  miniapp,
  children,
}: {
  miniapp: string;
  children: ReactNode;
}) {
  const { sdk, isInMiniApp } = useMiniAppContext();

  if (!isInMiniApp) {
    return (
      <Button variant="ghost" asChild>
        <Link href={miniapp} target="_blank">
          {children}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        sdk.actions.openMiniApp({ url: miniapp });
      }}
      variant="ghost"
    >
      {children}
    </Button>
  );
}
