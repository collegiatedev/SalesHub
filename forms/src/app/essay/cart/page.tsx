"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { PersonalInfo } from "~/app/essay/cart/personal";
import { MyTitle } from "~/components/myTitle";
import { NavButton } from "~/components/myButtons";
import { ManageDrafts } from "./_manage";
import { useDraftStore } from "../store";
import { SkeletonEssay } from "~/components/skeletons";

export default function EssayCartPage() {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <EssayCart />
    </Suspense>
  );
}

const EssayCart = () => {
  const drafts = useDraftStore((state) =>
    state.getDrafts().map((d) => d.draft)
  );
  const isReady = drafts.every((draft) => draft.ready);
  const [completed, setCompleted] = useState(isReady);

  // causes some minor issues but its fine
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isReady && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isReady]);

  return (
    <>
      <div className="flex justify-items-start gap-3">
        <NavButton route="/essay" text="Back" backwards />
        <MyTitle title="Shopping Cart" />
      </div>
      <div className="space-y-4">
        <PersonalInfo completedState={{ completed, setCompleted }} />
        {completed && (
          <>
            <ManageDrafts />
            {isReady && (
              <div className="mt-8 w-full flex justify-end">
                <NavButton route="/essay/confirm" text="Confirm" />
              </div>
            )}
          </>
        )}
      </div>
      <div ref={bottomRef as React.RefObject<HTMLDivElement>} />
    </>
  );
};
