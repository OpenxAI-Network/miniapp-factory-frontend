"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MiniAppProvider } from "./miniapp-provider";
import { WagmiProvider } from "wagmi";
import { web3config } from "@/lib/web3-config";
import { Toaster } from "../ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <MiniAppProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={web3config}>
          {children}
          <Toaster />
        </WagmiProvider>
      </QueryClientProvider>
    </MiniAppProvider>
  );
}
