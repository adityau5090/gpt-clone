import { onBoard } from "@/features/auth/action/onboard";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import {ChatShell} from "@/features/conversation/components/chat-shell"


export default async function RootLayout({ children } : { children : React.ReactNode}){
    await auth.protect();
    await onBoard();

    return (
        <ChatShell>
            {children}
        </ChatShell>
    )

}