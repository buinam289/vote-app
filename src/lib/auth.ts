import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/utils";


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Facebook,
        Google,
        GitHub
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