"use client";
import * as React from "react";

import { updatePackCount } from "@/actions/db";

export default function WipeCounter({
  wipes,
  sumEntries,
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
    <div className="flex gap-6 items-center">
      <span className="text-white">{wipes}</span>
      <button onClick={() => handleAddPack()}>Add Pack</button>
      <button onClick={() => handleRemovePack()}>Remove Pack</button>
    </div>
  );
}
