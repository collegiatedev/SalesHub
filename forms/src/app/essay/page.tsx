"use client";

import { Suspense } from "react";
import { SkeletonEssay } from "~/components/skeletons";
import { HandleStatuses } from "./statuses";
import { useState } from "react";
import { MyTitle } from "~/components/myTitle";
import { NavButton } from "~/components/myButtons";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function LandingPage() {
  return (
    <Suspense fallback={<SkeletonEssay />}>
      <LandingContent />
      <HandleStatuses />
    </Suspense>
  );
}
const LandingContent = () => {
  const [loaded, setLoaded] = useState(false);
  const LOOM_SECTION = "Example";
  return (
    <div>
      <MyTitle title="Say Goodbye to Generic Edits" />
      <p className="mb-3">
        Forget GPT and Grammarly. Your application deserves more—something that
        truly stands out. Submit any essay and our team of Harvard editors will
        handle the rest. Secure your future at your dream college by crafting a
        story only you can tell—authentic, powerful, and unforgettable.
      </p>
      <Accordion
        type="single"
        collapsible
        // resets the skeleton for iframe when the accordion is not displaying loom
        onValueChange={(v) => v !== LOOM_SECTION && setLoaded(false)}
      >
        <LandingItem name="How it Works">
          <ol className="list-decimal list-inside mb-4">
            <li>Submit up to 5 college essays.</li>
            <li>Receive expert edits and a personalized video review.</li>
            <li>
              Get your polished essays and video feedback within 6 business
              days.
            </li>
          </ol>
        </LandingItem>
        <LandingItem name="Pricing">
          <p>Supplemental Essay:</p>
          <ul className="list-disc list-inside ml-2">
            <li>&lt;250 words: $48</li>
            <li>250-500 words: $68</li>
            <li>&gt;500 words: $88</li>
          </ul>
          <p>
            Common App Essay: $98
            <br />
            UC PIQ: $68
          </p>
        </LandingItem>
        <LandingItem name={LOOM_SECTION}>
          <LoomExample loaded={loaded} setLoaded={setLoaded} />
        </LandingItem>
      </Accordion>
      <div className="mt-8">
        <NavButton route="/essay/cart" text="Next" />
      </div>
    </div>
  );
};

interface LandingItemProps {
  name: string;
  children: React.ReactNode;
}
const LandingItem = ({
  name,
  children,
}: LandingItemProps): React.ReactElement => {
  return (
    <AccordionItem value={name}>
      <AccordionTrigger className="text-2xl font-semibold mb-2">
        {name}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

interface LoomExampleProps {
  loaded: boolean;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoomExample = ({ loaded, setLoaded }: LoomExampleProps) => {
  return (
    <div className="relative pb-[64.67065868263472%] h-0">
      {!loaded && (
        <Skeleton className="absolute top-0 left-0 w-full h-full rounded-xl" />
      )}
      <iframe
        id="loom-iframe"
        src="https://www.loom.com/embed/6cb8eab0b79340f1aa05d48f33880150?sid=aad1cf4f-d3cb-4c35-8db5-1bbea3b8e404"
        onLoad={() => setLoaded(true)}
        className={`absolute top-0 left-0 w-full h-full ${
          loaded ? "block" : "hidden"
        }`}
        allowFullScreen
      ></iframe>
    </div>
  );
};
