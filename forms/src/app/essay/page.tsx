"use client";
import React from "react";
import { Landing } from "./_pages/landing";
import { PageProvider, usePage } from "./_components/context";
import { Cart } from "./_pages/cart";

export default function Essay() {
  const pages = [<Landing />, <Cart />];

  return (
    <PageProvider pages={pages}>
      <EssayRouter />
    </PageProvider>
  );
}
const EssayRouter = () => {
  const { pages, pageIndex } = usePage();
  return pages[pageIndex];
};
