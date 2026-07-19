"use server"

import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function requireUser() {
    const { userId } = await auth.protect();

      console.log("Clerk userId:", userId);
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if(!user){
        throw new Error("User not found.")
    }

    console.log("Database user:", user);
    return user;
}