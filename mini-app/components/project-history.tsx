"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Deployment {
  id: number;
  project: string;
  instructions: string;
  submitted_at: number;
  started_at?: number;
  finished_at?: number;
  deployment_request?: number;
}

export function ProjectHistory({ project }: { project: string }) {
  const { data: history } = useQuery({
    queryKey: ["history", project ?? ""],
    enabled: !!project,
    queryFn: async () => {
      return fetch(`/api/factory/project/history?project=${project}`)
        .then((res) => res.json())
        .then((data) => data as Deployment[])
        .catch(console.error);
    },
    refetchInterval: 5_000, // 5 seconds
  });

  return (
    <div className="flex flex-col gap-3 place-items-center">
      <span className="text-xl">History</span>
      {history
        ?.sort((d1, d2) => d1.submitted_at - d2.submitted_at)
        .map((deployment) => (
          <HistoryItem key={deployment.id} deployment={deployment} />
        ))}
    </div>
  );
}

function HistoryItem({ deployment }: { deployment: Deployment }) {
  const status = deployment.deployment_request
    ? "done"
    : deployment.finished_at
    ? "deploying"
    : deployment.started_at
    ? "coding"
    : "queued";

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {new Date(deployment.submitted_at * 1000).toLocaleString()}
        </CardTitle>
        <CardDescription>{deployment.instructions}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex place-content-between place-items-center">
          <span>Status:</span>
          <span>{status}</span>
        </div>
      </CardContent>
    </Card>
  );
}
