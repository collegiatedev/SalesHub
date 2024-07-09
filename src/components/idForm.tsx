"use client";

import { useState, useEffect, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { LeadHandlerResponse } from "~/app/api/lead/route";
import { LeadFields } from "~/app/api/lead/notion";
import { Loader2 } from "lucide-react";

interface IdFormProps {
  id: string | null;
  children: (data: LeadFields) => ReactNode;
}
export const IdForm = ({ id, children }: IdFormProps) => {
  const FormSchema = z.object({
    id: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
    },
  });

  const [submittedId, setSubmittedId] = useState<string | null>(id);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadFields, setLeadFields] = useState<LeadFields | null>(null);
  // hides idForm until id fails to fetch
  const [firstRender, setFirstRender] = useState(true);

  const { data, isError, isFetching } = useQuery({
    queryKey: ["lead data fetch", submittedId],
    queryFn: () =>
      fetch(`/api/lead?id=${submittedId}`).then((res) => res.json()),
    enabled: !!submittedId,
    retry: false,
  });

  useEffect(() => {
    const leadData = data as LeadHandlerResponse;
    if (leadData) {
      if (leadData.data === null) {
        setErrorMessage(leadData.message);
        setFirstRender(false);
      } else {
        setErrorMessage(null);
        setLeadFields(leadData.data);
      }
    }
  }, [data]);

  const onSubmit = (submitData: z.infer<typeof FormSchema>) => {
    setSubmittedId(submitData.id);
  };

  if (firstRender && isFetching) {
    console.log("firstRender and isFetching", firstRender, isFetching);
    return <div>Loading...</div>;
  }
  return (
    <div>
      {!leadFields ? (
        <Form {...form}>
          <div className="flex flex-col items-center justify-center h-screen">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-3xl p-2">Accelerator Login</h1>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Student ID" {...field} autoFocus />
                    </FormControl>
                    <FormDescription>
                      Please contact Collegiate at +1 (925) 232-1238 if you need
                      any help.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <p className="text-red-500">Error fetching data</p>}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <Button type="submit" disabled={isFetching}>
                {isFetching && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </div>
        </Form>
      ) : (
        children(leadFields)
      )}
    </div>
  );
};
