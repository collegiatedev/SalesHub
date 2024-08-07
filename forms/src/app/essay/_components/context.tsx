"use client";
import React, { createContext, useState, useContext } from "react";

// Create the context
const PageContext = createContext<
  | {
      pages: React.ReactNode[];
      pageIndex: number;
      setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);

// Create a provider component
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

// Create a custom hook to use the PageContext
export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
