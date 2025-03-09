export function formatDate() {
  const date = new Date();
  console.log("date", date);
  const day = date.getDate().toString().padStart(2, "0");
  console.log("day", day);
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  console.log(formattedDate);

  return formattedDate;
}
