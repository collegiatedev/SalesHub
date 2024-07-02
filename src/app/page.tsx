"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // default to c1 form
  useEffect(() => {
    const searchParamsString = searchParams.toString();
    const newUrl = searchParamsString ? `/c1?${searchParamsString}` : "/c1";
    router.push(newUrl);
  }, [router, searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main />
    </Suspense>
  );
}
