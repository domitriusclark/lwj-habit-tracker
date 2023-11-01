import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex text-center md:text-start min-h-screen flex-col justify-center items-center pb-32 home gap-4">
        <p className="text-5xl md:text-8xl tracking-tighter pl-10">
          Never Run Out of Dude Wipes with
        </p>
        <p className="text-4xl md:text-7xl bg-zinc-950 text-cyan-300 p-2 md:p-3">
          Dude, Where&apos;s My Wipes?
        </p>
        <Link
          href="/sign-in"
          className="inline-flex items-center px-24 py-4 mt-4 border border-zinc-200 border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 dark:border-zinc-800"
        >
          Get Started
        </Link>
      </main>
    </>
  );
}
