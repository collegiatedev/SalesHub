"use client";

import { CirclePlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TotalPrice } from "./price";
import { useDraftStore } from "./store";
import { ManageDraft } from "./_manage";

export const Drafts = () => {
  const MAX_DRAFTS = 5;
  const drafts = useDraftStore((state) => state.getDrafts());
  const addDraft = useDraftStore((state) => state.addDraft);
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full justify-end items-end">
          <div className="flex space-y-1 flex-col w-full">
            <CardTitle>Manage Drafts</CardTitle>
            <CardDescription>Max {MAX_DRAFTS} drafts per cart.</CardDescription>
          </div>
          <TotalPrice />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="flex w-full justify-start">
            {drafts.map((d) => {
              const i = d.id.toString();
              const draftTitle = (draft: string) => {
                if (!draft) return "Untitled Draft";
                return draft.length > 9 ? draft.slice(0, 9) + "..." : draft;
              };

              return (
                <TabsTrigger value={i} key={i}>
                  <span className={`${d.draft.ready && "text-green-400"}`}>
                    {draftTitle(d.draft.title)}
                  </span>
                </TabsTrigger>
              );
            })}
            {drafts.length < MAX_DRAFTS && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => drafts.length < MAX_DRAFTS && addDraft()}
              >
                <CirclePlusIcon className="h-5 w-5" />
              </Button>
            )}
          </TabsList>

          {drafts.map((d) => {
            const i = d.id.toString();
            return (
              <TabsContent value={i} key={i}>
                <ManageDraft id={d.id} />
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};
