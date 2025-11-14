"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"


interface ISignupStudentFormProps {
    userId: string
}

export default function SignupStudentForm({ userId }: ISignupStudentFormProps) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        // setError(null)

        try {
            const formData = new FormData(e.currentTarget)
            const payload = Object.fromEntries(formData.entries())

            console.log("payload: ", payload)

            const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/student/`

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId, ...payload }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(
                    errorData.detail || errorData.error || "Registration failed"
                )
            }

            const data = await response.json();
            console.log(data);

            // onSignupComplete(payload.role as string, data.id)
            console.log("success")
            router.push("/accounts/login");
        } catch (err) {
            // setError(err instanceof Error ? err.message : "An error occurred")
            console.error("Signup error:", err)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student</CardTitle>
                <CardDescription>
                    Complete your student account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="studying-at">Studying At</FieldLabel>
                            <Input
                                name="studying_at"
                                id="studying-at"
                                type="text"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="year-of-study">Year Of Study</FieldLabel>
                            <Input
                                name="year_of_study"
                                id="year-of-study"
                                type="number"
                                required
                            />
                        </Field>
                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary has-aria-checked:bg-primary/10 dark:has-aria-checked:border-primary dark:has-aria-checked:bg-primary/20">
                            <Checkbox
                                id="is-anonymus"
                                defaultChecked
                                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Stay Anonymous  
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    If enabled, only your sex and age will be visible to the caretaker. You can change this anytime.
                                </p>
                            </div>
                        </Label>
                        <FieldGroup>
                            <Field>
                                <Button type="submit" disabled={isLoading}>Complete account setup</Button>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}