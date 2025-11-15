"use client";

import Link from 'next/link'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MainPage() {
    return (
        <div className="min-h-screen min-w-[1200px] min-h-[800px] mx-auto">
            <div className="h-[5rem] p-[1em] flex justify-between bg-card shadow-sm shadow-primary" id="header">
                <div className="flex items-center gap-1"> 
                    <div  className="w-[3rem] h-auto">
                        <img src="/images/carefree-logo-assistant-new.png" alt="Carefree Logo"/>
                    </div>
                    <div>
                        <CardTitle className="p-1 text-3xl font-bold text-primary">CareFree</CardTitle>
                    </div>
                </div>
                <div className="p-[0.4em] flex rounded-full px-4 py-2 bg-background">
                    <CardContent className="flex">
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-primary" data-active href="">Home</Link>
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-primary" href="">Messages</Link>
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-primary" href="">Calendar</Link>
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-primary" href={`http://localhost:3001/search`}>Search</Link>
                    </CardContent>
                </div>
                <div className="p-[0.5em] rounded-full flex bg-background">
                    <Avatar className="size-8">
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardContent  className="my-1">
                        <Link className="font-semibold cursor-pointer hover:underline" href={`http://localhost:3001/carefree/myprofile`}>My Profile</Link>
                    </CardContent>
                </div>
            </div>
            <div className="flex gap-6 h-[calc(100vh-5rem)]">
                <div className="m-[0.8rem] flex flex-col gap-3 w-[23rem]">
                    <Card className="mb-[0.8rem] h-[10rem] py-[1.5rem] px-[1rem]">
                        <CardTitle>My Caretaker</CardTitle>
                    </Card>
                    <Card className="h-[63vh] py-[1.5rem] px-[1rem] flex-1">
                        <CardTitle>Latest Conversations</CardTitle>
                    </Card>
                </div>
                <div className="mr-[0.8rem] mt-3 flex flex-col flex-1 gap-3">
                    <div className="mb-[0.8rem] flex-1 rounded-md overflow-y-auto">

                    </div>
                    <InputGroup className="h-[3.2rem] mb-[0.8rem] shadow-sm shadow-primary bg-card">
                        <InputGroupInput></InputGroupInput>
                    </InputGroup>
                </div>
            </div>
        </div>
    )
}