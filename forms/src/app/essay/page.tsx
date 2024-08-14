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
import { Separator } from "~/components/ui/separator";

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
      <MyTitle
        title="Saying Goodbye to Generic Edits"
        description="Forget ChatGPT and Grammarly."
      />
      <p className="text-md">
        Your application deserves to stand out. Your essay deserves personalized
        feedback. Your writing deserves to reflect your unique voice and
        showcase your unparalleled potential.
        <br />
        <span className="block font-bold pt-2">
          Work with our team of top Harvard writers and craft your story:
          authentic, powerful, and unforgettable.
        </span>
      </p>
      <Separator className="my-5 h-[1.5px]" />
      <Accordion
        type="single"
        collapsible
        // resets the skeleton for iframe when the accordion is not displaying loom
        onValueChange={(v) => v !== LOOM_SECTION && setLoaded(false)}
      >
        <LandingItem name="How it Works">
          <ol className="list-decimal list-inside mb-4">
            <li>Submit up to 5 college essays drafts.</li>
            <li>
              Receive a round of expert edits and a personalized video review.
            </li>
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
            Letter of Continued Interest: $98
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
      <AccordionContent>
        <div className="text-lg">{children}</div>
      </AccordionContent>
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
        src="https://www.loom.com/share/e249238bd8864bcebbe3b7a1fe1bfaad?sid=7948e08d-0c94-4e86-9fb9-b31e855d2464"
        onLoad={() => setLoaded(true)}
        className={`absolute top-0 left-0 w-full h-full ${
          loaded ? "block" : "hidden"
        }`}
        allowFullScreen
      ></iframe>
    </div>
  );
};
