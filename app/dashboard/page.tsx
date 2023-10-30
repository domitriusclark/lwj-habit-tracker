import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import db from "@/lib/database";

import Navbar from "@/components/navbar";
import WipeCounter from "./wipe-counter";
import Week from "./week";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
    return null;
  }

  const entries = await db
    .selectFrom("poop_log_entries")
    .selectAll()
    .where("owner_id", "=", user.id)
    .execute();

  const packCount = await db
    .selectFrom("wipe_count")
    .where("owner_id", "=", user.id)
    .select(["total_wipes"])
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
    <div className="flex flex-col h-full p-3 gap-2 items-center">
      <Navbar user={user} />

      <div className="flex items-center gap-6 p-2 justify-between rounded-lg w-full md:w-2/3">
        {typeof total === "number" ? (
          <WipeCounter wipes={total} sumEntries={sumEntries(entries)} />
        ) : null}
        {typeof total === "number" && total === 0 && (
          <p className="text-lg w-min-max">
            Time to buy some new{""}
            <a
              className="flex items-center gap-1"
              href="https://www.amazon.com/Flushable-Dispenser-Unscented-Vitamin-at-Home/dp/B010NE2XPC/ref=sr_1_5_pp?crid=3HRC1OVRUP9E8&keywords=dude+wipes&qid=1698650917&sprefix=dude+wipes%2Caps%2C70&sr=8-5"
            >
              packs <ExternalLinkIcon />
            </a>
          </p>
        )}
        <div className="flex gap-6 items-center">
          <span className="text-white">Pieces</span>
          {calculateTotalWipes()}
        </div>
      </div>

      <Week entries={entries} />
    </div>
  );
}
