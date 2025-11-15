"use client";

import { Search } from "lucide-react";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group";

export default function SearchBar({ initial = "" }: { initial: string }) {
    return (
        <form action="/search" method="get" className="w-full">
            <InputGroup className="h-12">
                <InputGroupAddon align="inline-start">
                    <Search className="opacity-70" />
                </InputGroupAddon>

                <InputGroupInput name="q" defaultValue={initial} placeholder="Search for caretaker…" aria-label="Search"/>

                <InputGroupAddon align="inline-end">
                    <InputGroupButton type="submit">Search</InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </form>
    );
}
