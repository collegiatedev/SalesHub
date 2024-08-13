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
import { TotalPrice } from "../../_components/price";
import { useDraftStore } from "../../store";
import { ManageDraft } from "./draft";
import { saveDraft } from "~/app/_actions/redis";
import { useSession } from "../../session";

const MAX_DRAFTS = 5;

export const ManageDrafts = () => {
  const drafts = useDraftStore((state) => state.getDrafts());
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
            {drafts.length < MAX_DRAFTS && <AddDraftButton />}
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

const AddDraftButton = () => {
  const { addDraft, getDraftCount } = useDraftStore();
  const sessionId = useSession().sessionId;

  const withClick = async () => {
    const count = getDraftCount();
    if (count < MAX_DRAFTS) {
      const { draft, id } = addDraft();
      await saveDraft({ draftId: id, sessionId, draft });
    }
  };

  return (
    <Button size="icon" variant="ghost" onClick={() => withClick()}>
      <CirclePlusIcon className="h-5 w-5" />
    </Button>
  );
};
