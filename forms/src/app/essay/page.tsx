"use client";

import { Suspense } from "react";
import { SkeletonEssay } from "~/components/skeletons";
import { HandleStatuses } from "./_components/statuses";
import { LandingContent } from "./_base/landing";
import { NavButton } from "~/components/myButtons";

export default function RootPage() {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <LandingContent />
      <div className="mt-8">
        <NavButton route="/essay/cart" text="Next" />
      </div>
      <HandleStatuses />
    </Suspense>
  );
}
