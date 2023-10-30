import { User } from "@clerk/clerk-sdk-node";
import Link from "next/link";

import SignOutButton from "@/components/sign-out-button";

export default function Navbar({ user }: { user?: User }) {
  if (!user) {
    return (
      <div className="flex gap-6 justify-end items-center w-full mr-10"></div>
    );
  }
  return (
    <div className="flex w-2/3 gap-6 justify-end items-center ">
      <p>Hey, {user.firstName}!</p>
      <Link href="/dashboard">Home</Link>
      <SignOutButton />
    </div>
  );
}
