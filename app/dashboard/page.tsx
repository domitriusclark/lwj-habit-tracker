import { HabitTrackerDashboard } from "@/components/habit-tracker-dashboard";
import SignOutButton from "@/components/sign-out-button";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col pt-10">
      <div className="flex gap-6 items-center self-end mr-10">
        <p>Hey, {user.firstName}!</p>
        <SignOutButton />
      </div>
      <HabitTrackerDashboard />;
    </div>
  );
}
