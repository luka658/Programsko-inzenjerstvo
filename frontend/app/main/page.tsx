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
        <div className="wrapper min-h-screen min-w-[1200px] min-h-[800px] mx-auto">
            <div className="header">
                <div className="flex items-center gap-1"> 
                    <div  className="logo">
                        <img src="/images/carefree-logo-assistant-new.png" alt="Carefree Logo"/>
                    </div>
                    <div className="title">
                        <CardTitle className="p-1 text-3xl font-bold">CareFree</CardTitle>
                    </div>
                </div>
                <div className="menu hidden md:flex rounded-full bg-[oklch(0.926_0.0278_185.55)] px-4 py-1">
                    <CardContent className="flex">
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-[oklch(0.783_0.1136_182.2)]" data-active href="">Home</Link>
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-[oklch(0.783_0.1136_182.2)]" href="">Messages</Link>
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-[oklch(0.783_0.1136_182.2)]" href="">Calendar</Link>
                        <Link className="mx-5 my-1 font-semibold hover:underline data-[active=true]:text-[oklch(0.783_0.1136_182.2)]" href={`http://localhost:3001/search`}>Search</Link>
                    </CardContent>
                </div>
                <div className="myprofile rounded-full flex">
                    <Avatar className="size-8">
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardContent  className="my-1">
                        <Link className="font-semibold cursor-pointer hover:underline" href={`http://localhost:3001/myprofile`}>My Profile</Link>
                    </CardContent>
                </div>
            </div>
            <div className="main flex gap-6 h-[calc(100vh-5rem)]">
                <div className="aside flex flex-col gap-3 w-[23rem]">
                    <Card className="myCaretakerCard">
                        <CardTitle>My Caretaker</CardTitle>
                    </Card>
                    <Card className="latestConvosCard flex-1">
                        <CardTitle>Latest Conversations</CardTitle>
                    </Card>
                </div>
                <div className="chat mt-3 flex flex-col flex-1 gap-3">
                    <div className="chatbox flex-1 rounded-md bg-[oklch(0.926_0.0278_185.55)] overflow-y-auto">

                    </div>
                    <InputGroup className="chatbar">
                        <InputGroupInput></InputGroupInput>
                    </InputGroup>
                </div>
            </div>
        </div>
    )
}