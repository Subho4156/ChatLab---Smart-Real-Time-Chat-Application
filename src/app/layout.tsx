import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatLab",
  description: "You Chatting App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>
            <ConvexClientProvider>
              <main>{children}</main>
              <Footer />
            <Toaster />
            </ConvexClientProvider>
            </ClerkProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
