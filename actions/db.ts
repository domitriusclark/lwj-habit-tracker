"use server";

import db from "@/lib/database";
import { currentUser } from "@clerk/nextjs";

export async function createEntry(formData: FormData) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentTimeStamp = Date.now();
  const today = days[new Date(currentTimeStamp).getDay()];
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to create an entry",
    };
  }

  const wipes = formData.get("wipes");
  const wipes_used = parseInt(wipes as string);

  if (!wipes) {
    return {
      msg: "No entry provided",
    };
  }

  try {
    const entry = await db
      .insertInto("poop_log_entries")
      .values({ wipes_used, owner_id: user.id, day_of_week: today as any })
      .execute();

    return {
      status: "success",
      msg: "Entry created successfully",
      entry,
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      msg: "Something went wrong, please try again",
    };
  }
}
