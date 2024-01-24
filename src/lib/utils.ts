import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function timeAgoConverter(timestamp: string) {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  const timeDifference = currentDate.getTime() - providedDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
      return `${days} days ago`;
  } else if (hours > 0) {
      return `${hours} hours ago`;
  } else if (minutes > 0) {
      return `${minutes} minutes ago`;
  } else {
      return `${seconds} seconds ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};