import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";

const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid"),
  phoneNumber: z.string().min(7, "Invalid"), // todo, validation regex
});

interface PersonalInfoProps {
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PersonalInfo = ({
  valid,
  setValid,
}: PersonalInfoProps): React.ReactElement => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // add save logic
    if (!valid) {
      console.log(data);
    }
    setValid(!valid);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personal Info</CardTitle>
        <CardDescription>Who should we send the essay to?</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-row space-x-4">
                <FormInputField
                  form={form}
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  disabled={valid}
                />
                <FormInputField
                  form={form}
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  disabled={valid}
                />
              </div>
              <div className="flex flex-row space-x-4">
                <FormInputField
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="@"
                  disabled={valid}
                />
                <FormInputField
                  form={form}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="+"
                  disabled={valid}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {Object.keys(form.formState.errors).length > 0 && (
                <p className="text-sm text-red-500">
                  Please correct the errors above.
                </p>
              )}
            </div>
            <Button>{!valid ? "Continue" : "Edit"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

interface FormInputFieldProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}
const FormInputField = ({
  form,
  name,
  label,
  placeholder,
  disabled,
}: FormInputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>
            {label}
            {form.formState.errors[name] && (
              <span className="ml-1 text-sm text-red-500">
                ({form.formState.errors[name]?.message as string})
              </span>
            )}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} disabled={disabled} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
