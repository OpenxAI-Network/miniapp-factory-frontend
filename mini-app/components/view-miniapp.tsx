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
      <Button
        className="flex whitespace-normal"
        variant="ghost"
        size="ghost"
        asChild
      >
        <Link href={miniapp} target="_blank">
          {children}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="flex whitespace-normal"
      variant="ghost"
      size="ghost"
      onClick={() => {
        sdk.actions.openMiniApp({ url: miniapp });
      }}
    >
      {children}
    </Button>
  );
}
