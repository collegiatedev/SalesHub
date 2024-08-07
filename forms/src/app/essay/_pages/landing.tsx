"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Skeleton } from "~/components/ui/skeleton";
import { Wrapper } from "../_components/wrapper";

export const Landing = () => {
  const [loaded, setLoaded] = useState(false);
  const LOOM_SECTION = "Example";
  return (
    <Wrapper title="Essay Editor">
      <p className="mb-3">
        This is a description page where you can provide detailed information
        about the topic at hand. You can include various elements such as
        images, lists, and links to enhance the content.
      </p>
      <Accordion
        type="single"
        collapsible
        // resets the skeleton for iframe when the accordion is not displaying loom
        onValueChange={(v) => v !== LOOM_SECTION && setLoaded(false)}
      >
        <LandingItem name="How it Works">
          <ul className="list-disc list-inside mb-4">
            <li>Feature 1: Detailed descriptions</li>
            <li>Feature 2: User-friendly layout</li>
            <li>Feature 3: Responsive design</li>
          </ul>
        </LandingItem>
        <LandingItem name="Pricing">
          <p className="mb-4">
            This is a description page where you can provide detailed
            information about the topic at hand. You can include various
            elements such as images, lists, and links to enhance the content.
          </p>
        </LandingItem>
        <LandingItem name={LOOM_SECTION}>
          <LoomExample loaded={loaded} setLoaded={setLoaded} />
        </LandingItem>
      </Accordion>
    </Wrapper>
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
