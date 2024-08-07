"use client";
import { Redis } from "@upstash/redis";
import React, { createContext, useState, useContext } from "react";

const PageContext = createContext<
  | {
      pages: React.ReactNode[];
      pageIndex: number;
      setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);
export const PageProvider: React.FC<{
  children: React.ReactNode;
  pages: React.ReactNode[];
}> = ({ pages, children }) => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <PageContext.Provider value={{ pages, pageIndex, setPageIndex }}>
      {children}
    </PageContext.Provider>
  );
};
export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
