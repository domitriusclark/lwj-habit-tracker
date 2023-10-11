import { useLayoutEffect, useRef, useCallback } from "react";
import { useCursors } from "./cursors-provider";
import { Cursor } from "@/party/cursors";

function OtherCursorImpl(props: { cursor: Cursor }) {
  const { cursor } = props;
  const { windowDimensions } = useCursors();
  const rCursor = useRef<HTMLDivElement>(null);

  const animateCursor = useCallback((point: number[]) => {
    const elm = rCursor.current;
    if (!elm) return;
    elm.style.setProperty(
      "transform",
      `translate(${point[0]}px, ${point[1]}px)`
    );
  }, []);

  useLayoutEffect(() => {
    animateCursor([left, top]), [animateCursor, [left, top]];
  });

  const offset = 10;
  const left = cursor.x * windowDimensions.width - offset;
  const top = cursor.y * windowDimensions.height - offset;

  return (
    <div className="absolute" ref={rCursor} style={{ left: -10, top: -10 }}>
      <div
        className="absolute text-2xl whitespace-nowrap p-1"
        style={{ top: 10, left: 16 }}
      >
        {"💩"}
      </div>
    </div>
  );
}

export default function OtherCursor(props: { id: string }) {
  const { id } = props;
  const { others } = useCursors();
  const cursor = others[id];
  if (!cursor) return null;
  return <OtherCursorImpl cursor={cursor} />;
}
