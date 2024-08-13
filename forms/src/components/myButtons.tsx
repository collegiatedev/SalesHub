"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense, useTransition } from "react";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  onCheckout: () => Promise<void>;
}
export const CheckoutButton = ({ onCheckout }: CheckoutButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await onCheckout();
    });
  };

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Checkout"
      )}
    </Button>
  );
};

interface NavButtonProps {
  route: string;
  text: string;
  backwards?: boolean;
  disabled?: boolean;
}
export const NavButton = (props: NavButtonProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavButtonContent {...props} />
    </Suspense>
  );
};

export const NavButtonContent = ({
  route,
  text,
  backwards,
  disabled,
}: NavButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNext = () => {
    const params = searchParams.toString();
    router.push(`${route}${params ? `?${params}` : ""}`);
  };

  const buttonProps = {
    className: "group",
    onClick: handleNext,
    disabled,
  };
  if (backwards) {
    return (
      <Button {...buttonProps} className="group" variant={"secondary"}>
        <span className="relative transition-transform duration-200 ease-in-out group-hover:-translate-x-1">
          <ArrowLeft className="h-5 w-5" />
        </span>
        <span className="pl-1.5">{text}</span>
      </Button>
    );
  }

  return (
    <Button {...buttonProps} className="group">
      <span className="pr-1.5">{text}</span>
      <span className="relative transition-transform duration-200 ease-in-out group-hover:translate-x-1">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Button>
  );
};
