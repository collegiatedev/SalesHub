// layout component, not called layout.tsx cuz nextisms

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePage } from "./context";

export const Wrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { pageIndex, setPageIndex, pages } = usePage();
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="flex justify-items-start gap-4 mb-8 items-center">
        {pageIndex > 0 && (
          <BackButton pageIndex={pageIndex} setPageIndex={setPageIndex} />
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
      {pages.length > pageIndex + 1 && (
        <div className="mt-8">
          <NextButton pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </div>
      )}
    </div>
  );
};

interface NavButton {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}
const BackButton = ({ pageIndex, setPageIndex }: NavButton) => {
  return (
    <Button onClick={() => setPageIndex(pageIndex - 1)}>
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};
const NextButton = ({ pageIndex, setPageIndex }: NavButton) => {
  return (
    <Button className="group" onClick={() => setPageIndex(pageIndex + 1)}>
      <span className="pr-1.5">Next</span>
      <span className="relative transition-transform duration-200 ease-in-out group-hover:translate-x-1">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Button>
  );
};
