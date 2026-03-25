import { formatDistanceToNow } from "date-fns";

export const getRelativeTime = (date) => {
  if (!date) return "";

  const distance = formatDistanceToNow(new Date(date), { addSuffix: true });

  if (distance.includes("less than a minute") || distance.includes("minute")) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Now";
  }

  return distance;
};
