"use client";

import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import SearchBar from "@/components/search-bar";
import { searchCaretakers } from "@/fetchers/users";
// ostali importi...

export default function SearchPageClient() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const { data, error } = useSWR(q || null, (q) => searchCaretakers(q))
  const caretakerList = data ?? [];

  return (
    <div>
      <SearchBar initial={q} />
      {/* ostatak UI logike */}
    </div>
  );
}
