import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
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

export async function getSessionUserId(): Promise<string | null> {
    const session = await auth();

    if (!session) {
        handleRedirection();
        return null
    }

    return session.user?.id ?? null;
}

function handleRedirection() {
    if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
    }
    // server redirection is handled by middleware.ts
}