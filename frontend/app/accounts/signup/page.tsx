"use client"

import SignupCaretakerForm from "@/components/signup-caretaker-form";
import SignupUserForm from "@/components/signup-user-form";
import { use, useState } from "react";



export default function SignupPage() {
    const [step, setStep] = useState(1)
    const [userRole, setUserRole] = useState<string|null>(null)
    const [userId, setUserId] = useState<string>("")

    const onSignupComplete = (role: string, userId: string) => {
        setUserRole(role)
        setStep(2)
        setUserId(userId)
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {step === 1 ? (
                    <SignupUserForm logInPath="./login" onSignupComplete={onSignupComplete} />
                ) : (
                    userRole === "student" ? (
                        <p>student sign up</p>
                    ) : (
                        <SignupCaretakerForm userId={userId}/>
                    )
                )}
            </div>
        </div>
    )
}