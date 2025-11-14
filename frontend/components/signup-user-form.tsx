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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import Link from "next/link"


interface ISignupUserFormProps {
  logInPath: string
}

export default function SignupUserForm({ logInPath }: ISignupUserFormProps) {
  const handleSubmit = async (e: any) => {
        e.preventDefault(); // spriječi reload

        const formData = new FormData(e.target);
        const entries = Object.fromEntries(formData.entries());

        console.log(entries);
    };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                <Input name="first_name" id="first-name" type="text" placeholder="Marko" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                <Input name="last_name" id="last-name" type="text" placeholder="Horvat" required />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="age">Age</FieldLabel>
                <Input name="age" id="age" type="number" placeholder="19" min={1} max={100} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="sex">Sex</FieldLabel>
                <Select name="sex">
                  <SelectTrigger id="sex">
                    <SelectValue placeholder="Choose sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="mail@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input name="password" id="password" type="password" placeholder="••••••" required />
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>
            {/* <Field>
                <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required />
                <FieldDescription>Please confirm your password.</FieldDescription>
            </Field> */}

            <FieldGroup>
              <FieldSet>
                <FieldLabel htmlFor="compute-environment-p8w">
                  I am a
                </FieldLabel>
                <FieldDescription>
                  Select the type of user you want to register as.
                </FieldDescription>
                <RadioGroup name="role" defaultValue="student">
                  <div className="grid grid-cols-2 gap-2">
                    <FieldLabel htmlFor="role-student">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Student</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="student" id="role-student" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="role-caretaker">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Caretaker</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="caretaker" id="role-caretaker" />
                      </Field>
                    </FieldLabel>
                  </div>
                </RadioGroup>
              </FieldSet>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <Button type="submit">Continue</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href={logInPath}>Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}