const arrayOfCrons = [
  "01 13 * * 3,4",
  "09 05 * * 1,3,5",
  "45 09 * * 2,4",
  null,
  "33 18 * * 0",
];
const output = [];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDays(days) {
  return days?.length > 1
    ? days.slice(0, -1).join(", ") + " and " + days[days.length - 1]
    : days[0];
}

function cronToDays() {
  for (const cron of arrayOfCrons) {
    // Validations
    if (!cron || cron.split(" ")?.length !== 5) {
      output.push("Null value or Invalid cron format");
      continue;
    }

    const [minute, hour, , , daysOfWeek] = cron.split(" ");

    if (isNaN(minute) || isNaN(hour)) {
      output.push("Invalid time in cron format");
      continue;
    }

    const min = parseInt(minute);
    const hr = parseInt(hour);
    if (min < 0 || min > 59 || hr < 0 || hr > 23) {
      output.push("Out-of-range values in cron format");
      continue;
    }

    const days = daysOfWeek.split(",").map((day) => parseInt(day));
    const uniqueDays = [...new Set(days)];

    if (uniqueDays.some((day) => day < 0 || day > 6)) {
      output.push("Invalid day value in cron format");
      continue;
    }

    const dayNamesList = uniqueDays.map((day) => dayNames[day]);
    const time = `${hr}:${minute.padStart(2, "0")}`;
    const formattedString = `At ${time} on ${formatDays(dayNamesList)}.`;
    output.push(formattedString);
  }
}

cronToDays();

console.log(output);
