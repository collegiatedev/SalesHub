// wierd rendering bug with textarea
import { useState, useEffect } from "react";
import { TrashIcon } from "lucide-react";
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
import { ESSAY_TYPES, WORD_COUNT_TYPES } from "./constants";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useDraftStore } from "./store";

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
    if (data.essayType === "Supplemental Essay") {
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
    if (data.essayType === "Letter of Continued Interest" && !data.university) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "University is required for Letter of Continued Interest",
        path: ["university"],
      });
    }
  });

type DraftFormValues = z.infer<typeof draftSchema>;

export const ManageDraft = ({ id }: { id: number }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const draft = useDraftStore((state) => state.getDraft(id));
  const updateDraft = useDraftStore((state) => state.updateDraft);
  if (!draft) return null;

  const form = useForm<DraftFormValues>({
    resolver: zodResolver(draftSchema),
    defaultValues: {
      title: draft.title || "",
      essayType: draft.type?.essay,
      wordCount: draft.type?.wordCount,
      university: "",
      prompt: "",
      notes: "",
      submission: "",
    },
  });

  const onSubmit = (data: DraftFormValues) => {
    const updatedDraft = {
      ...draft,
      title: data.title,
      type: {
        essay: data.essayType,
        wordCount: data.wordCount,
      },
      ready: true,
    };
    updateDraft(id, updatedDraft);
    setIsSubmitted(true);
  };

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ManageHeader form={form} id={id} />
          <ManageType form={form} />
          <CardContent className="space-y-2">
            <Separator />
          </CardContent>
          <ManageQuestions form={form} />

          <CardFooter className="flex w-full justify-between">
            <div>
              {Object.keys(form.formState.errors).length > 0 && (
                <p className="text-sm text-red-500">
                  Please correct the errors above.
                </p>
              )}
              {isSubmitted && (
                <p className="text-sm text-green-500">
                  Draft saved successfully!
                </p>
              )}
            </div>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const ManageHeader = ({
  id,
  form,
}: {
  id: number;
  form: UseFormReturn<DraftFormValues>;
}) => {
  const { updateDraft, deleteDraft, getDraftCount } = useDraftStore(
    (state) => state
  );
  const setTitle = (title: string) => updateDraft(id, { title });

  return (
    <CardHeader>
      <CardTitle>
        <div className="flex w-full items-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    className={`flex w-full bg-transparent border-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-2xl font-bold ${
                      form.formState.errors.title ? "ring-2 ring-red-500" : ""
                    }`}
                    placeholder="Untitled Draft"
                    onChange={(e) => {
                      field.onChange(e); // Call the field's onChange
                      setTitle(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {getDraftCount() > 1 && (
            <Button
              className="hover:text-red-400 ml-2"
              size="icon"
              variant="ghost"
              onClick={() => deleteDraft(id)}
            >
              <TrashIcon className="h-5 w-5 text-color-muted-foreground" />
            </Button>
          )}
        </div>
      </CardTitle>
    </CardHeader>
  );
};

const ManageType = ({ form }: { form: UseFormReturn<DraftFormValues> }) => {
  const essayType = form.watch("essayType");

  useEffect(() => {
    if (essayType !== "Supplemental Essay") {
      form.setValue("wordCount", undefined);
    }
    if (
      essayType !== "Supplemental Essay" &&
      essayType !== "Letter of Continued Interest"
    ) {
      form.setValue("university", "");
    }
  }, [essayType, form]);

  return (
    <CardContent className="space-y-4">
      <div className="flex flex-row space-x-4">
        <FormInputSelect
          form={form}
          name="essayType"
          label="Essay Type"
          types={ESSAY_TYPES}
        />
        {essayType === "Supplemental Essay" && (
          <FormInputSelect
            form={form}
            name="wordCount"
            label="Word Count"
            types={WORD_COUNT_TYPES}
          />
        )}
      </div>

      {(essayType === "Supplemental Essay" ||
        essayType === "Letter of Continued Interest") && (
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Which school is this essay for?"
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </CardContent>
  );
};

const FormInputSelect = <T extends string>({
  form,
  name,
  label,
  types,
}: {
  form: UseFormReturn<DraftFormValues>;
  name: keyof DraftFormValues;
  label: string;
  types: readonly T[];
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);

const ManageQuestions = ({
  form,
}: {
  form: UseFormReturn<DraftFormValues>;
}) => {
  interface TextAreaFieldProps {
    name: keyof DraftFormValues;
    label: string;
    placeholder?: string;
  }
  const TextAreaField = ({ name, label, placeholder }: TextAreaFieldProps) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder={placeholder} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  return (
    <CardContent className="space-y-2">
      <TextAreaField
        name="prompt"
        label="Prompt"
        placeholder="Paste the essay prompt here."
      />
      <TextAreaField
        name="submission"
        label="Submission"
        placeholder="Paste your essay here."
      />
      <TextAreaField
        name="notes"
        label="Notes"
        placeholder="Specify if there are any aspects you'd like help on."
      />
    </CardContent>
  );
};
