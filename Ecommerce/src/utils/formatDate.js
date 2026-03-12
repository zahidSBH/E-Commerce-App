const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export const formatDate = (date, includeTime = false) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "N/A";

  if (includeTime) {
    return dateTimeFormatter.format(parsedDate);
  }
  return dateFormatter.format(parsedDate);
};

export default formatDate;
