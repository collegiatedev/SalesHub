// wierd rendering bug with textarea
import { UseFormReturn } from "react-hook-form";
import { CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { DraftFormValues } from ".";

export const ManageQuestions = ({
  form,
}: {
  form: UseFormReturn<DraftFormValues>;
}) => {
  return (
    <CardContent className="space-y-2">
      <TextAreaField
        form={form}
        name="prompt"
        label="Prompt"
        placeholder="Paste the essay prompt here."
      />
      <TextAreaField
        form={form}
        name="submission"
        label="Submission"
        placeholder="Paste your essay here."
      />
      <TextAreaField
        form={form}
        name="notes"
        label="Notes"
        placeholder="Specify if there are any aspects you'd like help on."
      />
    </CardContent>
  );
};
interface TextAreaFieldProps {
  form: UseFormReturn<DraftFormValues>;
  name: keyof DraftFormValues;
  label: string;
  placeholder?: string;
}
const TextAreaField = ({
  form,
  name,
  label,
  placeholder,
}: TextAreaFieldProps) => {
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
