"use client";
/**
 * Adapted from NextGram
 * https://github.com/vercel-labs/nextgram/blob/main/components/modal/index.js
 */
import { useCallback, useRef, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
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
        className="bg-white p-10 rounded-md shadow-lg"
      >
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            onClick={onDismiss}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
