import { notionClient } from "~/lib/clients";

export const getLead = async (leadId: string) => {
  const LEAD_DATABASE_ID = "27386326248f4dae9374811627be3036";
  const response = await notionClient.databases.query({
    database_id: LEAD_DATABASE_ID,
    page_size: 1,
    filter: {
      property: "id",
      rich_text: {
        equals: leadId,
      },
    },
  });

  // need to text number if no error
  if (response.results.length === 0) throw new Error(`Invalid ID: ${leadId}`);

  // @ts-ignore
  // notion's response is not typed correctly
  // return parseLeadResponse(response.results[0].properties);
  return parseLeadResponse(response.results[0].properties);
};

// might need to extend
const parseLeadResponse = (properties: any): LeadFields => {
  return {
    id: properties.id.rich_text[0].plain_text,
    name: properties["Student Name"].title[0].plain_text,
    status: properties.Status.select.name,
    grade: properties.Grade.select.name,
    school: properties.School.rich_text[0].plain_text,
    major: properties.Major.rich_text[0].plain_text,
    contact: {
      studentEmail: properties["Student's Email"].email,
      studentPhone: properties["Student's Phone"].phone_number,
      parentEmail: properties["Parent's Email"].email,
      parentPhone: properties["Parent's Phone"].phone_number,
      parentName: properties["Parent Name"].rich_text[0].plain_text,
    },
    pageRefs: {
      leadRep: properties["Lead Rep"].relation[0]?.id,
      moduleRep: properties["Module Rep"].relation[0]?.id,
      dashboard: properties.Dashboard.relation[0]?.id,
    },
    otherRefs: {
      dbRef: properties["db-ref"].rich_text[0]?.plain_text,
      folderRef: properties["folder-ref"].rich_text[0]?.plain_text,
    },
  };
};
export type LeadFields = {
  id: string;
  name: string;
  status: string;
  grade: string;
  school: string;
  major: string;
  contact: ContactFields;
  pageRefs: Partial<PageRefs>;
  otherRefs: Partial<OtherRefs>;
};
type PageRefs = {
  leadRep: string;
  moduleRep: string;
  dashboard: string;
};
type OtherRefs = {
  dbRef: string;
  folderRef: string;
};
type ContactFields = {
  studentEmail: string;
  studentPhone: string;
  parentEmail: string;
  parentPhone: string;
  parentName: string;
};
