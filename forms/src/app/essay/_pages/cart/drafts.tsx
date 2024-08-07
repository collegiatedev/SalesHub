"use client";

import { CirclePlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DEFAULT_DRAFT, Draft } from "./constants";
import { ManageDraft } from "./manage";
import { TotalPrice } from "./price";

interface DraftsProps {
  drafts: Draft[];
  setDrafts: React.Dispatch<React.SetStateAction<Draft[]>>;
}
export const Drafts = ({ drafts, setDrafts }: DraftsProps) => {
  const MAX_DRAFTS = 5;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Drafts</CardTitle>
        <CardDescription>Max {MAX_DRAFTS} drafts per cart.</CardDescription>
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
                  <span className={`${draft.ready && "text-green-400"}`}>
                    {draftTitle(draft.title)}
                  </span>
                </TabsTrigger>
              );
            })}
            {drafts.length < MAX_DRAFTS && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  drafts.length < MAX_DRAFTS &&
                  setDrafts([...drafts, DEFAULT_DRAFT])
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
                setDrafts={setDrafts}
                index={index}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>

      <TotalPrice drafts={drafts} />
    </Card>
  );
};
