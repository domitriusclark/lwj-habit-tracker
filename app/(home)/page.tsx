import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 home">
      <Link
        href="/sign-in"
        className="mt-4 inline-flex items-center px-4 py-2 border border-zinc-200 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#bd1e59] hover:bg-[#9e1650] dark:border-zinc-800"
      >
        Sign In
      </Link>
    </main>
  );
}
