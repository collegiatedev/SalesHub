import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import {
  ESSAY_TYPES,
  IS_LETTER,
  IS_SUPPLEMENTAL,
  WORD_COUNT_TYPES,
} from "../constants";
import { Draft, useDraftStore } from "../store";
import { ManageHeader } from "./header";
import { ManageType } from "./type";
import { ManageQuestions } from "./questions";

const draftSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    essayType: z.enum(ESSAY_TYPES),
    wordCount: z.enum(WORD_COUNT_TYPES).optional(),
    university: z.string().optional(),
    prompt: z.string().min(1, "Prompt is required"),
    notes: z.string().optional(),
    submission: z.string().min(1, "Essay submission is required"),
  })
  .superRefine((data, ctx) => {
    if (IS_SUPPLEMENTAL(data.essayType)) {
      if (!data.wordCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Word count is required for Supplemental Essay",
          path: ["wordCount"],
        });
      }
      if (!data.university) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "University is required for Supplemental Essay",
          path: ["university"],
        });
      }
    }
    if (IS_LETTER(data.essayType) && !data.university) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "University is required for Letter of Continued Interest",
        path: ["university"],
      });
    }
  });

export type DraftFormValues = z.infer<typeof draftSchema>;
export type DraftFormProps = {
  form: UseFormReturn<DraftFormValues>;
  id: number;
  disabled?: boolean;
};
const parseDraftToForm = (draft: Draft): DraftFormValues => ({
  title: draft.title || "",
  essayType: draft.type?.essay || ESSAY_TYPES[0], // Default to first essay type if not set
  wordCount: draft.type?.wordCount,
  university: draft.type?.university || "",
  prompt: draft.questions.prompt || "",
  notes: draft.questions.notes || "",
  submission: draft.questions.submission || "",
});

export const ManageDraft = ({ id }: { id: number }) => {
  const draft = useDraftStore((state) => state.getDraft(id));
  const updateDraft = useDraftStore((state) => state.updateDraft);
  if (!draft) return null;

  const form = useForm<DraftFormValues>({
    resolver: zodResolver(draftSchema),
    defaultValues: parseDraftToForm(draft),
    values: parseDraftToForm(draft),
  });

  const onSubmit = (data: DraftFormValues) => {
    console.log("data", data);
    const updatedDraft = updateDraft(id, { ready: !draft.ready });
    console.log("updatedDraft", updatedDraft);
    if (draft.ready) {
      // db store stuff
      console.log(data);
    }
  };

  const CardSeparator = () => (
    <CardContent className="space-y-2">
      <Separator />
    </CardContent>
  );

  const formProps = { form, id, disabled: draft.ready };

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ManageHeader {...formProps} />
          <ManageType {...formProps} />
          <CardSeparator />
          <ManageQuestions {...formProps} />

          <CardFooter className="flex w-full justify-between">
            <FormStatus {...formProps} />
            <Button type="submit">{!draft.ready ? "Add" : "Edit"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const FormStatus = ({ form, id }: DraftFormProps) => {
  const draft = useDraftStore((state) => state.getDraft(id));

  return (
    <div>
      {Object.keys(form.formState.errors).length > 0 && (
        <p className="text-sm text-red-500">Please correct the errors above.</p>
      )}
      {draft?.ready && (
        <p className="text-sm text-green-500">Draft saved successfully!</p>
      )}
    </div>
  );
};
