"use client";

import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const Drafts = () => {
  const MAX_DRAFTS = 5;
  const [drafts, setDrafts] = useState<string[]>([""]);

  const draftTitle = (draft: string) => {
    if (!draft) return "Untitled Draft";
    return draft.length > 9 ? draft.slice(0, 9) + "..." : draft;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Drafts</CardTitle>
        <CardDescription>Max drafts per cart: {MAX_DRAFTS}</CardDescription>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="flex w-full justify-start">
            {drafts.map((draft, index) => {
              const i = index.toString();

              return (
                <TabsTrigger value={i} key={i}>
                  {draftTitle(draft)}
                </TabsTrigger>
              );
            })}
            {drafts.length < MAX_DRAFTS && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  drafts.length < MAX_DRAFTS && setDrafts([...drafts, ""])
                }
              >
                <CirclePlusIcon className="h-5 w-5" />
              </Button>
            )}
          </TabsList>

          {drafts.map((draft, index) => (
            <TabsContent value={index.toString()} key={index.toString()}>
              <ManageDraft
                drafts={drafts}
                index={index}
                setDrafts={setDrafts}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
    </Card>
  );
};

interface ManageDraftProps {
  index: number;
  drafts: string[];
  setDrafts: React.Dispatch<React.SetStateAction<string[]>>;
}
const ManageDraft = ({ drafts, setDrafts, index }: ManageDraftProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrafts([
      ...drafts.slice(0, index),
      e.target.value,
      ...drafts.slice(index + 1),
    ]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <input
            type="text"
            className="flex w-full bg-background outline-none placeholder:text-muted-foreground"
            value={drafts[index]}
            onChange={handleChange}
            placeholder="Untitled"
          />
        </CardTitle>
        {/* <CardDescription>Add to the toggle for the cart</CardDescription> */}
        <CardContent className="space-y-2">hello world</CardContent>
      </CardHeader>
    </Card>
  );
};
