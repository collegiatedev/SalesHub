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
import { useSession } from "../session";
import { savePersonalInfo } from "~/app/_actions/redis";

const personalSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid"),
  phoneNumber: z.string().min(7, "Invalid"), // todo, validation regex
});
export type PersonalInfo = z.infer<typeof personalSchema>;

interface PersonalInfoProps {
  completedState: {
    completedPersonal: boolean;
    setCompletedPersonal: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
export const PersonalInfoForm = ({
  completedState: { completedPersonal, setCompletedPersonal },
}: PersonalInfoProps): React.ReactElement => {
  const { session, sessionId } = useSession();

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalSchema),
    // Setting default values to ensure consistent input handling as controlled components.
    defaultValues: {
      firstName: session.personal?.firstName ?? "",
      lastName: session.personal?.lastName ?? "",
      email: session.personal?.email ?? "",
      phoneNumber: session.personal?.phoneNumber ?? "",
    },
  });

  const onSubmit = async (data: PersonalInfo) => {
    if (!completedPersonal)
      await savePersonalInfo({ sessionId, personal: data });
    setCompletedPersonal(!completedPersonal);
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
                  disabled={completedPersonal}
                />
                <FormInputField
                  form={form}
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  disabled={completedPersonal}
                />
              </div>
              <div className="flex flex-row space-x-4">
                <FormInputField
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="@"
                  disabled={completedPersonal}
                />
                <FormInputField
                  form={form}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="+"
                  disabled={completedPersonal}
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
            <ContinueButton state={completedPersonal} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
const ContinueButton = ({ state }: { state: boolean }) => {
  const buttonText = state ? "Edit" : "Continue";
  const buttonVariant = state ? "secondary" : "default";
  return <Button variant={buttonVariant}>{buttonText}</Button>;
};

interface FormInputFieldProps {
  form: UseFormReturn<z.infer<typeof personalSchema>>;
  name: keyof z.infer<typeof personalSchema>;
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
