import { generatorEndpoint } from "../../helpers";

type PostC1Info = {
  studentName: string;
  infoId: string;
  activities: string;
  pronunciation: string;
  pronouns: string;
  intended: string;
  plans: string;
  profile: string;
  additional: string;
};
export const c1Debrief = async (body: PostC1Info) =>
  await generatorEndpoint({
    route: "/info/c1",
    body,
  });

type PostC2Info = {
  studentName: string;
  infoId: string;
  repName: string;
  type: string;
  challenges: string;
  value: string;
  alternatives: string;
};
export const c2Debrief = async (body: PostC2Info) =>
  await generatorEndpoint({
    route: "/info/c2",
    body,
  });
