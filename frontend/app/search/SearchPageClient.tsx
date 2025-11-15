"use client";

import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import SearchBar from "@/components/search-bar";
import { searchCaretakers } from "@/fetchers/users";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
// ostali importi...

export default function SearchPageClient() {
  const params = useSearchParams();
  const q = params.get("q");

  const { data, error } = q ? useSWR(q, (q) => searchCaretakers(q)) : useSWR("all", () => searchCaretakers(""))
  
  const caretakerList = data ?? [];

  return (
    <div>
      <SearchBar initial={q ?? ""} />
      <div className="grid gap-3">
        {caretakerList.map((caretaker) => (
          <Link key={caretaker.user_id} href={`/carefree/caretaker/${caretaker.user_id}`}>
            <Card>
              <CardHeader className="mt-1">
                <div className="flex ml-1">
                  <Avatar className="my-1 size-12">
                    <AvatarImage src={caretaker.user_image_url || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="mx-5 my-1">
                    <CardTitle className="text-xl font-semibold">{caretaker.first_name} {caretaker.last_name}</CardTitle>
                    <CardDescription>{caretaker.academic_title?.trim() || "Caretaker"}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <div className="mx-5">
                <Separator />
                <CardContent>
                  <CardDescription>Specialization:</CardDescription>
                  <p>{caretaker.specialisation}</p>
                  {caretaker.help_categories.length > 0 && (
                    <>
                      <CardDescription className="mt-4">Help categories:</CardDescription>
                      <p>{caretaker.help_categories.join(", ")}</p>
                    </>
                  )}
                  {caretaker.working_since && (
                    <>
                      <CardDescription className="mt-4">Working since:</CardDescription>
                      <p>{caretaker.working_since}</p>
                    </>
                  )}
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
