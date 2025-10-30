"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MiniAppProvider } from "./miniapp-provider";
import { Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { projectId, wagmiAdapter } from "@/lib/web3-config";
import { Toaster } from "../ui/sonner";
import { createAppKit } from "@reown/appkit/react";
import { mainnet } from "@reown/appkit/networks";

const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: "miniapp-factory",
  description:
    "AI-powered application to allow creation of Farcaster mini apps with natural language.",
  url: "https://miniapp-factory.marketplace.openxai.network", // origin must match your domain & subdomain
  icons: ["https://miniapp-factory.marketplace.openxai.network/icon.png"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet],
  defaultNetwork: mainnet,
  metadata: metadata,
  themeMode: "light",
  defaultAccountTypes: {
    eip155: "eoa",
  },
});

export function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <MiniAppProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider
          config={wagmiAdapter.wagmiConfig as Config}
          initialState={initialState}
        >
          {children}
          <Toaster />
        </WagmiProvider>
      </QueryClientProvider>
    </MiniAppProvider>
  );
}
