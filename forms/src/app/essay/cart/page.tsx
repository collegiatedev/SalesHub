"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { PersonalInfoForm } from "~/app/essay/cart/personal";
import { MyTitle } from "~/components/myTitle";
import { NavButton } from "~/components/myButtons";
import { ManageDraftsForm } from "./_manage";
import { useDraftStore } from "../store";
import { SkeletonEssay } from "~/components/skeletons";
import { Draft } from "~/app/constants";

export default function EssayCartPage() {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <EssayCart />
    </Suspense>
  );
}

const EssayCart = () => {
  // store
  const drafts = useDraftStore((state) =>
    state.getDrafts().map((d) => d.draft)
  );
  // helpers
  const everyReady = (drafts: Draft[]) => drafts.every((draft) => draft.ready);
  const someReady = (drafts: Draft[]) => drafts.some((draft) => draft.ready);
  // hooks
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [completedPersonal, setCompletedPersonal] = useState(someReady(drafts));
  const [isEveryReady, setIsEveryReady] = useState(everyReady(drafts));
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const status = everyReady(drafts);
    if (status !== isEveryReady) setIsEveryReady(status);
    if (!hasScrolled && someReady(drafts) && bottomRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100); // Delay the scroll to ensure content is fully loaded
      setHasScrolled(true);
    }
  }, [hasScrolled, drafts]);

  return (
    <>
      <div className="flex justify-items-start gap-3">
        <NavButton route="/essay" text="Back" backwards />
        <MyTitle title="Shopping Cart" />
      </div>
      <div className="space-y-4">
        <PersonalInfoForm
          completedState={{
            completedPersonal,
            setCompletedPersonal,
          }}
        />
        {completedPersonal && (
          <>
            <ManageDraftsForm />
            {hasScrolled && (
              <div className="mt-8 w-full flex justify-end">
                <NavButton
                  route="/essay/confirm"
                  text="Confirm"
                  disabled={!isEveryReady}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div ref={bottomRef as React.RefObject<HTMLDivElement>} />
    </>
  );
};
