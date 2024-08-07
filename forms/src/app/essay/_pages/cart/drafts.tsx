"use client";

import { CirclePlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { defaultDraft } from ".";

export type Draft = {
  title: string;
  ready: boolean;
};

interface DraftsProps {
  drafts: Draft[];
  setDrafts: React.Dispatch<React.SetStateAction<Draft[]>>;
}
export const Drafts = ({ drafts, setDrafts }: DraftsProps) => {
  const MAX_DRAFTS = 5;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Drafts</CardTitle>
        <CardDescription>Max drafts per cart: {MAX_DRAFTS}</CardDescription>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="flex w-full justify-start">
            {drafts.map((draft, index) => {
              const i = index.toString();
              const draftTitle = (draft: string) => {
                if (!draft) return "Untitled Draft";
                return draft.length > 9 ? draft.slice(0, 9) + "..." : draft;
              };

              return (
                <TabsTrigger value={i} key={i}>
                  {draftTitle(draft.title)}
                </TabsTrigger>
              );
            })}
            {drafts.length < MAX_DRAFTS && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  drafts.length < MAX_DRAFTS &&
                  setDrafts([...drafts, defaultDraft])
                }
              >
                <CirclePlusIcon className="h-5 w-5" />
              </Button>
            )}
          </TabsList>

          {drafts.map((_, index) => (
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

      <CardFooter>bruh</CardFooter>
    </Card>
  );
};

interface ManageDraftProps {
  index: number;
  drafts: Draft[];
  setDrafts: React.Dispatch<React.SetStateAction<Draft[]>>;
}
const ManageDraft = ({ drafts, setDrafts, index }: ManageDraftProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrafts([
      ...drafts.slice(0, index),
      { title: e.target.value, ready: false },
      ...drafts.slice(index + 1),
    ]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex w-full">
            <input
              type="text"
              className="flex w-full bg-background outline-none placeholder:text-muted-foreground"
              value={drafts[index]?.title}
              onChange={handleChange}
              placeholder="Untitled"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                setDrafts([
                  ...drafts.slice(0, index),
                  ...drafts.slice(index + 1),
                ])
              }
            >
              <TrashIcon className="h-5 w-5 text-red-400" />
            </Button>
          </div>
        </CardTitle>
        {/* <CardDescription>Add to the toggle for the cart</CardDescription> */}
        <CardContent className="space-y-2">hello world</CardContent>
      </CardHeader>
    </Card>
  );
};
