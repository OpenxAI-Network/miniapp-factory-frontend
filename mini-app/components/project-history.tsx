"use client";

import { useQuery } from "@tanstack/react-query";
import { useRequestRequestInfo } from "@openmesh-network/xnode-manager-sdk-react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";
import { DeploymentLLMOutput } from "./deployment-llm-output";

export interface Deployment {
  id: number;
  project: string;
  instructions: string;
  submitted_at: number;
  coding_started_at: number | null;
  coding_finished_at: number | null;
  imagegen_started_at: number | null;
  imagegen_finished_at: number | null;
  git_hash: string | null;
  deployment_request: number | null;
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
    refetchInterval: 1_000, // 1 second
  });

  return (
    <div className="flex w-full flex-col gap-3 place-items-center">
      <span className="text-xl">History</span>
      <Accordion className="w-full px-1" type="single" collapsible>
        {history
          ?.sort((d1, d2) => d2.submitted_at - d1.submitted_at)
          .map((deployment) => (
            <HistoryItem key={deployment.id} deployment={deployment} />
          ))}
      </Accordion>
    </div>
  );
}

export enum Status {
  unknown = "...",
  deployed = "Deployed",
  error = "Error",
  deploying = "Deploying",
  imagegen = "Generating",
  coding = "Programming",
  queued = "Queued",
}
function HistoryItem({ deployment }: { deployment: Deployment }) {
  const { data: deploymentRequest } = useRequestRequestInfo({
    session: {
      axiosInstance: axios.create({
        withCredentials: true,
      }),
      baseUrl: "https://miniapp-host.xnode-manager.openxai.org",
    },
    request_id: deployment.deployment_request ?? undefined,
  });

  const status =
    deployment.imagegen_finished_at !== null
      ? deploymentRequest === undefined
        ? Status.unknown
        : deploymentRequest.result === null
        ? Status.deploying
        : "Success" in deploymentRequest.result
        ? Status.deployed
        : "Error" in deploymentRequest.result
        ? Status.error
        : Status.unknown
      : deployment.coding_finished_at !== null
      ? Status.imagegen
      : deployment.coding_started_at !== null
      ? Status.coding
      : Status.queued;

  return (
    <AccordionItem value={deployment.id.toString()}>
      <AccordionTrigger>
        <div className="flex w-full place-content-between place-items-center">
          <span>
            {new Date(deployment.submitted_at * 1000).toLocaleString()}
          </span>
          {status !== Status.unknown && (
            <div
              className={cn(
                "flex place-items-center gap-1 rounded-full px-2 py-1",
                status === Status.deployed && "bg-green-600",
                status === Status.error && "bg-red-600",
                status === Status.deploying && "bg-amber-500",
                status === Status.imagegen && "bg-amber-500",
                status === Status.coding && "bg-amber-500",
                status === Status.queued && "bg-primary text-primary-foreground"
              )}
            >
              {(status === Status.coding ||
                status === Status.imagegen ||
                status === Status.deploying) && <Spinner />}
              <span>{status}</span>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-3">
          <span>{deployment.instructions}</span>
          <DeploymentLLMOutput deployment={deployment} status={status} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
