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
