import { TrashIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { CardHeader, CardTitle } from "~/components/ui/card";
import { FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useDraftStore } from "../store";
import { DraftFormProps } from ".";

export const ManageHeader = ({ id, form, disabled }: DraftFormProps) => {
  const { deleteDraft, getDraftCount, updateDraft } = useDraftStore(
    (state) => state
  );

  return (
    <CardHeader>
      <CardTitle>
        <div className="flex w-full items-center">
          <FormField
            control={form.control}
            disabled={disabled}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    className={`flex w-full bg-transparent border-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-2xl font-bold ${
                      form.formState.errors.title ? "ring-2 ring-red-500" : ""
                    }`}
                    placeholder="Untitled Draft"
                    onChange={(e) => {
                      field.onChange(e);
                      updateDraft(id, { title: e.target.value });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {getDraftCount() > 1 && (
            <Button
              className="hover:text-red-400 ml-2"
              size="icon"
              variant="ghost"
              onClick={() => deleteDraft(id)}
            >
              <TrashIcon className="h-5 w-5 text-color-muted-foreground" />
            </Button>
          )}
        </div>
      </CardTitle>
    </CardHeader>
  );
};
