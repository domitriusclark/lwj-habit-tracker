import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import db from "@/lib/database";

import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";
import WipeCounter from "./wipe-counter";

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

  const packCount = await db
    .selectFrom("wipe_count")
    .where("owner_id", "=", user.id)
    .select("total_wipes")
    .executeTakeFirst();

  function sumEntries(entries: any[]): number {
    let sum = 0;
    for (const entry of entries) {
      sum += entry.value;
    }
    return sum;
  }

  const total =
    packCount &&
    typeof packCount.total_wipes === "number" &&
    packCount.total_wipes;

  function calculateTotalWipes() {
    let totalWipes: number;
    if (typeof total === "number") {
      totalWipes = total * 30;

      entries.forEach((entry) => {
        if (typeof entry.wipes_used === "number") {
          totalWipes -= entry.wipes_used;
        }
      });

      if (totalWipes < 0) {
        return 0;
      }
      return totalWipes;
    }
  }

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
        {typeof total === "number" ? (
          <WipeCounter wipes={total} sumEntries={sumEntries(entries)} />
        ) : null}
        {typeof total === "number" && total === 0 && (
          <div className="flex gap-6 items-center mt-4 text-red">
            <p>You need to buy new packs!!!</p>
          </div>
        )}
        <div className="flex gap-6 items-center mt-4">
          <span className="text-white">Pieces per Package</span>
          {calculateTotalWipes()}
        </div>
      </section>
      <div className="grid grid-cols-7 gap-6 mt-5">
        {days.map((day) => {
          const currentTimeStamp = Date.now();
          const today = days[new Date(currentTimeStamp).getDay()];

          return (
            <div key={day} className="p-4 rounded-lg bg-gray-800 text-center">
              <h3 className="text-white">{day}</h3>
              {entries.length > 0 &&
                entries.map((entry) => {
                  if (entry.day_of_week === day) {
                    return (
                      <div key={entry.entry_id}>
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
    </div>
  );
}
