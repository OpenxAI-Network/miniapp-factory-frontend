"use client";

import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useMemo, useRef } from "react";
import { Deployment, Status } from "./project-history";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function DeploymentLLMOutput({
  deployment,
  status,
  session,
  request,
}: {
  deployment: Deployment;
  status: Status;
  session: xnode.utils.Session;
  request?: { id: xnode.request.RequestId; info: xnode.request.RequestInfo };
}) {
  const { data: llm_output } = useQuery({
    queryKey: ["llm_output", deployment.id, request !== undefined],
    enabled: status !== Status.queued,
    queryFn: async () => {
      if (request !== undefined) {
        return xnode.request
          .command_info({
            session: session,
            path: {
              request_id: request.id,
              command: request.info.commands.toSorted(
                (a, b) => Number(b) - Number(a)
              )[0],
            },
          })
          .then((info) => {
            if ("UTF8" in info.stderr) {
              return info.stderr.UTF8.output;
            } else {
              return "";
            }
          })
          .catch(console.error);
      } else {
        return fetch(
          `/api/factory/project/llm_output?deployment=${deployment.id}`
        )
          .then((res) => res.json())
          .then((data) => data as string)
          .catch(console.error);
      }
    },
    refetchInterval: request?.info.result ? undefined : 1_000, // every 1 second while deployment is being executed
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
