"use client";

import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@/hooks/useAddress";
import { CheckCircle2, X } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { DataTable } from "./ui/data-table";
import { DataTablePagination } from "./ui/data-table-pagination";
import { checksumAddress } from "viem";
import Link from "next/link";

interface PublicWaitlist {
  account: string;
  date: number;
}

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

  const { data: publicWaitlist, refetch: refetchPublicWaitlist } = useQuery({
    queryKey: ["publicWaitlist"],
    queryFn: async () => {
      return await fetch(`/api/waitlist/all`)
        .then((res) => {
          if (res.status === 500) {
            toast("Unknown error occurred.", {
              className: "bg-red-600 border-red-600",
            });
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => data as PublicWaitlist[])
        .catch(console.error);
    },
    refetchInterval: 10_000,
  });

  const columns: ColumnDef<PublicWaitlist>[] = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      header: "Account",
      cell: ({ row }) => {
        const address = `0x${row.original.account.replace(
          "eth:",
          ""
        )}` as const;
        return (
          <Link
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
          >
            {checksumAddress(address)}
          </Link>
        );
      },
    },
    {
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.date * 1000);
        const month = date.getMonth() + 1;
        const monthStr =
          month === 10 ? "Oct" : month === 11 ? "Nov" : month.toString();
        return (
          <span>
            {date.getDate()} {monthStr}{" "}
            {date.getHours().toString().padStart(2, "0")}:
            {date.getMinutes().toString().padStart(2, "0")}
          </span>
        );
      },
    },
  ];
  const table = useReactTable({
    columns: columns,
    data: publicWaitlist ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col place-items-center gap-4">
      {publicWaitlist?.length && (
        <span className="font-semibold text-lg text-center">
          {publicWaitlist.length} people have joined the list!
        </span>
      )}
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
                  refetchPublicWaitlist();
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
            <span className="text-center">
              You&apos;ve successfully subscribed on waitlist position{" "}
              <span className="font-semibold text-lg">#{waitlistPosition}</span>
            </span>
          </>
        ))}
      <div className="flex flex-col gap-1 max-w-screen px-2">
        <ScrollArea className="w-full">
          <DataTable table={table} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
