"use client";

import { useQuery } from "@tanstack/react-query";
import { LeadFields } from "../app/api/lead/notion";
import { LeadHandlerResponse } from "../app/api/lead/route";

type LeadQueryResponse =
  | { ready: true; data: LeadFields }
  | { ready: false; data: string };
export const useLeadQuery = (id: string | undefined): LeadQueryResponse => {
  if (!id) return { ready: false, data: "No id provided" };
  console.log("id", id);

  const query = useQuery({
    queryKey: ["lead data fetch", id as string],
    queryFn: () => fetch(`/api/lead?id=${id}`).then((res) => res.json()),
  });

  if (query.isLoading) return { ready: false, data: "Loading..." };

  const data = query.data as LeadHandlerResponse;
  const lead = data.data;

  // null lead means there was an error
  if (lead === null) return { ready: false, data: data.message };

  return { ready: true, data: lead };
};

// todo, add id checker component
