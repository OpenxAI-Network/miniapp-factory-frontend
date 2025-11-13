"use client";

import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useMemo, useRef } from "react";
import { Deployment, Status } from "./project-history";

export function DeploymentLLMOutput({
  deployment,
  status,
}: {
  deployment: Deployment;
  status: Status;
}) {
  const { data: llm_output } = useQuery({
    queryKey: [
      "llm_output",
      deployment.id,
      status === Status.coding || status === Status.imagegen,
    ],
    enabled: status !== Status.queued,
    queryFn: async () => {
      if (status === Status.coding || status === Status.imagegen) {
        return fetch(
          `/api/factory/project/llm_output?deployment=${deployment.id}`
        )
          .then((res) => res.json())
          .then((data) => data as string)
          .catch(console.error);
      } else {
        return fetch(
          `https://raw.githubusercontent.com/miniapp-factory/${deployment.project}/${deployment.coding_git_hash}/.aider.chat.history.md`
        )
          .then((res) => res.text())
          .catch(console.error);
      }
    },
    refetchInterval:
      status === Status.coding || status === Status.imagegen
        ? 1_000
        : undefined, // every 1 second while deployment is being executed
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useMemo(() => {
    return () => {
      const scrollArea = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    };
  }, [scrollAreaRef]);
  useEffect(() => {
    scrollToBottom();
  }, [llm_output, scrollToBottom]);

  return (
    <div className="flex w-full flex-col gap-3 place-items-center">
      <span className="text-lg">AI Live Output</span>
      <div className="w-full" ref={scrollAreaRef}>
        <ScrollArea className="rounded border bg-black h-[500px]">
          <div className="px-3 py-2 font-mono text-muted text-xs flex flex-col">
            {llm_output?.split("\n").map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
