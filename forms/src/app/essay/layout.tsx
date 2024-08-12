import "dotenv/config";
import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "./session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Essays",
  description: "Essay Service",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="p-5 max-w-2xl mx-auto">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
