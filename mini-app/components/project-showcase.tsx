"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

export function ProjectShowcase({ project }: { project: string }) {
  const { data: metadata } = useQuery({
    queryKey: ["metadata", project],
    queryFn: async () => {
      return await fetch(`/metadata/${project}`)
        .then((res) => res.json())
        .then(
          (data) => data as { name: string; description: string; image: string }
        )
        .catch(console.error);
    },
  });

  return (
    <div className="grid place-items-center place-content-center grow rounded-2xl">
      {!metadata?.image ? (
        <Skeleton className="col-start-1 row-start-1 -z-10 size-full rounded-2xl aspect-square" />
      ) : (
        <img
          src={metadata.image}
          alt="project image"
          className="col-start-1 row-start-1 -z-10 size-full rounded-2xl"
        />
      )}
      <div className="col-start-1 row-start-1 size-full flex place-items-end place-content-center p-3">
        {!metadata?.name ? (
          <div className="bg-white/80 rounded-lg px-1 py-0.5 place-items-center">
            <Skeleton className="h-4 w-[120px]" />
          </div>
        ) : (
          <div className="bg-white/80 rounded-lg px-1 py-0.5 place-items-center text-center">
            <span className="max-md:text-xs font-semibold">
              {metadata.name.substring(0, 25)}
              {metadata.name.length > 25 ? "..." : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
