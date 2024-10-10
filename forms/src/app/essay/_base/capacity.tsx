"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { successfulToast } from "~/components/myToast";
import { addToWaitingList } from "~/app/_actions/redis";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function CapacityForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: z.infer<typeof formSchema>) {
    await addToWaitingList({ email });
    successfulToast("You've been added to the waiting list!");
    setSubmitted(true);
  }

  return (
    <Card className="bg-[#E8E8E3]">
      <CardHeader>
        <CardTitle>No Spots Available</CardTitle>
        <CardDescription>
          We've reached our maximum capacity available for now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email to join the waiting list"
                        disabled={submitted}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={submitted}
              >
                {submitted ? "Joined" : "Join"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
