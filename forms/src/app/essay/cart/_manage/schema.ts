import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  ESSAY_TYPES,
  WORD_COUNT_TYPES,
  IS_SUPPLEMENTAL,
  IS_LETTER,
} from "../../../constants";
import { Draft } from "../store";

export const draftSchema = z
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

export const parseFormToDraft = (
  formValues: DraftFormValues,
  ready: boolean
): Draft => ({
  title: formValues.title,
  type: {
    essay: formValues.essayType,
    wordCount: formValues.wordCount,
    university: formValues.university,
  },
  questions: {
    prompt: formValues.prompt,
    notes: formValues.notes,
    submission: formValues.submission,
  },
  ready,
});

export const parseDraftToForm = (draft?: Draft): Partial<DraftFormValues> => ({
  title: draft?.title,
  essayType: draft?.type.essay,
  wordCount: draft?.type.wordCount,
  university: draft?.type.university,
  prompt: draft?.questions.prompt,
  notes: draft?.questions.notes,
  submission: draft?.questions.submission,
});
