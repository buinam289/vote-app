"use server";

import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignOut() {
    await signOut();
    return redirect("/auth/signin");
}