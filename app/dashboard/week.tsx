import { Selectable } from "kysely";
import { PoopLogEntries } from "@/kysely.codegen";

import { TrashIcon } from "@radix-ui/react-icons";
import DeleteEntryButton from "./delete-entry-button";
import Link from "next/link";

function Day({
  day,
  active,
  entries,
}: {
  day: string;
  active: boolean;
  entries: Selectable<PoopLogEntries>[];
}) {
  return (
    <div
      className={`
      h-full
      bg-white 
      rounded-md 
      flex 
      flex-col
      p-4 
      ${
        active
          ? "border-4 border-solid border-blue-400"
          : "border-4 border-gray-400"
      }
      ${active ? "opacity-100 text-blue-600" : "opacity-50 text-gray-700"}
      transition-all 
      duration-500 
      ease-in-out`}
    >
      {active ? (
        <div className="flex justify-between w-full">
          <h1 className="font-bold">{day}</h1>
          <button className="rounded-md px-2 py-1 text-sm font-medium shadow-sm text-white bg-[#bd1e59] hover:bg-[#9e1650] dark:border-zinc-800">
            <Link href="/new-entry">
              <span className="mx-1">Add Entry</span>
            </Link>
          </button>
        </div>
      ) : (
        <p>{day}</p>
      )}

      <div className="flex gap-3 wrap mt-3">
        {entries.length > 0 &&
          entries.map((entry) => {
            if (entry.day_of_week === day) {
              return (
                <div
                  className="flex gap-2 items-center max-w-max h-10 rounded-md shadow-lg border-solid border-2 border-slate-900 p-2"
                  key={entry.entry_id}
                >
                  <p>{entry.wipes_used}</p>
                  <DeleteEntryButton entryId={entry.entry_id}>
                    <TrashIcon color="red" />
                  </DeleteEntryButton>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

function Week({ entries }: { entries: Selectable<PoopLogEntries>[] }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];

  const renderDays = days.map((day, idx) => (
    <div
      key={day}
      className={`w-full h-full ${idx === 3 || idx === 6 ? "col-span-2" : ""} `}
    >
      <Day entries={entries} day={day} active={day === currentDay} />
    </div>
  ));

  return (
    <div className="grid auto-rows-fr grid-cols-3 grow w-full md:w-2/3 gap-2 ">
      {renderDays}
    </div>
  );
}

export default Week;
