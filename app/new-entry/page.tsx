import { NewEntryForm } from "@/app/@modal/(.)new-entry/modal";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function DefaultFormPage() {
  const currentTimeStamp = Date.now();
  const today = days[new Date(currentTimeStamp).getDay()];

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <NewEntryForm today={today} />
    </div>
  );
}
