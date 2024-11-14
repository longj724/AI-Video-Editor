"use client";

// External Dependencies
import { useState } from "react";
import { type ThemeProviderProps } from "next-themes";
import { type FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ClerkProvider } from '@clerk/nextjs';

export const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
