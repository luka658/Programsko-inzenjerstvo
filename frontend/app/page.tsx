import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-3xl mb-5">Welcome to Carefree!</h1>
        
        <div className="space-x-2">
          <Button asChild><Link href="/accounts/login">Login</Link></Button>
          <Button asChild><Link href="/accounts/signup">Sign Up</Link></Button>
        </div>
      </div>
    </div>
  );
}