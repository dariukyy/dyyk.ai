import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import PusherClient from "pusher-js";
import PusherServer from "pusher";

export const extractUUIDFromString = (url: string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pusherServer = {};
// new PusherServer({
//   appId: process.env.PUSHER_APP_ID as string,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   secret: process.env.PUSHER_APP_SECRET as string,
//   cluster: "mt1",
//   useTLS: true,
// });

export const pusherClient = {};
//  new PusherClient(
//   process.env.NEX_PUBLIC_PUSHER_APP_KEY as string,
//   {
//     cluster: "mt1",
//   }
// );

export const postToParent = (message: string) => {
  window.parent.postMessage(message, "*");
};

export const extractEmailsFromString = (text: string) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
};

export const extractURLfromString = (url: string) => {
  return url.match(/\bhttps?:\/\/\S+/gi);
};

export const getMonthName = (month: number) => {
  return month == 1
    ? "Jan"
    : month == 2
    ? "Feb"
    : month == 3
    ? "Mar"
    : month == 4
    ? "Apr"
    : month == 5
    ? "May"
    : month == 6
    ? "Jun"
    : month == 7
    ? "Jul"
    : month == 8
    ? "Aug"
    : month == 9
    ? "Sep"
    : month == 10
    ? "Oct"
    : month == 11
    ? "Nov"
    : month == 12 && "Dec";
};

export function hexToRgba(hex: string, opacity: number): string {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
