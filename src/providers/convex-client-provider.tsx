"use client";

import { useAuth } from "@clerk/clerk-react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return(
    <ClerkProvider publishableKey={process.env.EXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}