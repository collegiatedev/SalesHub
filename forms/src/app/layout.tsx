import "dotenv/config";
import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "../components/queryProvider";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collegiate Accelerator",
  description: "Informational Forms",
};

const Head = () => (
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <script async src="https://tally.so/widgets/embed.js"></script>
  </head>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <Head />
        <body className={inter.className}>{children}</body>
        <Toaster />
      </html>
    </ReactQueryClientProvider>
  );
}
