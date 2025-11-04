import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 


export default function Home() {

  return (
    <>
      <div className="flex flex-row">
        Hello World!
        <Button>Button</Button>
        <Label> in paris
        </Label>
      </div>
    </>
  );
}