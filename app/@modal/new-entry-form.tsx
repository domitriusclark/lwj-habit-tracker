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

export default function NewEntryForm() {
  const currentTimeStamp = Date.now();
  const today = days[new Date(currentTimeStamp).getDay()];
  return (
    <form className="p-10" action={createEntry}>
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
