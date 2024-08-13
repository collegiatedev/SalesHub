import { Button } from "~/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { useDraftStore } from "../../store";
import { ManageTitle } from "./header";
import { ManageType } from "./type";
import { ManageQuestions } from "./questions";
import {
  DraftFormValues,
  draftSchema,
  DraftFormProps,
  parseDraftToForm,
} from "./schema";
import { successfulToast } from "~/components/myToast";
import { saveDraft } from "~/app/_actions/redis";
import { useSession } from "../../session";
import { IS_SUPPLEMENTAL } from "../../../constants";
import { toast } from "sonner";

export const ManageDraft = ({ id }: { id: number }) => {
  const { sessionId } = useSession();
  const updateDraft = useDraftStore((state) => state.updateDraft);
  const draft = useDraftStore((state) => state.getDraft(id));

  const form = useForm<DraftFormValues>({
    resolver: zodResolver(draftSchema),
    defaultValues: parseDraftToForm(draft),
  });
  if (!draft) return null;

  const onSubmit = async (data: DraftFormValues) => {
    const wc = IS_SUPPLEMENTAL(data.essayType) ? `(${data.wordCount}) ` : "";
    const draftName = ` ${data.essayType} ${wc}`;
    if (!draft.ready) {
      toast.dismiss();
      successfulToast(`Added${draftName}to Cart!`);
      // save session to db
      await saveDraft({
        draftId: id,
        sessionId,
        draft: { ...draft, ready: true },
      });
    } else {
      toast.dismiss();
      toast.message(`Removed${draftName}from Cart!`);
    }

    updateDraft(id, { ready: !draft.ready });
  };

  const CardSeparator = () => (
    <CardContent className="space-y-2">
      <Separator />
    </CardContent>
  );

  const formProps = { form, id, disabled: draft.ready };
  return (
    <Card className="w-full">
      <Form {...form} key={id}>
        <form onSubmit={form.handleSubmit(onSubmit)} key={id}>
          <CardHeader>
            <ManageTitle {...formProps} />
          </CardHeader>
          <ManageType {...formProps} />
          <CardSeparator />
          <ManageQuestions {...formProps} />

          <CardFooter className="flex w-full justify-between">
            <FormStatus {...formProps} />
            <Button type="submit" key={id}>
              {!draft.ready ? "Add" : "Edit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const FormStatus = ({ form }: DraftFormProps) => {
  return (
    <div>
      {Object.keys(form.formState.errors).length > 0 && (
        <p className="text-sm text-red-500">Please correct the errors above.</p>
      )}
    </div>
  );
};
