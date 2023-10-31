"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => signOut(() => router.push("/"))}
      className="inline-flex items-center px-4 py-2 border border-zinc-200 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 dark:border-zinc-800"
    >
      Logout
    </button>
  );
}
