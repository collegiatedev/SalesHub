import { UseFormReturn } from "react-hook-form";
import { CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  ESSAY_TYPES,
  IS_LETTER,
  IS_SUPPLEMENTAL,
  WORD_COUNT_TYPES,
} from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useDraftStore } from "../store";
import { DraftFormProps, DraftFormValues } from "./schema";

export const ManageType = ({ id, form, disabled }: DraftFormProps) => {
  const { updateDraft } = useDraftStore((state) => state);
  const draft = useDraftStore((state) => state.getDraft(id));
  if (!draft) return null;

  const essayType = draft.type?.essay;
  return (
    <CardContent className="space-y-4">
      <div className="flex flex-row space-x-4">
        <FormSelect
          form={form}
          disabled={disabled}
          name="essayType"
          label="Essay Type"
          types={ESSAY_TYPES}
          onChange={(v) => updateDraft(id, { type: { essay: v } })}
        />
        {IS_SUPPLEMENTAL(essayType) && (
          <FormSelect
            form={form}
            disabled={disabled}
            name="wordCount"
            label="Word Count"
            types={WORD_COUNT_TYPES}
            onChange={(v) => updateDraft(id, { type: { wordCount: v } })}
          />
        )}
      </div>

      {(IS_SUPPLEMENTAL(essayType) || IS_LETTER(essayType)) && (
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="Which school is this essay for?"
                  onChange={(e) => {
                    field.onChange(e);
                    updateDraft(id, { type: { university: e.target.value } });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </CardContent>
  );
};

interface FormSelectProps<T extends string> {
  form: UseFormReturn<DraftFormValues>;
  name: keyof DraftFormValues;
  label: string;
  types: readonly T[];
  disabled?: boolean;
  onChange?: (value: T) => void;
}
const FormSelect = <T extends string>({
  form,
  name,
  label,
  types,
  disabled,
  onChange,
}: FormSelectProps<T>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full" key={name}>
        <FormLabel>{label}</FormLabel>
        <Select
          {...field}
          disabled={disabled}
          onValueChange={(value: T) => {
            field.onChange(value);
            if (onChange) onChange(value);
          }}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type} disabled={disabled}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);
