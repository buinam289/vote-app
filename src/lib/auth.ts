import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
    ],
    basePath: "/auth",
})

export async function getSessionUserId(): Promise<string | undefined> {
    const session = await auth();

    if (!session) {
        handleRedirection();
        return undefined; // Ensures the function exits after redirection
    }

    return session.user?.id;
}

function handleRedirection() {
    if (typeof window !== 'undefined') {
        // Client-side redirection
        window.location.href = '/auth/signin';
    } else {
        // Server-side redirection
        redirect('/auth/signin');
    }
}