import { UseFormReturn } from "react-hook-form";
import { DraftFormValues } from ".";
import { useEffect } from "react";
import { CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ESSAY_TYPES, WORD_COUNT_TYPES } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const ManageType = ({
  form,
}: {
  form: UseFormReturn<DraftFormValues>;
}) => {
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
