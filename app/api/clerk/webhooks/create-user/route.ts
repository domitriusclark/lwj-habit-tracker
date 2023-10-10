import type { WebhookEvent } from "@clerk/clerk-sdk-node";

import db from "@/lib/database";

// when a user is created in clerk, we want to setup the database with a default for the counter
export async function POST(req: Request) {
  const { data, type } = (await req.json()) as WebhookEvent;

  if (type !== "user.created") {
    return new Response("Needs to be the user.created event from Clerk", {
      status: 500,
    });
  }

  db.insertInto("wipe_count")
    .values({
      owner_id: data.id,
      total_wipes: 0,
    })
    .execute();

  return new Response("User created in planetscale 🥳", {
    status: 201,
  });
}
