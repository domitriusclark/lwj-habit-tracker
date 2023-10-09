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
    <form className="h-full flex flex-col m-10">
      <>
        <p>Day of the week: {today}</p>
      </>

      <>
        <label htmlFor="">
          <input name="" />
        </label>
      </>

      <>
        <label>
          <input />
        </label>
      </>
    </form>
  );
}
