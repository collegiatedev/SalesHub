import { Skeleton } from "./ui/skeleton";

// for essay pages
export const SkeletonEssay = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[80px] w-full" />
      <Skeleton className="h-[500px] w-full rounded-xl" />
    </div>
  );
};
