import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import db from "@/lib/database";

import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const entries = await db
    .selectFrom("poop_log_entries")
    .selectAll()
    .where("owner_id", "=", user.id)
    .execute();

  return (
    <div className="flex flex-col pt-10 m-6">
      <div className="flex gap-6 items-center self-end mr-10">
        <p>Hey, {user.firstName}!</p>
        <SignOutButton />
      </div>
      <div className="flex items-center justify-center h-14">
        <h1 className="text-2xl font-bold text-white">Everybody Poops</h1>
      </div>
      <section className="mt-6 p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Dude Wipe Packs</h2>
        <div className="flex gap-6 items-center">
          <span className="text-white">Packages</span>
          <input
            className="form-input h-6 w-16 text-white bg-gray-700"
            type="number"
          />
        </div>
        <div className="flex gap-6 items-center mt-4">
          <span className="text-white">Pieces per Package</span>
        </div>
      </section>
      <div className="grid grid-cols-7 gap-6 mt-5">
        {days.map((day) => {
          const currentTimeStamp = Date.now();
          const today = days[new Date(currentTimeStamp).getDay()];

          return (
            <div className="p-4 rounded-lg bg-gray-800 text-center">
              <h3 className="text-white">{day}</h3>
              {entries.length > 0 &&
                entries.map((entry) => {
                  if (entry.day_of_week === day) {
                    return (
                      <div>
                        <p>Wipes used: {entry.wipes_used}</p>
                      </div>
                    );
                  }
                })}
              <button
                disabled={today !== day}
                className="mt-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200"
              >
                {day === today ? (
                  <Link href="/new-entry">
                    <span className="mx-1">Add Entry</span>
                  </Link>
                ) : (
                  "Add Entry"
                )}
              </button>
            </div>
          );
        })}
      </div>
      <section className="mt-6 p-4 rounded-lg bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-white">Progress Tracker</h2>
        <div className="h-2 bg-gray-400 rounded">
          <div className="h-2 bg-white rounded w-1/2" />
        </div>
      </section>
    </div>
  );
}
