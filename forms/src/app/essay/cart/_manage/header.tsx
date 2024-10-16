import { TrashIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CardTitle } from "~/components/ui/card";
import { FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useDraftStore } from "../../store";
import { DraftFormProps } from "./schema";
import { removeDraft } from "~/app/_actions/redis";
import { useSession } from "../../_base/session";

export const ManageTitle = (props: DraftFormProps) => {
  const { getDraftCount } = useDraftStore((state) => state);

  return (
    <CardTitle>
      <div className="flex w-full items-center">
        <TitleInput {...props} />
        {getDraftCount() > 1 && <DeleteDraftButton {...props} />}
      </div>
    </CardTitle>
  );
};

const DeleteDraftButton = ({ id, disabled }: DraftFormProps) => {
  const { deleteDraft } = useDraftStore((state) => state);
  const sessionId = useSession().sessionId;

  const withClick = async (id: number) => {
    deleteDraft(id);
    await removeDraft({ sessionId, draftId: id });
  };

  return (
    <Button
      disabled={disabled}
      className="hover:text-red-400 ml-2"
      size="icon"
      variant="ghost"
      onClick={() => withClick(id)}
    >
      <TrashIcon className="h-5 w-5 text-color-muted-foreground" />
    </Button>
  );
};

const TitleInput = ({ id, form, disabled }: DraftFormProps) => {
  const { updateDraft } = useDraftStore((state) => state);
  const draft = useDraftStore((state) => state.getDraft(id));
  if (!draft) return null;

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              {...field}
              placeholder="Untitled Draft"
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e);
                updateDraft(id, { title: e.target.value });
              }}
              className={`flex w-full bg-transparent border-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-2xl font-bold ${
                form.formState.errors.title &&
                "focus-visible:ring-2 focus-visible:ring-red-500"
              }`}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
