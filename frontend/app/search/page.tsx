// app/search/page.tsx
import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
