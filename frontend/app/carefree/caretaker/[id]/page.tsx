"use client";

import * as React from 'react'
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { searchCaretakerById } from "@/fetchers/users"
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ShowCaretakerInfo({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params)
    const { data, error, isLoading } = useSWR(id || null, (id) => searchCaretakerById(id))

    const caretaker = data ?? "";
    console.log("API response:", caretaker);

    return (
        <div className="mx-auto mt-9 max-w-2xl p-6 space-y-3">
            {error && (
                <Card className="border-red-400 bg-red-50">
                    <CardContent className="p-4 text-red-700">
                        <CardTitle className="text-lg">Backend error</CardTitle>
                        <p>Unable to fetch caretakers. Please try again later.</p>
                    </CardContent>
                </Card>
            )}

            {caretaker !== "" && id && (
                <>
                    <div className="">
                        <Card>
                            <div className="flex ml-7">
                                <Avatar className="my-1 size-20">
                                    <AvatarImage src={caretaker.user_image_url || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="mx-6 my-5">
                                    <CardTitle className="text-3xl font-semibold">{caretaker.first_name} {caretaker.last_name}</CardTitle>
                                    <CardDescription className="mt-[4px] text-base">{caretaker.academic_title?.trim() || "Caretaker"}</CardDescription>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="max-h-80 mt-5 grid gap-3 grid-cols-2 grid-rows-2">
                        <Card className="row-start-1 row-end-3">
                            <CardContent>
                                <CardTitle className="text-lg">Specialization:</CardTitle>
                                <p className="mt-1">{caretaker.specialisation}</p>
                                <CardTitle className="text-lg mt-5">Help categories:</CardTitle>
                                <p className="mt-1">{caretaker.help_categories}</p>
                                <CardTitle className="text-lg mt-5">About me:</CardTitle>
                                <p className="mt-1">{caretaker.about_me}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle className="text-lg">Telephone:</CardTitle>
                                <p className="mt-1">{caretaker.tel_num}</p>
                                <CardTitle className="text-lg mt-5">Office address:</CardTitle>
                                <p className="mt-1">{caretaker.office_address}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle className="text-lg">Working since:</CardTitle>
                                <p className="mt-1">{caretaker.working_since}</p>
                            </CardContent>

                        </Card>
                    </div>
                </>
            )}
        </div>
    )
}