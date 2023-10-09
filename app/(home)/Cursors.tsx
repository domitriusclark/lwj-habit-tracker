"use client";

import { useCursors } from "./cursors-provider";
import OtherCursor from "./other-cursor";
import MyCursor from "./my-cursor";

export default function Cursors() {
  const { others } = useCursors();
  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {Object.keys(others).map((id) => (
        <div key={`cursor-${id}`}>
          <OtherCursor id={id} />
        </div>
      ))}

      <MyCursor />
    </div>
  );
}
