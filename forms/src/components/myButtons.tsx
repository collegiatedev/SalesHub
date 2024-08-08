"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const NavButton = ({
  route,
  text,
  backwards,
}: {
  route: string;
  text: string;
  backwards?: boolean;
}) => {
  const router = useRouter();

  const handleNext = () => {
    router.push(route);
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
