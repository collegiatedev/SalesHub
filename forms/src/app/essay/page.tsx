"use client";
import { Landing } from "./_pages/landing";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Essay() {
  const [page, setPage] = useState(0);

  let current;
  switch (page) {
    case 0:
      current = <Landing />;
      break;
    case 1:
      current = <div>Page 2</div>;
      break;
    case 2:
      current = <div>Page 3</div>;
      break;
    default:
      current = null;
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      {current}
      {page < 1 && <NavButton page={page} setPage={setPage} />}
    </div>
  );
}

const Cart = () => {
  const [page, setPage] = useState(0);
};

interface NavButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const NavButton = ({ page, setPage }: NavButtonProps) => {
  return (
    <Button className="mt-5" onClick={() => setPage(page + 1)}>
      <span className="pr-1.5">Next</span>
      <span className="relative transition-transform duration-200 ease-in-out hover:translate-x-1">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Button>
  );
};
