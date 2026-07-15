import { ModeToggle } from "@/components/ui/mode-toggle";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  await auth.protect();
  return (
    <div>
      <h1>Hello World</h1>
      <ModeToggle />
      <UserButton />
    </div>
  );
}
