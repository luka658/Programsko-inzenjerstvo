"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import SearchBar from "@/components/search-bar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { searchCaretakers } from "@/fetchers/users";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function SearchPage() {
    const params = useSearchParams();
    const q = params.get("q") ?? "";
    const router = useRouter();

    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${BACKEND}/users/me/`, {
                    credentials: "include",
                });
                if (response.ok) {
                    setIsAuthed(true);
                } else {
                    setIsAuthed(false);
                    router.push("/accounts/login");
                }
            } catch (error) {
                setIsAuthed(false);
                router.push("/accounts/login");
            } finally {
                setAuthChecked(true);
            }
        })();
    }, [router]);

    const { data, error, isLoading } = useSWR(
        authChecked && isAuthed ? ["caretakerSearch", q ?? ""] : null,
        () => searchCaretakers(q ?? "")
    );

    const caretakerList = data ?? [];

    return (
        <div className="mx-auto max-w-2xl p-6 space-y-6">
            <SearchBar initial={q} />

            {error && (
                <Card className="border-red-400 bg-red-50">
                    <CardContent className="p-4 text-red-700">
                        <CardTitle className="text-lg">Backend error</CardTitle>
                        <p>Unable to fetch caretakers. Please try again later. The error is: {error.message}</p>
                    </CardContent>
                </Card>
            )}

            {q && caretakerList.length === 0 && !error && (
                <Card>
                    <CardContent>
                        <CardTitle>No matches for “{q}”.</CardTitle>
                    </CardContent>
                </Card>
            )}

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
                            </div>
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
                            <CardFooter className="flex gap-2">
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
