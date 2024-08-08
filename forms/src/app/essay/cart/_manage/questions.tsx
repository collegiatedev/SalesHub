import { UseFormReturn } from "react-hook-form";
import { CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { DraftFormProps, DraftFormValues } from ".";
import { useDraftStore } from "../store";

export const ManageQuestions = ({ id, form, disabled }: DraftFormProps) => {
  const { updateDraft } = useDraftStore((state) => state);

  return (
    <CardContent className="space-y-2">
      <TextAreaField
        form={form}
        name="prompt"
        label="Prompt"
        placeholder="Paste the essay prompt here."
        disabled={disabled}
        onChange={(value) => updateDraft(id, { questions: { prompt: value } })}
      />
      <TextAreaField
        form={form}
        name="submission"
        label="Submission"
        placeholder="Paste your essay here."
        disabled={disabled}
        onChange={(value) =>
          updateDraft(id, { questions: { submission: value } })
        } // Update store on change
      />
      <TextAreaField
        form={form}
        name="notes"
        label="Notes"
        placeholder="Specify if there are any aspects you'd like help on."
        disabled={disabled}
        onChange={(value) => updateDraft(id, { questions: { notes: value } })}
      />
    </CardContent>
  );
};

interface TextAreaFieldProps {
  form: UseFormReturn<DraftFormValues>;
  name: keyof DraftFormValues;
  label: string;
  placeholder?: string;
  disabled?: boolean; // Add disabled prop
  onChange?: (value: string) => void; // Fix type of onChange
}
const TextAreaField = ({
  form,
  name,
  label,
  placeholder,
  disabled, // Add disabled prop
  onChange,
}: TextAreaFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e.target.value);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
