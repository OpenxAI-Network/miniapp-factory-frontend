"use client";

import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useMemo, useRef } from "react";

export function ProjectLLMOutput({ project }: { project: string }) {
  const { data: llm_output } = useQuery({
    queryKey: ["llm_output", project ?? ""],
    enabled: !!project,
    queryFn: async () => {
      return fetch(`/api/factory/project/llm_output?project=${project}`)
        .then((res) => res.json())
        .then((data) => data as string)
        .catch(console.error);
    },
    refetchInterval: 1_000, // 1 second
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
      <span className="text-xl">AI Live Output</span>
      <div className="w-full" ref={scrollAreaRef}>
        <ScrollArea className="rounded border bg-black h-[500px]">
          <div className="px-3 py-2 font-mono text-muted flex flex-col">
            {llm_output?.split("\n").map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
