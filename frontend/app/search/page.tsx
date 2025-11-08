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

const BACKEND = "http://localhost:8000";

export default function SearchPage() {
    const params = useSearchParams();
    const q = params.get("q") ?? "";

    const { data, error } = useSWR(
        q ? `${BACKEND}/users/caretakers/search?q=${encodeURIComponent(q)}` : null,
        (url) => fetch(url).then((r) => r.json())
    );

    const list = data ?? [];

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

            {q && list.length === 0 && !error && (
                <Card>
                    <CardContent>
                        <CardTitle>No matches for “{q}”.</CardTitle>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-3">
                {list.map((p: any, i: number) => (
                    <Card key={p.id ?? i} >
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{p.first_name} {p.last_name}</CardTitle>
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
                                <p>{p.specialisation}</p>
                                {p.about_me?.trim() && (
                                    <>
                                        <br />
                                        <CardDescription>About me:</CardDescription>
                                        <p>{p.about_me}</p>
                                    </>
                                )}
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <CardDescription>Telephone: </CardDescription>
                            <p>{p.tel_num}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
