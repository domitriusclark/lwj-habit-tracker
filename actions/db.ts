"use server";

import db from "@/lib/database";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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
    await db
      .insertInto("poop_log_entries")
      .values({ wipes_used, owner_id: user.id, day_of_week: today as any })
      .execute();

    return {
      status: "success",
      msg: "Entry created successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      msg: "Something went wrong, please try again",
    };
  }
}

export async function updatePackCount(updatedCount: number) {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to create an entry",
    };
  }

  try {
    await db
      .updateTable("wipe_count")
      .set({ total_wipes: updatedCount })
      .where("owner_id", "=", user.id)
      .executeTakeFirst();

    revalidatePath("/dashboard");

    return {
      status: "success",
      msg: "Count updated successfully",
    };
  } catch (e) {
    console.error(e);

    return {
      status: "error",
      msg: "Couldn't update count, please try again",
      error: e,
    };
  }
}

export async function deleteEntry(entryId: number) {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to delete an entry",
    };
  }

  await db
    .deleteFrom("poop_log_entries")
    .where("entry_id", "=", entryId)
    .executeTakeFirst();

  revalidatePath("/dashboard");

  return {
    status: "success",
    msg: "Entry deleted successfully",
  };
}
