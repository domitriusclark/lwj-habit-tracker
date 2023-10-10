import * as React from "react";

export default function WipeCounter({ wipes }: { wipes: number }) {
  const [wipeCount, setWipeCount] = React.useState(wipes);
  return (
    <div className="flex gap-6 items-center">
      <span className="text-white">{wipeCount}</span>
      <button onClick={() => setWipeCount((prev) => (prev += 1))}>
        Add Pack
      </button>
      <button onClick={() => setWipeCount((prev) => (prev -= 1))}>
        Remove Pack
      </button>
    </div>
  );
}
