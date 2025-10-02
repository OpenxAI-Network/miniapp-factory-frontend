"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MiniAppProvider } from "./miniapp-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <MiniAppProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MiniAppProvider>
  );
}
