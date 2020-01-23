export default function getDate(date) {
  let formatted_date = "";
  if (date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    let current_datetime = new Date(date);
    formatted_date =
      months[current_datetime.getMonth()] +
      " " +
      current_datetime.getDate() +
      ", " +
      current_datetime.getFullYear();
  }
  return formatted_date;

  //   let newDate = "";
  //   if (date) {
  //     newDate = new Date(date);
  //     newDate = newDate.toDateString();
  //   }
  //   return newDate;
}
