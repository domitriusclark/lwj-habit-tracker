"use client";

import * as React from "react";
import { useCallback, useRef, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";

import { createEntry } from "@/actions/db";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Modal() {
  const currentTimeStamp = Date.now();
  const today = days[new Date(currentTimeStamp).getDay()];

  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      onClick={onClick}
      className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900"
    >
      <div
        ref={wrapper}
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-2/4 w-1/3 rounded-md shadow-lg"
      >
        <NewEntryForm today={today} />
      </div>
    </div>
  );
}

export function NewEntryForm({ today }: { today: string }) {
  const router = useRouter();

  return (
    <form
      className="p-10"
      action={async (formData: FormData) => {
        const res = await createEntry(formData);

        if (res.status === "success") {
          router.back();
          router.refresh();
        }
      }}
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Day of the week
        </label>
        <p className="text-black">{today}</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="wipes"
          className="block text-gray-700 font-semibold mb-1"
        >
          Wipes Used
        </label>
        <input
          type="number"
          id="name"
          name="wipes"
          className="border text-black border-gray-300 rounded-lg px-3 py-2 w-full"
          placeholder="How many wipes did you use?"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}
