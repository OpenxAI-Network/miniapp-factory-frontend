"use client";

import { Button } from "./ui/button";
import {
  ArrowLeft,
  Brush,
  Code2,
  Coins,
  ExternalLink,
  FactoryIcon,
  Hourglass,
  Joystick,
  Pencil,
  Rocket,
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRequestRequestInfo } from "@openmesh-network/xnode-manager-sdk-react";
import axios from "axios";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DeploymentLLMOutput } from "./deployment-llm-output";
import { ViewMiniApp } from "./view-miniapp";
import { AccountAssociation } from "./account-association";
import { BaseBuild } from "./base-build";
import { CopyDomain } from "./copy-domain";
import { Share } from "./share";

export interface Deployment {
  id: number;
  project: string;
  instructions: string;
  submitted_at: number;
  coding_started_at: number | null;
  coding_finished_at: number | null;
  coding_git_hash: string | null;
  imagegen_started_at: number | null;
  imagegen_finished_at: number | null;
  imagegen_git_hash: string | null;
  deployment_request: number | null;
}

export enum Status {
  unknown = "",
  deployed = "Deployed",
  error = "Error",
  deploying = "Deploying App",
  imagegen = "Generating Images",
  coding = "Writing Code",
  queued = "Queued",
}

export function Project({ project }: { project: string }) {
  const [instructions, setInstructions] = useState<string>("");

  const { data: history, refetch: refetchHistory } = useQuery({
    queryKey: ["history", project ?? ""],
    queryFn: async () => {
      return fetch(`/api/factory/project/history?project=${project}`)
        .then((res) => res.json())
        .then((data) => data as Deployment[])
        .catch(console.error);
    },
    refetchInterval: 1_000, // 1 second
  });
  const lastDeployment = history?.at(-1);

  const session = useMemo(() => {
    return {
      axiosInstance: axios.create({
        withCredentials: true,
      }),
      baseUrl: "https://miniapp-host.xnode-manager.openxai.org",
    };
  }, []);

  const { data: deploymentRequest } = useRequestRequestInfo({
    session,
    request_id: lastDeployment?.deployment_request ?? undefined,
  });

  const status = !lastDeployment
    ? undefined
    : lastDeployment.imagegen_finished_at !== null
    ? deploymentRequest === undefined
      ? Status.unknown
      : deploymentRequest.result === null
      ? Status.deploying
      : "Success" in deploymentRequest.result
      ? Status.deployed
      : "Error" in deploymentRequest.result
      ? Status.error
      : Status.unknown
    : lastDeployment.coding_finished_at !== null
    ? Status.imagegen
    : lastDeployment.coding_started_at !== null
    ? Status.coding
    : Status.queued;

  const [carousel, setCarousel] = useState<CarouselApi>();
  useEffect(() => {
    if (!carousel) {
      return;
    }

    if (status === Status.queued) {
      carousel.scrollTo(0);
    }
    if (status === Status.coding) {
      carousel.scrollTo(1);
    }
    if (status === Status.imagegen) {
      carousel.scrollTo(2);
    }
    if (status === Status.deploying) {
      carousel.scrollTo(3);
    }
  }, [carousel, status]);

  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (!lastDeployment) {
      return;
    }

    const average = 10 * 60;
    const interval = setInterval(() => {
      if (lastDeployment.coding_started_at === null) {
        setProgress(0);
      } else {
        setProgress(
          Math.min(
            ((Date.now() / 1000 - lastDeployment.coding_started_at) / average) *
              100,
            100
          )
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastDeployment]);

  return (
    <main className="flex flex-col gap-3 place-items-center place-content-between px-4 py-4 grow">
      <div className="flex place-content-between place-items-center w-full max-w-[500px]">
        <div className="p-2 rounded-full bg-blue-600">
          <FactoryIcon className="text-white" />
        </div>
        <Link href="/factory">
          <div className="p-2 rounded-full bg-gray-400">
            <ArrowLeft />
          </div>
        </Link>
      </div>
      <span className="text-5xl font-semibold">Build Your App!</span>
      {status === Status.queued ||
      status === Status.coding ||
      status === Status.imagegen ||
      status === Status.deploying ||
      status === Status.unknown ? (
        <>
          <div className="flex flex-col place-items-center gap-10">
            <Carousel className="pointer-events-none" setApi={setCarousel}>
              <CarouselContent>
                <CarouselItem className="basis-1/3" />
                <CarouselItem className="basis-1/3">
                  <div className="grid place-content-center">
                    {status === Status.queued && (
                      <div className="col-start-1 row-start-1 -z-10 flex place-items-center place-content-center size-30 rounded-full animate-[spin_2s_linear_infinite] bg-gradient-to-tr from-[#CAFA54] to-[#0016FF]" />
                    )}
                    <div className="col-start-1 row-start-1 flex place-items-center place-content-center">
                      <div
                        className={cn(
                          "flex place-items-center place-content-center size-20 rounded-full bg-gray-300",
                          status === Status.queued && "bg-white size-28"
                        )}
                      >
                        <Hourglass
                          className={cn(
                            "text-gray-500 size-10",
                            status === Status.queued && "text-[#0016FF] size-16"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="grid place-content-center">
                    {status === Status.coding && (
                      <div className="col-start-1 row-start-1 -z-10 flex place-items-center place-content-center size-30 rounded-full animate-[spin_2s_linear_infinite] bg-gradient-to-tr from-[#CAFA54] to-[#0016FF]" />
                    )}
                    <div className="col-start-1 row-start-1 flex place-items-center place-content-center">
                      <div
                        className={cn(
                          "flex place-items-center place-content-center size-20 rounded-full bg-gray-300",
                          status === Status.coding && "bg-white size-28"
                        )}
                      >
                        <Code2
                          className={cn(
                            "text-gray-500 size-10",
                            status === Status.coding && "text-[#0016FF] size-16"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="grid place-content-center">
                    {status === Status.imagegen && (
                      <div className="col-start-1 row-start-1 -z-10 flex place-items-center place-content-center size-30 rounded-full animate-[spin_2s_linear_infinite] bg-gradient-to-tr from-[#CAFA54] to-[#0016FF]" />
                    )}
                    <div className="col-start-1 row-start-1 flex place-items-center place-content-center">
                      <div
                        className={cn(
                          "flex place-items-center place-content-center size-20 rounded-full bg-gray-300",
                          status === Status.imagegen && "bg-white size-28"
                        )}
                      >
                        <Brush
                          className={cn(
                            "text-gray-500 size-10",
                            status === Status.imagegen &&
                              "text-[#0016FF] size-16"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="grid place-content-center">
                    {status === Status.deploying && (
                      <div className="col-start-1 row-start-1 -z-10 flex place-items-center place-content-center size-30 rounded-full animate-[spin_2s_linear_infinite] bg-gradient-to-tr from-[#CAFA54] to-[#0016FF]" />
                    )}
                    <div className="col-start-1 row-start-1 flex place-items-center place-content-center">
                      <div
                        className={cn(
                          "flex place-items-center place-content-center size-20 rounded-full bg-gray-300",
                          status === Status.deploying && "bg-white size-28"
                        )}
                      >
                        <Rocket
                          className={cn(
                            "text-gray-500 size-10",
                            status === Status.deploying &&
                              "text-[#0016FF] size-16"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3" />
              </CarouselContent>
            </Carousel>
            <span className="text-xl font-semibold">{status}...</span>
          </div>
          <div className="flex flex-col place-items-center gap-3 w-full max-w-[500px]">
            <Progress
              className="[&>*]:bg-linear-to-r [&>*]:from-[#CAFA54] [&>*]:to-[#0016FF]"
              value={progress}
            />
            <span className="text-xl">{progress.toFixed(0)}%</span>
          </div>
          <div className="flex flex-col gap-1  w-full max-w-[500px]">
            <div className="flex place-items-center place-content-between">
              <div className="flex place-items-center gap-2">
                <div className="size-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-2xl font-semibold">Live AI Output</span>
              </div>
              <Link
                href={`https://github.com/miniapp-factory/${project}`}
                target="_blank"
                className="flex place-items-center gap-1 text-blue-600"
              >
                <span>GitHub</span>
                <ExternalLink />
              </Link>
            </div>
            <DeploymentLLMOutput
              deployment={lastDeployment}
              status={status}
              session={session}
              request={
                lastDeployment !== undefined &&
                lastDeployment.deployment_request !== null &&
                deploymentRequest !== undefined
                  ? {
                      id: lastDeployment.deployment_request,
                      info: deploymentRequest,
                    }
                  : undefined
              }
            />
          </div>
        </>
      ) : (
        <>
          {lastDeployment !== undefined && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ViewMiniApp
                  miniapp={`https://${project}.miniapp-factory.marketplace.openxai.network`}
                />
              </div>
              <div>
                <Button asChild>
                  <Link
                    href={`https://github.com/miniapp-factory/${project}`}
                    target="_blank"
                  >
                    View On GitHub
                  </Link>
                </Button>
              </div>
              <AccountAssociation project={project} />
              <BaseBuild project={project} />
              <div>
                <CopyDomain project={project} />
              </div>
              <div>
                <Share
                  text={`Checkout this app I created using OpenxAI's #MiniAppFactory! https://${project}.miniapp-factory.marketplace.openxai.network \nCreate your own app at https://miniapp-factory.marketplace.openxai.network`}
                />
              </div>
            </div>
          )}
          <Textarea
            className="text-lg md:text-lg rounded-2xl border-2 h-[200px] max-w-[500px] border-gray-300 p-4"
            placeholder="Describe your app idea..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {lastDeployment === undefined && (
            <div className="flex flex-col gap-2">
              <span className="text-xl">Choose a template</span>
              <div className="flex flex-wrap place-items-center place-content-center gap-x-2 gap-y-1 p-2 rounded-2xl border-2 max-w-[500px] border-gray-300">
                <Button
                  className="py-4 h-auto rounded-3xl bg-orange-500 flex gap-1 place-items-center"
                  onClick={() => {
                    setInstructions(`\
A quiz that allows someone to find out which animal (cat, dog, fox, hamster, horse) they are most similar to by answering 5 multiple choice questions and be able to share result. Generate an image for each animal in a cute cartoon vector style and display it on the result page. Allow the user to retake the quiz as many times as they want. Write the questions and answers yourself. Randomize the order of the answers for each question.

Place the quiz on the home page.\
`);
                  }}
                >
                  <Pencil />
                  <span>Quiz</span>
                </Button>
                <Button
                  className="py-4 h-auto rounded-3xl bg-green-600 flex gap-1 place-items-center"
                  onClick={() => {
                    setInstructions(`\
2048 is played on a plain 4×4 grid, with square numbered tiles that can be moved using the four onscreen arrow buttons. The arrow buttons are placed bellow the grid in the formation they usually appear on on a keyboard. The game begins with two tiles already in the grid, having a value of either 2 or 4, and another such tile appears in a random empty space after each turn. Tiles with a value of 2 appear 90% of the time, and tiles with a value of 4 appear 10% of the time. Tiles slide as far as possible in the pressed arrow's direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move.

If a move causes three consecutive tiles of the same value to slide together, only the two tiles farthest along the direction of motion will combine. If all four spaces in a row or column are filled with tiles of the same value, a move parallel to that row/column will combine the first two and last two. A scoreboard on the upper-right keeps track of the user's score. The user's score is equal to the sum of all tiles currently on the board.

The game is won when a tile with a value of 2048 appears on the board. Players can continue beyond that to reach higher scores. When the player has no legal moves (there are no empty spaces and no adjacent tiles with the same value), the game ends.

The user should be able to share their score once the game is over.

Place the 2048 game on the home page.\
`);
                  }}
                >
                  <Joystick />
                  <span>2048</span>
                </Button>
                <Button
                  className="py-4 h-auto rounded-3xl bg-blue-500 flex gap-1 place-items-center"
                  onClick={() => {
                    setInstructions(`\
A slot machine with 3 columns and 3 rows, each slot contains one fruit. The fruits should be: Apple, Banana, Cherry, Lemon. Generate an vector style image with white background for each fruit and use it to display that fruit. The fruits should be spawned by the machine at random. The user can press the spin button, which will trigger a spinning animation that moves the columns downward, spawning new fruit at the top repeatedly for 2 seconds. If there are 3 of the same fruit in any row or column at any time while not spinning, display a win message to the user, which they can share on their feed. Check the win condition directly using a conditional render instead of calculating it in a function. The user should always be able to spin again, except while the spinning animation is in progress.

Place the slot machine to the home page.\
`);
                  }}
                >
                  <Coins />
                  <span>Slot Machine</span>
                </Button>
              </div>
            </div>
          )}
          <Button
            className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7"
            onClick={() => {
              fetch("/api/factory/project/change", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  project,
                  instructions:
                    lastDeployment === undefined
                      ? `Code the following app
\`\`\`
${instructions}
\`\`\`

Generate an app logo and update the app metadata title and description.`
                      : instructions,
                }),
              })
                .then(() => {
                  setInstructions("");
                  refetchHistory();
                })
                .catch(console.error);
            }}
            disabled={!instructions}
          >
            Build My App
          </Button>
        </>
      )}
    </main>
  );
}
