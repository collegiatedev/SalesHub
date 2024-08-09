"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense } from "react";

interface NavButtonProps {
  route: string;
  text: string;
  backwards?: boolean;
}

// don't you love suspense?
export const NavButton = ({ route, text, backwards }: NavButtonProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavButtonContent route={route} text={text} backwards={backwards} />
    </Suspense>
  );
};

export const NavButtonContent = ({
  route,
  text,
  backwards,
}: NavButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNext = () => {
    const params = searchParams.toString();
    router.push(`${route}${params ? `?${params}` : ""}`);
  };

  if (backwards) {
    return (
      <Button className="group" onClick={handleNext}>
        <span className="relative transition-transform duration-200 ease-in-out group-hover:-translate-x-1">
          <ArrowLeft className="h-5 w-5" />
        </span>
        <span className="pl-1.5">{text}</span>
      </Button>
    );
  }

  return (
    <Button className="group" onClick={handleNext}>
      <span className="pr-1.5">{text}</span>
      <span className="relative transition-transform duration-200 ease-in-out group-hover:translate-x-1">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Button>
  );
};
