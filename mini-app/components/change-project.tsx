"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

export function ChangeProject({ project }: { project: string }) {
  const [instructions, setInstructions] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-3 place-items-center">
      <Textarea
        className="min-w-[300px]"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <Button
        onClick={() => {
          setProcessing(true);
          fetch("/api/factory/project/change", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ project, instructions }),
          })
            .then(() => {
              setInstructions("");
              queryClient.invalidateQueries({ queryKey: ["history", project] });
            })
            .catch(console.error)
            .finally(() => setProcessing(false));
        }}
        disabled={processing}
      >
        Apply Changes
      </Button>
    </div>
  );
}
