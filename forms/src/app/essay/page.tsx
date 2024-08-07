"use client";
import React from "react";
import { Landing } from "./_pages/landing";
import { PageProvider, usePage } from "./_components/context";

export default function Essay() {
  const pages = [<Landing />, <Landing />, <Landing />];

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

// const Cart = () => {
//   const [page, setPage] = useState(0);
// };
