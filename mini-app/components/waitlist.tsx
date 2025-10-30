"use client";

import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@/hooks/useAddress";
import { CheckCircle2, X } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function Waitlist() {
  const address = useAddress();

  const { data: waitlistAllowed } = useQuery({
    queryKey: ["waitlistAllowed"],
    queryFn: async () => {
      return await fetch("/api/waitlist/allowed")
        .then((res) => {
          if (res.status === 400) {
            toast(
              "Couldn't detect ip address, please try on a different network.",
              { className: "bg-red-600 border-red-600" }
            );
          }
          if (res.status === 500) {
            toast("Unknown error occurred.", {
              className: "bg-red-600 border-red-600",
            });
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => data as boolean)
        .catch(console.error);
    },
    refetchInterval: 1_000, // 1 second
  });

  const { data: waitlistPosition, refetch: refetchWaitlistPosition } = useQuery(
    {
      queryKey: ["waitlistPosition", address ?? ""],
      enabled: !!address,
      queryFn: async () => {
        return await fetch(`/api/waitlist/${address}/position`)
          .then((res) => {
            if (res.status === 500) {
              toast("Unknown error occurred.", {
                className: "bg-red-600 border-red-600",
              });
            }
            return res;
          })
          .then((res) => res.json())
          .then((data) => data as number)
          .catch(console.error);
      },
    }
  );

  return (
    <div className="flex flex-col place-items-center gap-4">
      {!address && (
        <div className="flex place-items-center gap-2">
          <span>Account Connected</span>
          <X className="text-red-600" />
        </div>
      )}
      <appkit-button />
      {waitlistPosition !== undefined &&
        (waitlistPosition === -1 ? (
          <>
            <div className="flex flex-col place-items-center gap-1">
              <div className="flex place-items-center gap-2">
                <span>Anti Spam Check</span>
                {waitlistAllowed === undefined ? (
                  <Spinner />
                ) : waitlistAllowed ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <X className="text-red-600" />
                )}
              </div>
              {waitlistAllowed === false && (
                <span className="text-red-600 text-center">
                  Someone else already subscribed on this network. Please
                  subscribe on a unique network, e.g. by using mobile data.
                </span>
              )}
            </div>
            <Button
              onClick={() => {
                fetch(`/api/waitlist/${address}/enroll`, {
                  method: "POST",
                }).then((res) => {
                  if (res.status === 400) {
                    toast(
                      "Couldn't detect ip address, please try on a different network.",
                      { className: "bg-red-600 border-red-600" }
                    );
                  }
                  if (res.status === 403) {
                    toast("Network or account already used in subscription.", {
                      className: "bg-red-600 border-red-600",
                    });
                  }
                  if (res.status === 500) {
                    toast("An unknown error occurred.", {
                      className: "bg-red-600 border-red-600",
                    });
                  }

                  refetchWaitlistPosition();
                });
              }}
              disabled={waitlistAllowed !== true}
            >
              Subscribe
            </Button>
          </>
        ) : (
          <>
            <div className="flex place-items-center gap-2">
              <CheckCircle2 className="text-green-600" />
              <span className="text-green-600">On the waitlist!</span>
            </div>
            <div className="flex place-items-center gap-1">
              <span>
                You&apos;ve successfully subscribed on waitlist position
              </span>
              <span className="font-semibold text-lg">
                #{waitlistPosition + 1}
              </span>
            </div>
          </>
        ))}
    </div>
  );
}
