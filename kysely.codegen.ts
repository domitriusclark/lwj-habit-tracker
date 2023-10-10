import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface PoopLogEntries {
  entry_id: Generated<number>;
  owner_id: string | null;
  pooped: Generated<number | null>;
  wipes_used: Generated<number | null>;
  created_at: Generated<Date | null>;
  day_of_week: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday" | null;
}

export interface WipeCount {
  owner_id: string;
  total_wipes: Generated<number | null>;
  last_modified: Generated<Date | null>;
}

export interface DB {
  poop_log_entries: PoopLogEntries;
  wipe_count: WipeCount;
}
