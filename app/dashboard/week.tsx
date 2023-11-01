import { Selectable } from "kysely";
import { PoopLogEntries } from "@/kysely.codegen";

import { TrashIcon } from "@radix-ui/react-icons";
import DeleteEntryButton from "./delete-entry-button";
import Link from "next/link";

function Day({
  day,
  active,
  index,
  entries,
}: {
  day: string;
  index: number;
  active: boolean;
  entries: Selectable<PoopLogEntries>[];
}) {
  return (
    <div
      className={`
      h-full
      bg-white 
      overflow-y-scroll
      rounded-md 
      flex 
      flex-col
      p-4 
      ${
        active
          ? "border-4 border-solid border-blue-400 opacity-100 text-lime-600"
          : "border-4 border-gray-400 opacity-50 text-gray-700"
      }      
      transition-all 
      ${index === 3 || index === 6 ? "col-span-2" : ""}
      duration-500 
      ease-in-out`}
    >
      {active ? (
        <div className="flex md:justify-between md:items-center flex-col md:flex-row ">
          <h1 className="font-bold">{day}</h1>
          <button className="rounded-md px-2 py-1 text-sm font-medium shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 dark:border-zinc-800">
            <Link href="/new-entry">
              <span className="mx-1">Add Entry</span>
            </Link>
          </button>
        </div>
      ) : (
        <p>{day}</p>
      )}

      <div className="flex flex-col lg:flex-row gap-3 flex-wrap w-full mt-3">
        {entries.length > 0 &&
          entries.map((entry) => {
            if (entry.day_of_week === day) {
              return (
                <div
                  className="flex gap-2 items-center w-full lg:max-w-max h-10 justify-between rounded-md shadow-lg border-solid border-2 border-slate-900 p-2"
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
    <Day index={idx} entries={entries} day={day} active={day === currentDay} />
  ));

  return (
    <div className="grid h-full grid-rows-3 grid-cols-3 w-full md:w-2/3 gap-2 ">
      {renderDays}
    </div>
  );
}

export default Week;
