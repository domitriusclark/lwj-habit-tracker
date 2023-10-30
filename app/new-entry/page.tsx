import { NewEntryForm } from "@/app/@modal/(.)new-entry/modal";
import Navbar from "@/components/navbar";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function DefaultFormPage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const currentTimeStamp = Date.now();
  const today = days[new Date(currentTimeStamp).getDay()];

  return (
    <div className="flex flex-col w-screen h-full pt-6 m-6 items-center ">
      <Navbar user={user} />
      <div className=" flex h-full items-center justify-center ">
        <div className="bg-white rounded-md p-4">
          <NewEntryForm today={today} />
        </div>
      </div>
    </div>
  );
}
