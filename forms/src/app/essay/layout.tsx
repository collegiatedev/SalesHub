import "dotenv/config";
import "~/styles/essay.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "./_base/session";
import { EssayNavbar } from "./_base/navbar";
import { getSpotsRemaining } from "../_actions/redis";
import { LandingContent } from "./_base/landing";
import { CapacityForm } from "./_base/capacity";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Essays",
  description: "Essay Service",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const spots = await getSpotsRemaining();

  return (
    <html lang="en">
      <body className={inter.className}>
        <EssayNavbar spots={spots} />
        <div className="p-5 max-w-2xl mx-auto">
          {spots > 0 ? (
            // provider here since we provide loading state that should be formatted by div
            <SessionProvider>{children}</SessionProvider>
          ) : (
            <div className="space-y-12">
              <LandingContent />
              <CapacityForm />
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
