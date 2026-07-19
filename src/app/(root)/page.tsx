// import { ModeToggle } from "@/components/ui/mode-toggle";
import { auth } from "@clerk/nextjs/server";
// import { UserButton } from "@clerk/nextjs";
import { startNewChat } from "@/features/home/action/start-new-chat";
import { redirect } from "next/navigation";


export default async function Home() {
  await auth.protect();
  const conversationId = await startNewChat()

  redirect(`/c/${conversationId}`)
  
}
