import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNumeric(str: unknown) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) && !str.trim().startsWith("0x")
  ); // ...and ensure strings of whitespace fail
}