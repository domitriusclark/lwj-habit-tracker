"use client";
import { deleteEntry } from "@/actions/db";

export default function DeleteEntryButton({
  children,
  entryId,
}: {
  children: React.ReactNode;
  entryId: number;
}) {
  return (
    <button
      onClick={async () => await deleteEntry(entryId)}
      className=" inline-flex items-center shadow-sm "
    >
      {children}
    </button>
  );
}
