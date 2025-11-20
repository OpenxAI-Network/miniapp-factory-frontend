import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  CheckCircle2,
  CircleDollarSign,
  Hourglass,
  Wallet,
} from "lucide-react";
import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { useAppKit, useDisconnect } from "@reown/appkit/react";
import { useMiniAppContext } from "./context/miniapp-provider";
import Link from "next/link";
import { base } from "viem/chains";

export function CreditsPayment({
  user,
  item,
  price,
  close,
}: {
  user: string | null;
  item: string;
  price: number;
  close: (success: boolean) => void;
}) {
  const { address } = useAccount();
  const { data: credits, refetch: refetchCredits } = useQuery({
    queryKey: ["user_credits", user ?? ""],
    enabled: !!user,
    queryFn: async () => {
      return fetch("/api/factory/user/credits")
        .then((res) => res.json())
        .then((data) => data as number)
        .catch(console.error);
    },
  });

  const [topUp, setTopUp] = useState<number>(0);
  useEffect(() => {
    if (credits === undefined) {
      return;
    }

    setTopUp(Math.round((price - credits) / 1_000_000));
  }, [credits, price]);

  const [step, setStep] = useState<"buy" | "wait" | "confirm">("buy");

  const tokenAddress = "0xA66B448f97CBf58D12f00711C02bAC2d9EAC6f7f" as const;
  const { data: balance, refetch: refetchBalance } = useReadContract({
    chainId: base.id,
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [address as Address],
    query: {
      enabled: !!address,
      refetchInterval: 2_000, // 2 seconds
    },
  });

  const [promoCode, setPromoCode] = useState<string>("");

  const [performingTransaction, setPerformingTransaction] =
    useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({
    chainId: base.id,
  });

  const { open } = useAppKit();
  const { sdk, isInMiniApp } = useMiniAppContext();

  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { disconnect } = useDisconnect();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          close(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Required</DialogTitle>
          <DialogDescription>
            This is a one time creation fee, afterward the mini app is fully
            owned by you and not subject to any other payments.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-3">
          <div className="flex place-content-between place-items-center">
            <span>Cost of {item}</span>
            <div className="flex place-items-center gap-1 rounded-lg bg-green-200 px-2 py-1 text-sm">
              <CircleDollarSign className="size-5" />
              <span>
                {price / 1_000_000} Credits ({price / 1_000_000} OPENX)
              </span>
            </div>
          </div>
          {step === "confirm" ? (
            <div className="flex gap-1 text-green-600">
              <CheckCircle2 />
              <span>Payment confirmed and credits updated</span>
            </div>
          ) : step === "wait" ? (
            <div className="flex gap-1 text-orange-500">
              <Hourglass />
              <span>Waiting for transaction confirmation</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {credits !== undefined && (
                <div className="flex place-content-between place-items-center">
                  <span>Your wallet balance</span>
                  <div className="flex place-items-center gap-1 rounded-lg bg-blue-200 px-2 py-1 text-sm">
                    <Wallet className="size-5" />
                    <span>{(credits / 1_000_000).toFixed(2)} Credits</span>
                  </div>
                </div>
              )}
              <div className="flex place-content-between place-items-center">
                <span>You need</span>
                <div className="flex place-items-center gap-1 rounded-lg bg-red-200 px-2 py-1 text-sm">
                  <span>{topUp} Credits</span>
                </div>
              </div>
              <div className="flex place-content-between place-items-center">
                <span>You will be charged</span>
                <span>{topUp} OPENX</span>
              </div>
            </div>
          )}
        </div>
        {step === "buy" && (
          <DialogFooter>
            <div className="flex w-full flex-col gap-8">
              <div className="grid w-full grid-cols-2 gap-2">
                <Button
                  className="rounded-lg border-primary text-primary"
                  variant="outline"
                  onClick={() => {
                    close(false);
                  }}
                >
                  Cancel
                </Button>
                {balance !== undefined &&
                balance < BigInt(topUp) * BigInt(10) ** BigInt(18) ? (
                  isInMiniApp ? (
                    <Button
                      className="rounded-lg bg-blue-700"
                      onClick={() => {
                        sdk.actions
                          .swapToken({
                            buyToken: `eip155:8453/erc20:${tokenAddress}`,
                          })
                          .then(() => {
                            refetchBalance();
                          });
                      }}
                    >
                      Purchase OPENX
                    </Button>
                  ) : (
                    <Button className="rounded-lg bg-blue-700" asChild>
                      <Link
                        href={`https://app.uniswap.org/explore/tokens/base/${tokenAddress}`}
                        target="_blank"
                      >
                        Purchase OPENX
                      </Link>
                    </Button>
                  )
                ) : (
                  <Button
                    className="rounded-lg bg-blue-700"
                    onClick={() => {
                      if (!address) {
                        open();
                        return;
                      }

                      if (chainId !== base.id) {
                        switchChainAsync({ chainId: base.id }).catch(() =>
                          disconnect()
                        );
                        return;
                      }

                      setPerformingTransaction(true);
                      writeContractAsync({
                        chainId: base.id,
                        abi: erc20Abi,
                        address: tokenAddress,
                        functionName: "transfer",
                        args: [
                          "0xC96d00a5e1d03b719ADD5A855ba84d05561D9897",
                          BigInt(topUp) * BigInt(10) ** BigInt(18),
                        ],
                      })
                        .then((tx) => {
                          setStep("wait");
                          publicClient
                            ?.waitForTransactionReceipt({ hash: tx })
                            .then(() => {
                              setStep("confirm");
                              new Promise((resolve) =>
                                setTimeout(resolve, 3_000)
                              ).then(() => {
                                refetchCredits();
                                setStep("buy");
                                close(true);
                              });
                            });
                        })
                        .catch(console.error)
                        .finally(() => setPerformingTransaction(false));
                    }}
                    disabled={performingTransaction}
                  >
                    Purchase Credits
                  </Button>
                )}
              </div>
              <div className="flex place-content-between place-items-center">
                <Separator className="basis-[45%] bg-muted-foreground" />
                <span>or</span>
                <Separator className="basis-[45%] bg-muted-foreground" />
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex place-items-center gap-2">
                  <Label className="shrink-0">Promo Code</Label>
                  <Input
                    placeholder="57ad010e-1df6-418e-ae9c-937dbfbeb834"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
                <Button
                  className="rounded-lg bg-blue-700"
                  onClick={() => {
                    axios
                      .post("/api/factory/promo_code/redeem", {
                        code: promoCode,
                      })
                      .then(() => {
                        refetchCredits();
                        setStep("buy");
                        close(true);
                      })
                      .catch(() => {
                        toast("Invalid Promo Code");
                      });
                  }}
                  disabled={
                    !new RegExp(
                      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
                    ).test(promoCode)
                  }
                >
                  Redeem
                </Button>
              </div>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
