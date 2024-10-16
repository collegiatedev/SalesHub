import { notionClient, LEAD_DATABASE_ID } from "../../constants";

export const getLead = async (leadId: string) => {
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

  // need to text number if no id error
  if (response.results.length === 0) throw new Error(`Invalid ID: ${leadId}`);

  return parseLeadResponse(
    // @ts-ignore
    // notion's response properties is not typed correctly
    response.results[0].properties,
    response.results[0]!.id
  );
};

// might need to extend
const parseLeadResponse = (properties: any, pageId: string): LeadFields => {
  return {
    pageId,
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
  pageId: string;
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
