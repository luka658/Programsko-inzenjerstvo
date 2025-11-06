"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

export default function SignupPage() {
  const router = useRouter();
  
  // State za svako polje
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          username, 
          age: parseInt(age), 
          sex 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        
        router.push("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to sign up</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Field>

                {/* Username */}
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Field>

                {/* Password */}
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Field>

                {/* Age */}
                <Field>
                  <FieldLabel htmlFor="age">Age</FieldLabel>
                  <Input
                    id="age"
                    type="number"
                    placeholder="18"
                    required
                    min={1}
                    max={120}
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                </Field>

                {/* Sex */}
                <Field>
                  <FieldLabel>Sex</FieldLabel>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={sex === "Male"}
                        onChange={e => setSex(e.target.value)}
                        required
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={sex === "Female"}
                        onChange={e => setSex(e.target.value)}
                        required
                      />
                      Female
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sex"
                        value="Other"
                        checked={sex === "Other"}
                        onChange={e => setSex(e.target.value)}
                        required
                      />
                      Other
                    </label>
                  </div>
                </Field>

                  {/* Submit button */}
                <Field>
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                  <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="underline hover:text-primary">
                      Login
                    </a>
                  </p>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}