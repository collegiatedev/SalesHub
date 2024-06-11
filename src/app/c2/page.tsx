"use client";

import { Suspense, useState } from "react";
import { CalC2 } from "./_components/cal";
import { TallyC2 } from "./_components/tally";
import { useSearchParams } from "next/navigation";
import { InvalidLink } from "@/src/components/invalidLink";

export default function C2() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <C2Content />
      </Suspense>
    </main>
  );
}

function C2Content() {
  const [pageNumber, setPageNumber] = useState(0);
  const params = useSearchParams();
  const id = params.get("id");
  const fullname = params.get("fullname");
  const grade = params.get("grade");

  if (!id || !fullname || !grade) return <InvalidLink />;
  return (
    <>
      {/* if page id > "x" then display both tally and cal from the modules */}
      {pageNumber < 4 || pageNumber === 9 ? ( //need to change this logic
        <div>
          <TallyC2
            id={id}
            name={fullname.split(" ")[0]}
            grade={grade}
            setPageNumber={setPageNumber}
          />
        </div>
      ) : (
        <div>
          <TallyC2
            id={id}
            name={fullname.split(" ")[0]}
            grade={grade}
            setPageNumber={setPageNumber}
          />
          <CalC2 id={id} name={fullname} pageNumber={pageNumber} />
        </div>
      )}
    </>
  );
}
