import { Suspense } from "react";
import { SkeletonEssay } from "~/components/skeletons";
import { Landing } from "./landing";
import { Statuses } from "./statuses";
import { SearchParams } from "../constants";

export default function LandingPage(searchParams: SearchParams) {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <Landing />
      <Statuses searchParams={searchParams} />
    </Suspense>
  );
}
