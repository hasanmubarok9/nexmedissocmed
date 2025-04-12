import { formatDistanceToNow, subMonths } from "date-fns";

export const formatTime = (time: string) => {
  const postDate = new Date(time);
  const oneMonthAgo = subMonths(new Date(), 1);

  if (postDate >= oneMonthAgo) {
    return formatDistanceToNow(postDate, {
      addSuffix: true,
    });
  } else {
    return postDate.toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
};
