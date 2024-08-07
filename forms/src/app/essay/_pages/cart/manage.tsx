import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Draft,
  EssayType,
  WordCountType,
  ESSAY_TYPES,
  WORD_COUNT_TYPES,
  DEFAULT_DRAFT,
} from "./constants";
import { Label } from "~/components/ui/label";

interface ManageDraftProps {
  index: number;
  drafts: Draft[];
  setDrafts: React.Dispatch<React.SetStateAction<Draft[]>>;
}

export const ManageDraft = ({ drafts, setDrafts, index }: ManageDraftProps) => {
  return (
    <Card className="w-full">
      <ManageHeader drafts={drafts} setDrafts={setDrafts} index={index} />
      {/* <CardDescription>Add to the toggle for the cart</CardDescription> */}
      <ManageType drafts={drafts} setDrafts={setDrafts} index={index} />

      <CardFooter className="flex w-full justify-end">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
};

const ManageHeader = ({ drafts, setDrafts, index }: ManageDraftProps) => {
  const draft = drafts[index]!;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrafts([
      ...drafts.slice(0, index),
      { ...draft, title: e.target.value },
      ...drafts.slice(index + 1),
    ]);
  };
  return (
    <CardHeader>
      <CardTitle>
        <div className="flex w-full">
          <input
            type="text"
            className="flex w-full bg-background outline-none placeholder:text-muted-foreground"
            value={draft?.title}
            onChange={handleChange}
            placeholder="Untitled"
          />
          <Button
            className="hover:text-red-400"
            size="icon"
            variant="ghost"
            onClick={() =>
              setDrafts([...drafts.slice(0, index), ...drafts.slice(index + 1)])
            }
          >
            {/* todo, figure out why text-color not properly applying */}
            <TrashIcon className="h-5 w-5 text-color-muted-foreground" />
          </Button>
        </div>
      </CardTitle>
    </CardHeader>
  );
};
const ManageType = ({ drafts, setDrafts, index }: ManageDraftProps) => {
  const draft = drafts[index]!;

  const setEssayType = (essay: EssayType) => {
    setDrafts([
      ...drafts.slice(0, index),
      { ...draft, type: { essay, wordCount: draft.type?.wordCount } },
      ...drafts.slice(index + 1),
    ]);
  };

  const setWordCountType = (wordCount: WordCountType) => {
    setDrafts([
      ...drafts.slice(0, index),
      { ...draft, type: { wordCount, essay: draft.type!.essay } },
      ...drafts.slice(index + 1),
    ]);
  };

  return (
    <CardContent className="space-y-2">
      <div className="flex flex-row space-x-4">
        <FormInputSelect
          label="Essay Type"
          types={ESSAY_TYPES}
          setSelected={setEssayType}
        />
        {draft.type?.essay === "Supplemental Essay" && (
          <FormInputSelect
            label="Word Count"
            types={WORD_COUNT_TYPES}
            setSelected={setWordCountType}
          />
        )}
      </div>
    </CardContent>
  );
};

type InputSelectsTypes = EssayType | WordCountType;
const FormInputSelect = <T extends InputSelectsTypes>({
  label,
  types,
  setSelected,
}: {
  label: string;
  types: readonly T[];
  setSelected: (value: T) => void;
}) => (
  <div className="flex flex-col space-y-2 w-full">
    <Label>{label}</Label>
    <Select onValueChange={setSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
