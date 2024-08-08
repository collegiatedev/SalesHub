import { NextPageProps, SearchParams, SESSION_KEY } from "~/app/constants";
import { EssayCart } from "./cart";
import { SetSession } from "../../../components/session";

export default function Cart({ searchParams }: NextPageProps) {
  const id = getSessionId(searchParams);
  console.log("gen", id);

  return (
    <>
      <EssayCart />
      <SetSession />
    </>
  );
}

const getSessionId = (searchParams?: SearchParams) => {
  return searchParams?.[SESSION_KEY] as string;
};
