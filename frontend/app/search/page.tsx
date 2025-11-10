"use client";

import { useSearchParams } from "next/navigation";
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
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { searchCaretakers } from "@/fetchers/users";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;


export default function SearchPage() {
    const params = useSearchParams();
    const q = params.get("q") ?? "";

    const { data, error, isLoading } = useSWR(q || null, (q) => searchCaretakers(q))

    const caretakerList = data ?? [];

    return (
        <div className="mx-auto max-w-2xl p-6 space-y-6">
            <SearchBar initial={q} />

            {error && (
                <Card className="border-red-400 bg-red-50">
                    <CardContent className="p-4 text-red-700">
                        <CardTitle className="text-lg">Backend error</CardTitle>
                        <p>Unable to fetch caretakers. Please try again later.</p>
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
                    <Card key={caretaker.user_id} >
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{caretaker.first_name} {caretaker.last_name}</CardTitle>
                            <CardDescription>Caretaker</CardDescription>
                            <CardAction>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Specialization:</CardDescription>
                                <p>{caretaker.specialisation}</p>
                                {caretaker.about_me?.trim() && (
                                    <>
                                        <br />
                                        <CardDescription>About me:</CardDescription>
                                        <p>{caretaker.about_me}</p>
                                    </>
                                )}
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <CardDescription>Telephone: </CardDescription>
                            <p>{caretaker.tel_num}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
