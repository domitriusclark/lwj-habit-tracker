"use client";
import * as React from "react";

import Tooltip from "@/components/tooltip";
import { updatePackCount } from "@/actions/db";
import { CardStackMinusIcon, CardStackPlusIcon } from "@radix-ui/react-icons";

export default function WipeCounter({
  wipes,
}: {
  wipes: number;
  sumEntries: number;
}) {
  const [wipeCount, setWipeCount] = React.useState(wipes);
  async function handleAddPack() {
    await updatePackCount(wipeCount + 1);

    setWipeCount((prev) => (prev += 1));
  }

  async function handleRemovePack() {
    if (wipeCount - 1 < 0) {
      return;
    }
    await updatePackCount(wipeCount - 1);

    setWipeCount((prev) => (prev -= 1));
  }

  return (
    <div className="flex gap-3 items-center">
      <span className="text-white">{wipes}</span>
      <Tooltip position="top" message="Add Pack">
        <button
          className="rounded-md px-3 py-2 text-sm font-medium shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 dark:border-zinc-800"
          onClick={() => handleAddPack()}
        >
          <CardStackPlusIcon />
        </button>
      </Tooltip>
      <Tooltip position="top" message="Remove Pack">
        <button
          className="rounded-md px-3 py-2 text-sm font-medium shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 dark:border-zinc-800"
          onClick={() => handleRemovePack()}
        >
          <CardStackMinusIcon />
        </button>
      </Tooltip>
    </div>
  );
}
