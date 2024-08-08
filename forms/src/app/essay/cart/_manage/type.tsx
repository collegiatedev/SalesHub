import { UseFormReturn } from "react-hook-form";
import { DraftFormProps, DraftFormValues } from ".";
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

export const ManageType = ({ form, disabled }: DraftFormProps) => {
  const essayType = form.watch("essayType");
  const IS_SUPPLEMENTAL = essayType === "Supplemental Essay";
  const IS_LETTER = essayType === "Letter of Continued Interest";

  useEffect(() => {
    if (!IS_SUPPLEMENTAL) form.setValue("wordCount", undefined);
    if (!IS_SUPPLEMENTAL && !IS_LETTER) form.setValue("university", "");
  }, [essayType, form]);

  return (
    <CardContent className="space-y-4">
      <div className="flex flex-row space-x-4">
        <FormInputSelect
          form={form}
          disabled={disabled}
          name="essayType"
          label="Essay Type"
          types={ESSAY_TYPES}
        />
        {IS_SUPPLEMENTAL && (
          <FormInputSelect
            form={form}
            disabled={disabled}
            name="wordCount"
            label="Word Count"
            types={WORD_COUNT_TYPES}
          />
        )}
      </div>

      {(IS_SUPPLEMENTAL || IS_LETTER) && (
        <FormField
          control={form.control}
          disabled={disabled}
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

interface FormInputSelectProps<T extends string> {
  form: UseFormReturn<DraftFormValues>;
  name: keyof DraftFormValues;
  label: string;
  types: readonly T[];
  disabled?: boolean;
}
const FormInputSelect = <T extends string>({
  form,
  name,
  label,
  types,
  disabled,
}: FormInputSelectProps<T>) => (
  <FormField
    control={form.control}
    disabled={disabled}
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
